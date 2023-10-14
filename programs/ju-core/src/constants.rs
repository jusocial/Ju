// use std::str::FromStr;

use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

pub const PROTOCOL_AUTHORITY: Pubkey =
    solana_program::pubkey!("J5xBSdY8TcEVxVorxfVQM7bdo7Ufjak6dCdjiohy8Rn6");

#[constant]
pub const MIN_PROCESSORNAME_LENGTH: usize = 5;
#[constant]
pub const MAX_PROCESSORNAME_LENGTH: usize = 50;
#[constant]
pub const MIN_APPNAME_LENGTH: usize = 3;
#[constant]
pub const MAX_APPNAME_LENGTH: usize = 30;
#[constant]
pub const MIN_URI_LENGTH: usize = 5;
#[constant]
pub const MAX_URI_LENGTH: usize = 200;
#[constant]
pub const MIN_ALIAS_LENGTH: usize = 4;
#[constant]
pub const MAX_ALIAS_LENGTH: usize = 20;
#[constant]
pub const MAX_STATUS_LENGTH: usize = 64;
#[constant]
pub const UUID_LENGTH: usize = 32;
#[constant]
pub const MAX_NOTIFICATION_LENGTH: usize = 200;

// #[constant]
// pub const  MIN_PROFILE_FIRST_NAME_LENGTH: usize = 1;
#[constant]
pub const  MAX_PROFILE_FIRST_NAME_LENGTH: usize = 20;
// #[constant]
// pub const  MIN_PROFILE_LAST_NAME_LENGTH: usize = 1;
#[constant]
pub const  MAX_PROFILE_LAST_NAME_LENGTH: usize = 30;

#[constant]
pub const  MIN_SUBSPACE_NAME_LENGTH:usize = 4;
#[constant]
pub const  MAX_SUBSPACE_NAME_LENGTH:usize = 32;

#[constant]
pub const MAX_TAG_LENGTH: usize = 20;

#[constant]
pub const MAX_AGE_IN_YEARS: i64 = 120;

pub const DISCRIMINATOR_LENGTH: usize = 8;

// Stores the size of the string.
pub const STRING_LENGTH_PREFIX: usize = 4;
// Stores the size of the string.
// pub const ENUM_LENGTH_PREFIX: usize = 1;
