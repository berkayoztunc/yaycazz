use crate::state::wizzard::Wizzard;
use crate::OnChainTokenomics;
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token};

#[derive(Accounts)]
#[instruction(event_type: u64)]

pub struct SelectApprovement<'info> {
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

impl<'info> SelectApprovement<'info> {
    pub fn select_approvement(&mut self, state:bool) -> Result<()> {
        self.wizzard.is_request_approvement = state;
        self.wizzard.state = 2;
        Ok(())
    }
}