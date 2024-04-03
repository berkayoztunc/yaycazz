use anchor_lang::prelude::*;

#[account]
pub struct Events {
    pub types: EventsType,
    pub event_bump: u8,
}

impl Events {
    pub const BLOCK_BASE_SPACE: usize = 8 + 8 + 8 + 8 + 8 + 1 + 1;
    pub const BLOCK_BASE_WITH_PANYALTY_SPACE: usize = 8 + 8 + 8 + 8 + 8 + 1 + 1;
    pub const WHITELIST_BASE: usize = 8 + 8 + 8 + 8 + 8 + 1 + 1;

    pub fn space(event_type : u64) -> usize {
        match event_type {
            0 => Events::BLOCK_BASE_SPACE,
            1 => Events::BLOCK_BASE_WITH_PANYALTY_SPACE,
            2 => Events::WHITELIST_BASE,
            _ => panic!("Invalid event type"), 
        }
    }

}
#[derive(InitSpace, Debug, Clone, AnchorSerialize, AnchorDeserialize)]

pub enum EventsType {
    BlockBasePenalty(BlockBaseWithPanyalty),
    BlockBase(BlockBase),
    WhitelistBase(WhitelistBase),
}

#[derive(InitSpace, Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct BlockBase{
    pub remain_supply: u64,
    pub total_try: u64,
    pub distribution_amount: u64,
    pub block_height: u64,
    pub mint_per_block: u8,
    pub block_remaining_mint: u8,
    pub is_penalty: bool,
}

#[derive(InitSpace, Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct BlockBaseWithPanyalty{
    pub remain_supply: u64,
    pub total_try: u64,
    pub distribution_amount: u64,
    pub block_remaining_mint: u8,
    pub block_height: u64,
    pub mint_per_block: u8,
    pub is_penalty: bool,
}

#[derive(InitSpace, Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct WhitelistBase{
    pub tree:Pubkey,
    pub distribution_amount: u64,
}