use anchor_lang::prelude::*;

#[account]
pub struct Wizzard {
    pub authority: Pubkey,
    pub state: u8,

    pub mint_x : Pubkey,
    pub mint_y : Pubkey,

    pub total_supply: u64,

  
    pub mint_supply: u64,
    pub mint_type: u8,
    pub mint_price: u64,
    pub provider: u8,

    pub start_block: u64,
    pub end_block: u64,

    pub is_request_approvement: bool,
    pub is_approved: bool,
    pub is_distribution: bool,
    pub is_mint: bool,
    pub is_cancel : bool,
    pub event:Option<Pubkey>,

    pub tokenomics: Option<Vec<OnChainTokenomics>>,

    pub auth_bump : u8,
    pub wizzard_bump : u8,
}
impl Space for Wizzard {
    const INIT_SPACE: usize = 8 + 32 + 1 + 32 + 8 + 8 + 1 + 8 + 1 + 8 + 8 + 1 + 1 + 1 + 1 + 1 + 1 + 1;
}
#[derive(InitSpace, Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct OnChainTokenomics {
    pub reciver: Pubkey,
    pub amount: u64,
    pub mint: Pubkey,
    pub provider: u8,
    pub status: bool
}
