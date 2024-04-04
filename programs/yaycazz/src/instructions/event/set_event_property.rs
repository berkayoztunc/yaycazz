use crate::state::wizzard::Wizzard;
use crate::OnChainTokenomics;
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token};

#[derive(Accounts)]
#[instruction(event_type: u64)]

pub struct SetEventProperty<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub mint_x: Account<'info, Mint>,

    /// CHECK: This is safe because it's just used to sign
    #[account(seeds = [b"auth"], bump)]
    pub auth: UncheckedAccount<'info>,
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

impl<'info> SetEventProperty<'info> {
    pub fn set_mint_events(&mut self,
        provider:u8,
        mint_type:u8,
        mint_price:u64,
        mint_supply:u64,
    ) -> Result<()> {
        self.wizzard.provider = provider;
        self.wizzard.mint_type = mint_type;
        self.wizzard.mint_price = mint_price;
        self.wizzard.mint_supply = mint_supply;
        self.wizzard.state = 3;
        Ok(())
    }
    pub fn set_event_time(&mut self,start:u64,end:u64) -> Result<()> {
        self.wizzard.start_block = start;
        self.wizzard.end_block = end;
        self.wizzard.state = 5;
        Ok(())
    }
}