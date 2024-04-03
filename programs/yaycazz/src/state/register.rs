use anchor_lang::prelude::*;

#[account]
pub struct Register {
    pub count: u64,
    pub try_count: u64,
    pub user: Pubkey,
    pub wizzard: Pubkey,
    pub event: Pubkey,
    pub auth_bump : u8,
    pub register_bump : u8,
}
impl Space for Register {
    const INIT_SPACE: usize = 8 + 32 + 8 + 8 + 32 + 32 + 1 + 1;
}
