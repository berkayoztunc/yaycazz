use crate::state::wizzard::Wizzard;
use crate::{assert_non_zero, assert_not_expired, assert_not_locked};
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{burn, transfer, Burn, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct DistrubuteTokenomicsProvider<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub mint_x: Account<'info, Mint>,

    #[account(
        init,
        payer = user,
        associated_token::mint = mint_x,
        associated_token::authority = auth,
    )]
    pub vault_x: Account<'info, TokenAccount>,
   
    /// CHECK: This is safe because it's just used to sign
    #[account(seeds = [b"auth"], bump)]
    pub auth: UncheckedAccount<'info>,
    #[account(
        has_one = mint_x,
        seeds = [b"wizzard", user.key.as_ref(),mint_x.key().as_ref()],
        bump = wizzard.wizzard_bump,
    )]
    pub wizzard: Account<'info, Wizzard>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

impl<'info> DistrubuteTokenomicsProvider<'info> {
    pub fn distribute_tokenomics_provider(&mut self, amount: u64) -> Result<()> {
        // streamflow
        // valhala
        Ok(())
    }
}
