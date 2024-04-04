use crate::state::wizzard::Wizzard;
use crate::OnChainTokenomics;
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token};

#[derive(Accounts)]
#[instruction(event_type: u64)]

pub struct DefineTokenomics<'info> {
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

impl<'info> DefineTokenomics<'info> {
    pub fn define_tokenomics(&mut self, data:Vec<OnChainTokenomics>) -> Result<()> {
        if let Some(tokenomics_vec) = &mut self.wizzard.tokenomics {
            for tokenomic in tokenomics_vec {
                tokenomic.status = false;
            }
        }
        self.wizzard.tokenomics = Some(data);
        self.wizzard.state = 1;
        Ok(())
    }
}