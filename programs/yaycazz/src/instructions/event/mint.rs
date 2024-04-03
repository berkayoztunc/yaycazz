use crate::state::event::{self, Events};
use crate::state::wizzard::Wizzard;
use crate::{BlockBase, BlockBaseWithPanyalty, EventsType, Register, WhitelistBase};
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
#[instruction(event_type: u64)]

pub struct MintEvent<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub mint_x: Account<'info, Mint>,
    pub mint_y: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint_y,
        associated_token::authority = auth
    )]
    pub vault_y: Box<Account<'info, TokenAccount>>,
    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = mint_y,
        associated_token::authority = user
    )]
    pub user_y: Box<Account<'info, TokenAccount>>,
    /// CHECK: This is safe because it's just used to sign
    #[account(seeds = [b"auth"], bump)]
    pub auth: UncheckedAccount<'info>,
    #[account(
        mut,
        seeds = [b"event", user.key.as_ref(),mint_x.key().as_ref()],
        bump,
    )]
    pub events: Account<'info, Events>,
    #[account(
        has_one = mint_x,
        seeds =  [b"wizzard", user.key.as_ref(),mint_x.key().as_ref()],
        bump = wizzard.wizzard_bump,
    )]
    pub wizzard: Account<'info, Wizzard>,
    #[account(
        init_if_needed,
        payer = user,
        seeds =  [b"register", user.key.as_ref(),events.key().as_ref()],
        bump,
        space = Register::INIT_SPACE
    )]
    pub register: Account<'info, Register>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

impl<'info> MintEvent<'info> {
    // parametre atilicak
    pub fn mint(&mut self, bumps: &MintEventBumps) -> Result<()> {
        let event_type = &self.events.types;
        self.register.user = *self.user.key;
        self.register.wizzard = self.wizzard.key();
        self.register.event = self.events.key();
        self.register.auth_bump = bumps.auth;
        self.register.register_bump = bumps.register;
        let _ = self.register.try_count.checked_add(1);

        match event_type {
            EventsType::BlockBase(block_base) => {
                let _ = self.block_base(block_base.clone());
            }
            EventsType::BlockBasePenalty(block_base_with_panyalty) => {
                let _ = self.block_base_penalty(block_base_with_panyalty.clone());
            }
            EventsType::WhitelistBase(whitelist_base) => {
                self.whitelist_base(whitelist_base.clone());
            }
            _ => panic!("Invalid event type"),
        }

        Ok(())
    }
    pub fn block_base(&mut self, event: BlockBase) -> Result<()> {
        let clock = Clock::get()?;
        let block_height = clock.slot;
        let mut mint_block = event.block_height;
        let price = self.wizzard.mint_price;
        let mut regist_count = self.register.count;
        let mut remaining = event.remain_supply;
        let mint_per_block = event.mint_per_block;
        let mut block_remaining_mint = event.block_remaining_mint;

        // check auth

        assert_eq!(event.remain_supply, 0, "Event already minted");

        if mint_block < block_height {
            mint_block = block_height;
            block_remaining_mint = mint_per_block;
        }
        if mint_block >= block_height && block_remaining_mint != 0 {
            if remaining > 0 {
                remaining = remaining.checked_sub(1).unwrap();
                block_remaining_mint = block_remaining_mint.checked_sub(1).unwrap();
                regist_count = regist_count.checked_add(1).unwrap();
                let _ = self.transfer(price);
            }
        }
        Ok(())
    }
    pub fn block_base_penalty(&mut self, event: BlockBaseWithPanyalty) -> Result<()> {
        let clock = Clock::get()?;
        let block_height = clock.slot;
        let mut mint_block = event.block_height;
        let price = self.wizzard.mint_price;
        let mut regist_count = self.register.count;
        let mut remaining = event.remain_supply;
        let mint_per_block = event.mint_per_block;
        let mut block_remaining_mint = event.block_remaining_mint;
        let _ = self.transfer(price);

        // check auth

        assert_eq!(event.remain_supply, 0, "Event already minted");

        if mint_block < block_height {
            mint_block = block_height;
            block_remaining_mint = mint_per_block;
        }
        if mint_block >= block_height && block_remaining_mint != 0 {
            if remaining > 0 {
                remaining = remaining.checked_sub(1).unwrap();
                block_remaining_mint = block_remaining_mint.checked_sub(1).unwrap();
                regist_count = regist_count.checked_add(1).unwrap();
                //register +1
            }
        }
        Ok(())
    }
    pub fn whitelist_base(&mut self, event: WhitelistBase) {}
    pub fn transfer(&mut self, amount: u64) -> Result<()> {
        let from = self.user_y.to_account_info();
        let to = self.vault_y.to_account_info();
        let accounts = Transfer { from, to };
        let ctx = CpiContext::new(self.token_program.to_account_info(), accounts);
        transfer(ctx, amount)
    }
}
