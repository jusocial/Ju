// use std::str::FromStr;

use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

pub const PROTOCOL_AUTHORITY: Pubkey =
    solana_program::pubkey!("juadminGJxEdGpZ3MJP8sM3QypwzuzZpko1ueonUQgK");

// pub const PROTOCOL_AUTHORITY: Pubkey = Pubkey::from_str("juadminGJxEdGpZ3MJP8sM3QypwzuzZpko1ueonUQgK").unwrap();

#[constant]
pub const MIN_PROCESSORNAME_LENGTH: usize = 5;
#[constant]
pub const MAX_PROCESSORNAME_LENGTH: usize = 10;
#[constant]
pub const MIN_APPNAME_LENGTH: usize = 5;
#[constant]
pub const MAX_APPNAME_LENGTH: usize = 10;
#[constant]
pub const MIN_URI_LENGTH: usize = 5;
#[constant]
pub const MAX_URI_LENGTH: usize = 100;
#[constant]
pub const MIN_HANDLE_LENGTH: usize = 4;
#[constant]
pub const MAX_HANDLE_LENGTH: usize = 10;
#[constant]
pub const MAX_STATUS_LENGTH: usize = 64;
#[constant]
pub const UUID_LENGTH: usize = 32;
#[constant]
pub const MAX_NOTIFICATION_LENGTH: usize = 100;

pub const DISCRIMINATOR_LENGTH: usize = 8;

// Stores the size of the string.
pub const STRING_LENGTH_PREFIX: usize = 4;
// Stores the size of the string.
// pub const ENUM_LENGTH_PREFIX: usize = 1;
