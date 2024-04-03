use crate::state::wizzard::Wizzard;
use crate::{assert_non_zero, assert_not_expired, assert_not_locked};
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{ transfer, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct DistrubuteTokenomicsDirect<'info> {
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
    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = mint_x,
        associated_token::authority = auth,
    )]
    pub destination_x: Account<'info, TokenAccount>,
    /// CHECK: This is safe because it's just used to sign
    #[account(seeds = [b"auth"], bump)]
    pub auth: UncheckedAccount<'info>,
    #[account(
        mut,
        has_one = mint_x,
        seeds =  [b"wizzard", user.key.as_ref(),mint_x.key().as_ref()],
        bump = wizzard.wizzard_bump,
    )]
    pub wizzard: Account<'info, Wizzard>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

impl<'info> DistrubuteTokenomicsDirect<'info> {
    
    pub fn distribute_tokenomics_direct(&mut self, order: u8) -> Result<()> {
        let  part = &mut self.wizzard.tokenomics.as_mut().unwrap()[order as usize];
        assert_eq!(part.status, true, "Tokenomics already distributed");
        let cpi_accounts = Transfer {
            from:self.vault_x.to_account_info(),
            to:self.destination_x.to_account_info(),
            authority: self.auth.to_account_info()
        };

        let seeds = &[&b"auth"[..], &[self.wizzard.auth_bump]];

        let signer_seeds = &[&seeds[..]];

        let ctx = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            cpi_accounts,
            signer_seeds,
        );
        let  part = &mut self.wizzard.tokenomics.as_mut().unwrap()[order as usize];

        part.status = true;

        transfer(ctx, part.amount)
    }

}
