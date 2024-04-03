use crate::state::event::Events;
use crate::state::wizzard::Wizzard;
use crate::{BlockBase, BlockBaseWithPanyalty, EventsType, WhitelistBase};
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token};

#[derive(Accounts)]
#[instruction(event_type: u64)]

pub struct CreateEvent<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub mint_x: Account<'info, Mint>,

    /// CHECK: This is safe because it's just used to sign
    #[account(seeds = [b"auth"], bump)]
    pub auth: UncheckedAccount<'info>,
    #[account(
        init,
        payer = user,
        seeds = [b"event", user.key.as_ref(),mint_x.key().as_ref()],
        bump,
        space = Events::space(event_type)
    )]
    pub events: Account<'info, Events>,
    #[account(
        has_one = mint_x,
        seeds =  [b"wizzard", user.key.as_ref(),mint_x.key().as_ref()],
        bump = wizzard.wizzard_bump,
    )]
    pub wizzard: Account<'info, Wizzard>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateEvent<'info> {
    // parametre atilicak
    pub fn create_block_base(&mut self, penalty: bool, mint_per_block: u8, bumps:&CreateEventBumps) -> Result<()> {
        let mut token_count_in_wizzard_for_event = 0;
        if let Some(tokenomics_vec) = &mut self.wizzard.tokenomics {
            for tokenomic in tokenomics_vec {
                if tokenomic.provider == 0 {
                    token_count_in_wizzard_for_event = tokenomic.amount;
                }
            }
        }
        let distribution_amount =
            token_count_in_wizzard_for_event.checked_div(self.wizzard.mint_supply);

        self.events.types = EventsType::BlockBase(BlockBase {
            remain_supply: self.wizzard.mint_supply,
            distribution_amount: distribution_amount.unwrap(),
            mint_per_block: mint_per_block,
            block_remaining_mint: mint_per_block,
            block_height: 0,
            total_try: 0,
            is_penalty: penalty,
        });
        self.events.event_bump =bumps.events;
        self.wizzard.event = Some(self.events.key());
        self.wizzard.state = 4;
        Ok(())
    }
    pub fn create_whitelist_base(&mut self, merkel: Pubkey) -> Result<()> {
        let mut token_count_in_wizzard_for_event = 0;
        if let Some(tokenomics_vec) = &mut self.wizzard.tokenomics {
            for tokenomic in tokenomics_vec {
                if tokenomic.provider == 0 {
                    token_count_in_wizzard_for_event = tokenomic.amount;
                }
            }
        }
        let distribution_amount =
            token_count_in_wizzard_for_event.checked_div(self.wizzard.mint_supply);

        self.events.types = EventsType::WhitelistBase(WhitelistBase {
            tree: merkel,
            distribution_amount: distribution_amount.unwrap(),
        });

        self.wizzard.event = Some(self.events.key());
        self.wizzard.state = 4;
        Ok(())
    }
}
