use crate::amm;
use crate::mint;
use crate::state::wizzard::Wizzard;
use crate::state::wizzard::OnChainTokenomics;
use crate::{assert_non_zero, assert_not_expired, assert_not_locked};
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{burn, transfer, Burn, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct CreateWizzard<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub mint_x: Account<'info, Mint>,
    pub mint_y: Account<'info, Mint>,
    #[account(
        mut,
        associated_token::mint = wizzard.mint_x,
        associated_token::authority = user,
    )]
    pub user_x: Box<Account<'info, TokenAccount>>,
    #[account(
        init,
        payer = user,
        associated_token::mint = mint_x,
        associated_token::authority = auth,
    )]
    pub vault_x: Account<'info, TokenAccount>,
    #[account(
        init,
        payer = user,
        associated_token::mint = mint_y,
        associated_token::authority = auth,
    )]
    pub vault_y: Account<'info, TokenAccount>,
    /// CHECK: This is safe because it's just used to sign
    #[account(seeds = [b"auth"], bump)]
    pub auth: UncheckedAccount<'info>,
    #[account(
        init,
        payer = user,
        seeds = [b"wizzard", user.key.as_ref(),mint_x.key().as_ref()],
        bump,
        space = Wizzard::INIT_SPACE
    )]
    pub wizzard: Account<'info, Wizzard>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateWizzard<'info> {
    // create wizzard
    pub fn create_wizzard(&mut self, bumps: &CreateWizzardBumps) -> Result<()> {
        self.wizzard.set_inner(Wizzard {
            authority: *self.user.key,
            state: 0,
            mint_x: self.mint_x.key(),
            mint_y: self.mint_y.key(),
            total_supply: self.mint_x.supply,
            mint_supply: 0,
            mint_type: 0,
            mint_price: 0,
            provider: 0,
            start_block: 0,
            end_block: 0,
            is_request_approvement: false,
            is_approved: false,
            is_distribution: false,
            is_mint: false,
            is_cancel: false,
            tokenomics: None,
            event: None,
            auth_bump: bumps.auth,
            wizzard_bump: bumps.wizzard,
        });

        // transfer mint_x to vault_x
        let (from, to) = (self.user_x.to_account_info(), self.vault_x.to_account_info());    
        let cpi_accounts = Transfer {
            from,
            to,
            authority: self.user.to_account_info(),
        };
        let ctx = CpiContext::new(self.token_program.to_account_info(), cpi_accounts);
        transfer(ctx, self.mint_x.supply)
    }
    // define tokenomics
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
    // select approvement
    pub fn select_approvement(&mut self, state:bool) -> Result<()> {
        self.wizzard.is_request_approvement = state;
        self.wizzard.state = 2;
        Ok(())
    }
    // set mint events
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
    // set event time
    pub fn set_event_time(&mut self,start:u64,end:u64) -> Result<()> {
        self.wizzard.start_block = start;
        self.wizzard.end_block = end;
        self.wizzard.state = 5;
        Ok(())
    }
    // create AMM
    pub fn create_amm(&mut self) -> Result<()> {
        Ok(())
    }
    // cancel event
    pub fn cancel_event(&mut self) -> Result<()> {
        self.wizzard.is_cancel = true;
        Ok(())
    }
    // start distribution
    pub fn start_distribution(&mut self) -> Result<()> {
        self.wizzard.is_distribution = true;
        Ok(())
    }
    // close and withdraw all creator token
    pub fn close_and_withdraw_all_creator_token(&mut self) -> Result<()> {
        Ok(())
    }
    // request withdraw LP tokens
    pub fn request_withdraw_lp_tokens(&mut self) -> Result<()> {
        Ok(())
    }
}

