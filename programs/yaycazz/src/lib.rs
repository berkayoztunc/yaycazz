pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;
pub mod helpers;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;
pub use error::*;
pub use helpers::*;

declare_id!("57naiGrCabhS1B2jkZudgtfK356Ygx9BqFyxYNGVKu6Y");

#[program]
pub mod yaycazz {
    use super::*;

    pub fn initialize(ctx: Context<CreateWizzard>) -> Result<()> {
       ctx.accounts.create_wizzard(&ctx.bumps)
    }
    pub fn init_amm(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.init(&ctx.bumps, 12, 12, Some(ctx.accounts.initializer.key()))
    }
    pub fn deposite(ctx: Context<Deposit>) -> Result<()> {
        ctx.accounts.deposit(100,100,100,100)
        
    }
}
