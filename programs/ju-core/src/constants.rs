// use std::str::FromStr;

use anchor_lang::prelude::*;
use solana_program::pubkey::Pubkey;

pub const PROTOCOL_AUTHORITY: Pubkey =
    solana_program::pubkey!("CXbSC7kX8Akaxk78Dqb5xU74YGBLekq9KexDLbdQRbL6");

#[constant]
pub const MIN_PROCESSORNAME_LENGTH: usize = 5;
#[constant]
pub const MAX_PROCESSORNAME_LENGTH: usize = 200;
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
pub const MAX_TAG_LENGTH: usize = 12;


// Maximum allowed age in years
#[constant]
pub const MAX_AGE_IN_YEARS: i64 = 120;

// Minimum allowed age years
#[constant]
pub const MIN_AGE_IN_YEARS: i64 = 6;

pub const DISCRIMINATOR_LENGTH: usize = 8;

// Stores the size of the string.
pub const STRING_LENGTH_PREFIX: usize = 4;
// Stores the size of the string.
// pub const ENUM_LENGTH_PREFIX: usize = 1;


pub const SECONDS_IN_YEAR: i64 = 31_536_000;
pub const SECONDS_IN_DAY: i64 = 86_400;
pub const SECONDS_IN_5_YEARS: i64 = 5 * SECONDS_IN_YEAR;
pub const SECONDS_IN_10_YEARS: i64 = 10 * SECONDS_IN_YEAR;
