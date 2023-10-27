use anchor_lang::prelude::*;
use crate::constants::*;
use crate::errors::*;

// Accounts

/// DeveloperWhitelistProof account is proof that pubkey owner is able to create protocol application
///
/// # DeveloperWhitelistProof account stores:
///
/// 1. Authority address
/// 2. Developer address
///
#[account]
pub struct DeveloperWhitelistProof {
    /// Account authority (32).
    pub authority: Pubkey,
    /// Developer address (32).
    pub developer: Pubkey,
}

impl DeveloperWhitelistProof {
    pub const PREFIX: &'static str = "developer";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                 // Anchor internal discrimitator
        + 32                                                    // Pubkey
        + 32;                                                   // Pubkey
}

/// ExternalProcessorPDA that holds data about every whitelisted Protocol external Processors
///
/// # ExternalProcessorPDA account stores:
///
/// 1. Processor type 
/// 2. Proccessor Approve status
/// 3. Processor PDA authority address
/// 4. Processorr program address
/// 5. Processor developer walet
/// 6. Processor name (ASCII alphanumeric)
/// 7. Processor external metadata uri
///
#[account]
pub struct ExternalProcessorPDA {
    /// Processot type (1)
    pub processor_type: ProcessorType,
    /// Approve status
    pub is_approved: bool,
    /// Processor PDA authority (32).
    pub authority: Pubkey,
    /// External Processor executable program address
    pub program_address: Pubkey,
    /// Processor program author wallet
    pub developer_wallet: Option<Pubkey>,
    /// Processor name (STRING_LENGTH_PREFIX + MAX_PROCESSOR_NAME_LENGTH).
    pub processor_name: String,
    /// URI of the metadata (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: Option<String>,
    /// Creation Unix timestamp (8)
    pub created_at: i64,
}

impl ExternalProcessorPDA {
    pub const PREFIX: &'static str = "processor";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                 // Anchor internal discrimitator
        + 1                                                     // Enum (`processor_type`)
        + 1                                                     // bool (`is_approved`)
        + 32                                                    // Pubkey (`authority`)
        + 32                                                    // Pubkey (`program_address`)
        + 33                                                    // Option<Pubkey> (`developer_wallet`)
        + (STRING_LENGTH_PREFIX + MAX_PROCESSOR_NAME_LENGTH)    // String (`processor_name`)
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)           // Option<String> (`metadata_uri`)
        + 8;                                                    // i64 (`created_at`)

    /// Method for validating Processor Name
    ///
    /// Parameters:
    ///
    /// 1. `processor_name` - Reference to Protocol Processor name String
    /// 
    pub fn validate_name(&self, processor_name: &String) -> Result<()> {

        if processor_name.len() < MIN_PROCESSOR_NAME_LENGTH || processor_name.len() > MAX_PROCESSOR_NAME_LENGTH {
            return Err(error!(CustomError::ProcessorNameLengthIncorrect));
        }

        Ok(())
    }

}

/// # App account for every protocol Application
///
/// ## App account stores:
///
/// 1.  `authority`: Application authority address
/// 2.  `is_profile_delete_allowed`: Specifies the permission to delete a Profile
/// 3.  `is_subspace_delete_allowed`: Specifies the permission to delete a Subspace
/// 4.  `is_publication_delete_allowed`: Specifies the permission to delete a Publication
/// 5.  `is_profile_individual_processors_allowed`: Specifies the permission to assign Profile's individual external processors.
/// 6.  `is_subspace_individual_processors_allowed`: Specifies the permission to assign Subspace's individual external processors.
/// 7.  `is_publication_individual_processors_allowed`: Specifies the permission to assign Publication's individual external processors.
/// 8.  `reserved_1`: Reserved field 1
/// 9.  `reserved_2`: Reserved field 2
/// 10. `reserved_3`: Reserved field 3
/// 11. `reserved_4`: Reserved field 4
/// 12. `reserved_5`: Reserved field 5
/// 13. `reserved_6`: Reserved field 6
/// 14. `creation_year`: App creation seachable number of year
/// 15. `creation_month`: App creation seachable number of month
/// 16. `app_domain_name`: Unique Application domain name (ID) as string (ASCII alphanumeric)
/// 17. `metadata_uri`: Application metadata URI (settings)
/// 18. `registering_processor`: An address of an external processor for additional processing during Profile creation
/// 19. `connecting_processor`: An address of an external processor for additional processing during Profile connection
/// 20. `publishing_processor`: An address of an external processor for additional processing during Publication creation
/// 21. `collecting_processor`: An address of an external processor for additional processing during Publication collection
/// 22. `referencing_processor`: An address of an external processor for additional processing during Publication referencing
/// 23. `created_at` App creation unix timestamp
///
#[account]
#[derive(Default)]
pub struct App {
    /// Pubkey of the application creator (32).
    pub authority: Pubkey,

    /// Specifies the permission to delete a Profile.
    pub is_profile_delete_allowed: bool,
    /// Specifies the permission to delete a Subspace.
    pub is_subspace_delete_allowed: bool,
    /// Specifies the permission to delete a Publication.
    pub is_publication_delete_allowed: bool,

    /// Specifies the permission to assign Profile's individual external processors.
    pub is_profile_individual_processors_allowed: bool,
    /// Specifies the permission to assign Subspace's individual external processors.
    pub is_subspace_individual_processors_allowed: bool,
    /// Specifies the permission to assign Publication's individual external processors.
    pub is_publication_individual_processors_allowed: bool,

    /// Reserved field 1
    pub reserved_1: u8,
    /// Reserved field 2
    pub reserved_2: u8,
    /// Reserved field 3
    pub reserved_3: u8,
    /// Reserved field 4
    pub reserved_4: u8,

    /// Reserved field 5
    pub reserved_5: Pubkey,
    /// Reserved field 6
    pub reserved_6: Pubkey,

    /// Creation Seachable year
    pub creation_year: i64,
    /// Creation Seachable month
    pub creation_month: i64,

    /// App damain name (ID)  (STRING_LENGTH_PREFIX + MAX_APPID_LENGTH).
    pub app_domain_name: String,
    /// URI of the metadata (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: Option<String>,

    /// An address of an external processor for additional processing during Profile creation.
    pub registering_processor: Option<Pubkey>,
    /// An address of an external processor for additional processing during Profile connection.
    pub connecting_processor: Option<Pubkey>,
    /// An address of an external processor for additional processing during Publication creation.
    pub publishing_processor: Option<Pubkey>,
    /// An address of an external processor for additional processing during Publication collection.
    pub collecting_processor: Option<Pubkey>,
    /// An address of an external processor for additional processing during Publication referencing.
    pub referencing_processor: Option<Pubkey>,

    /// App creation Unix timestamp (8)
    pub created_at: i64,
}

impl App {
    pub const PREFIX: &'static str = "app";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                 // Anchor internal discriminator
        + 32                                                    // Pubkey (`authority`)
        + 1                                                     // bool (`is_profile_delete_allowed`)
        + 1                                                     // bool (`is_subspace_delete_allowed`)
        + 1                                                     // bool (`is_publication_delete_allowed`)
        + 1                                                     // bool (`is_profile_individual_processors_allowed`)
        + 1                                                     // bool (`is_subspace_individual_processors_allowed`)
        + 1                                                     // bool (`is_publication_individual_processors_allowed`)
        + 1                                                     // u8 (`reserved_1`)
        + 1                                                     // u8 (`reserved_2`)
        + 1                                                     // u8 (`reserved_3`)
        + 1                                                     // u8 (`reserved_4`)
        + 32                                                    // Pubkey (`reserved_5`)
        + 32                                                    // Pubkey (`reserved_6`)
        + 8                                                     // i64 (`creation_year`)
        + 8                                                     // i64 (`creation_month`)
        + ( STRING_LENGTH_PREFIX + MAX_APP_DOMAIN_NAME_LENGTH)  // String (`app_damain_name`)
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)           // Option<String> (`metadata_uri`)
        + (1 + 32)                                              // Option<Pubkey> (`registering_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`connecting_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`publishing_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`collecting_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`referencing_processor`)
        + 8;                                                    // i64 (`created_at`)

    /// Method for validating App Name
    ///
    /// # Parameters:
    ///
    /// 1. `app_domain_name` - Reference to Protocol unique Application name String
    /// 
    pub fn validate_domain_name(&self, app_domain_name: &String) -> Result<()> {
        if !app_domain_name.chars().all(|x| x.is_ascii_lowercase() || x.is_ascii_digit()) {
            return Err(error!(CustomError::AppDomainNameInvalid));
        }

        if app_domain_name.len() < MIN_APP_DOMAIN_NAME_LENGTH || app_domain_name.len() > MAX_APP_DOMAIN_NAME_LENGTH {
            return Err(error!(CustomError::AppDomainNameLengthIncorrect));
        }

        Ok(())
    }

}

/// Profile account that holds data about Application user
///
/// # Profile account stores:
///
/// 1.  Application account (PDA)
/// 2.  Profile authority address
/// 3.  Exchange key
/// 4.  Verification status
/// 5.  Profile gender
/// 6.  Universal 1 byte personal data field 1
/// 7.  Universal 1 byte personal data field 2
/// 8.  Universal 1 byte personal data field 3
/// 9.  Universal 1 byte personal data field 4
/// 10. Universal 1 byte personal data field 5
/// 11. Universal 1 byte personal data field 6
/// 12. Universal 1 byte personal data field 7
/// 13. Universal 1 byte personal data field 8
/// 14. Reserved field 1
/// 15. Reserved field 2
/// 16. Reserved field 3
/// 17. Reserved field 4
/// 18. Reserved field 5
/// 19. Reserved field 6
/// 20. Reserved field 7
/// 21. Reserved field 8
/// 22. Profile first name
/// 23. Profile last name
/// 24. Profile birth date as unix timestamp (rounded to date)
/// 25. Profile birth seachable number of 10-years-period (decade)
/// 26. Profile birth seachable number of 5-years-period
/// 27. Profile birth seachable number of year
/// 28. Country code 
/// 29. Region code 
/// 30. City code
/// 31. Profile creation seachable number of year
/// 32. Profile creation seachable number of month
/// 33. Profile creation seachable number of week
/// 34. Profile creation seachable number of day
/// 35. Unique Application's user Profile Alias as string (ASCII alphanumeric)
/// 36. Profile metadata URI
/// 37. External connection processor (optional)
/// 38. Profile creation unix timestamp
/// 39. Profile modification unix timestamp
///
#[account]
#[derive(Default)]
pub struct Profile {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Pubkey of the profile owner (32).
    pub authority: Pubkey,

    // Exchange key
    pub exchange_key: Pubkey,

    /// Verified status for users (1)
    pub is_verified: bool,

    /// Gender type
    pub gender: Gender,

    /// 1 byte universal field 1
    pub personal_data_1: u8,
    /// 1 byte universal field 2
    pub personal_data_2: u8,
    /// 1 byte universal field 3
    pub personal_data_3: u8,
    /// 1 byte universal field 4
    pub personal_data_4: u8,
    /// 1 byte universal field 5
    pub personal_data_5: u8,
    /// 1 byte universal field 6
    pub personal_data_6: u8,
    /// 1 byte universal field 7
    pub personal_data_7: u8,
    /// 1 byte universal field 8
    pub personal_data_8: u8,

    /// Reserved field 1
    pub reserved_1: i16,
    /// Reserved field 2
    pub reserved_2: i16,
    /// Reserved field 3
    pub reserved_3: i32,
    /// Reserved field 4
    pub reserved_4: i32,
    /// Reserved field 5
    pub reserved_5: i64,
    /// Reserved field 6
    pub reserved_6: i64,
    /// Reserved field 7
    pub reserved_7: [u8; 32],
    /// Reserved field 8
    pub reserved_8: [u8; 32],  

    /// First name
    pub first_name: [u8; MAX_PROFILE_FIRST_NAME_LENGTH],
    /// Last name
    pub last_name: [u8; MAX_PROFILE_LAST_NAME_LENGTH],

    /// Birth date unix timestamp
    pub birth_date: i64, 

    /// Birth Seachable 10 years period
    pub birth_date_10_years: i64,
    /// Birth Seachable 5 years period
    pub birth_date_5_years: i64,
    /// Birth Seachable year
    pub birth_date_year: i64,

    /// Country code
    pub country_code: u16,
    /// Region code
    pub region_code: u16,
    /// City code
    pub city_code: u16,

    /// Creation Seachable year
    pub creation_year: i64,
    /// Creation Seachable month
    pub creation_month: i64,
    /// Creation Seachable week
    pub creation_week: i64,
    /// Creation Seachable day
    pub creation_day: i64,

    /// Profile alias (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH).
    pub alias: Option<String>,
    
    /// Profile metadata URI (STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: Option<String>,

    /// An address of a Program (external processor) for Connection additional processing (33)
    pub connecting_processor: Option<Pubkey>,

    /// Profile creation Unix timestamp (8)
    pub created_at: i64,
    /// The optional Unix timestamp of the Profile modification (1 + 8)
    pub modified_at: Option<i64>,
}

impl Profile {
    pub const PREFIX: &'static str = "profile";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                         // Anchor internal discrimitator
        + 32                                                            // Pubkey (`app`)
        + 32                                                            // Pubkey (`authority`)
        + 32                                                            // Pubkey (`exchange_key`)
        + 1                                                             // bool (`is_verified`)
        + 1                                                             // enum (`gender`)
        + 1                                                             // u8 (`personal_data_1`)
        + 1                                                             // u8 (`personal_data_2`)
        + 1                                                             // u8 (`personal_data_3`)
        + 1                                                             // u8 (`personal_data_4`)
        + 1                                                             // u8 (`personal_data_5`)
        + 1                                                             // u8 (`personal_data_6`)
        + 1                                                             // u8 (`personal_data_7`)
        + 1                                                             // u8 (`personal_data_8`)
        + 2                                                             // i16 (`reserved_1`)
        + 2                                                             // i16 (`reserved_2`)
        + 4                                                             // i32 (`reserved_3`)
        + 4                                                             // i32 (`reserved_4`)
        + 8                                                             // i64 (`reserved_5`)
        + 8                                                             // i64 (`reserved_6`)
        + 32                                                            // [u8; 32] (`reserved_7`)
        + 32                                                            // [u8; 32] (`reserved_8`)
        + (MAX_PROFILE_FIRST_NAME_LENGTH)                               // [u8; MAX_PROFILE_FIRST_NAME_LENGTH] (`first_name`)
        + (MAX_PROFILE_LAST_NAME_LENGTH)                                // [u8; MAX_PROFILE_LAST_NAME_LENGTH] (`last_name`)
        + 8                                                             // i64 (`birth_date`) 
        + 8                                                             // i64 (`birth_date_10_years`)
        + 8                                                             // i64 (`birth_date_5_years`)
        + 8                                                             // i64 (`birth_date_year`)
        + 2                                                             // u16 (`geo_code_1`)
        + 2                                                             // u16 (`geo_code_2`)
        + 2                                                             // u16 (`geo_code_3`)
        + 2                                                             // u16 (`geo_code_4`)
        + 8                                                             // i64 (`creation_year`)
        + 8                                                             // i64 (`creation_month`)
        + 8                                                             // i64 (`creation_week`)
        + 8                                                             // i64 (`creation_day`) 
        + (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH)                 // Option<String> (`alias`) 
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)                   // Option<String> (`metadata uri`)
        + (1 + 32)                                                      // Option<Pubkey> (`connecting_processor`)
        + 8                                                             // i64 (`created`)
        + (1 + 8);                                                      // Option<i64> (`modified`)

    /// Method for validating Profile Alias
    ///
    /// Parameters:
    ///
    /// 1. `alias` - Reference to Application unique Alias String
    /// 
    pub fn validate_alias(&self, alias: &String) -> Result<()> {

        if !alias.chars().all(|x| x.is_ascii_lowercase() || x.is_ascii_digit() || x == '_') {
            return Err(error!(CustomError::AliasInvalid));
        }

        if alias.len() < MIN_ALIAS_LENGTH || alias.len() > MAX_ALIAS_LENGTH {
            return Err(error!(CustomError::AliasLengthIncorrect));
        }

        Ok(())
    }

    /// Method for validating Profile First name
    ///
    /// Parameters:
    ///
    /// 1. `first_name` - Reference to Profile First name String
    /// 
    pub fn validate_first_name(&self, first_name: &String) -> Result<[u8; MAX_PROFILE_FIRST_NAME_LENGTH]> {
        if first_name.len() > MAX_PROFILE_FIRST_NAME_LENGTH {
            return Err(error!(CustomError::ProfileFirstNameLengthIncorrect));
        }
    
        let mut bytes = [0u8; MAX_PROFILE_FIRST_NAME_LENGTH];
        for (i, byte) in first_name.bytes().enumerate() {
            bytes[i] = byte;
        }
    
        Ok(bytes)
    }

    /// Method for validating Profile Last name
    ///
    /// Parameters:
    ///
    /// 1. `last_name` - Reference to Profile Last name String
    /// 
    pub fn validate_last_name(&self, last_name: &String) -> Result<[u8; MAX_PROFILE_LAST_NAME_LENGTH]> {
        if last_name.len() > MAX_PROFILE_LAST_NAME_LENGTH {
            return Err(error!(CustomError::ProfileLastNameLengthIncorrect));
        }
    
        let mut bytes = [0u8; MAX_PROFILE_LAST_NAME_LENGTH];
        for (i, byte) in last_name.bytes().enumerate() {
            bytes[i] = byte;
        }
    
        Ok(bytes)
    }

}

/// The Subspace is an account (PDA) that holds data about a application Subspace (e.g. group / "public")
///
/// # Subspace account stores:
///
/// 1.  Application address
/// 2.  Profile authority address
/// 3.  Exchange key
/// 4.  Subspace creator Profile Pubkey
/// 5.  Subspace publishing permission level
/// 5.  Subspace name
/// 6.  Reserved field 1
/// 7.  Reserved field 2
/// 8.  Reserved field 3
/// 9.  Reserved field 4
/// 10. Reserved field 5
/// 11. Reserved field 6
/// 12. Subspace creation seachable number of year
/// 13. Subspace creation seachable number of month
/// 14. Subspace creation seachable number of week
/// 15. Subspace creation seachable number of day
/// 16. Unique application's user profile alias as string (optional, ASCII alphanumeric) (optional)
/// 17. Subspace UUID
/// 18. Subspace metadata URI (optional)
/// 19. External Publishing processor (optional)
/// 20. External Connecting processor (optional)
/// 21. External Collecting processor (optional)
/// 22. External Referencing processor (optional)
/// 23. Profile creation unix timestamp
///
#[account]
#[derive(Default)]
pub struct Subspace {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Pubkey of the profile owner (32).
    pub authority: Pubkey,

    // Exchange key
    pub exchange_key: Pubkey,

    /// Subspace creator Profile Pubkey (32)
    pub creator: Pubkey,
    /// Subspace publishing permission level
    pub publishing_permission: SubspacePublishingPermissionLevel,
    /// Subspace name
    pub name: [u8; MAX_SUBSPACE_NAME_LENGTH],

    /// Reserved field 1
    pub reserved_1: u8,
    /// Reserved field 2
    pub reserved_2: u8,
    /// Reserved field 3
    pub reserved_3: u8,
    /// Reserved field 4
    pub reserved_4: u8,
    /// Reserved field 1
    pub reserved_5: [u8; 32],
    /// Reserved field 2
    pub reserved_6: [u8; 32],

    /// Creation year
    pub creation_year: i64,
    /// Creation month
    pub creation_month: i64,
    /// Creation week
    pub creation_week: i64,
    /// Creation day
    pub creation_day: i64,

    /// Profile alias (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH).
    pub alias: Option<String>,
    /// Subspace UUID (UUID_LENGTH)
    pub uuid: String,
    /// Metadata URI (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: Option<String>,

    /// An address of a Program (external processor) for Publication Creating additional processing (1 + 32)
    pub publishing_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for profiles Connection additional processing (1 + 32)
    pub connecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication Collecting additional processing (1 + 32)
    pub collecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication referencing additional processing (1 + 32)
    pub referencing_processor: Option<Pubkey>,

    /// Subspace creation Unix timestamp (8)
    pub created_at: i64,
}

impl Subspace {
    pub const PREFIX: &'static str = "subspace";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                 // Anchor internal discrimitator     
        + 32                                                    // Pubkey (`app`)
        + 32                                                    // Pubkey (`authority`)
        + 32                                                    // Pubkey (`exchange_key`)
        + 32                                                    // Pubkey (`creator`)
        + 1                                                     // Enum (`publishing_permission`)
        + (MAX_SUBSPACE_NAME_LENGTH)                            // [u8; MAX_SUBSPACE_NAME_LENGTH] (`name`)
        + 1                                                     // u8 (`reserved_1`)
        + 1                                                     // u8 (`reserved_2`)
        + 1                                                     // u8 (`reserved_3`)
        + 1                                                     // u8 (`reserved_4`)
        + 32                                                    // [u8; 32] (`reserved_5`)
        + 32                                                    // [u8; 32] (`reserved_6`)
        + 8                                                     // i64 (`creation_year`)
        + 8                                                     // i64 (`creation_month`)
        + 8                                                     // i64 (`creation_week`)
        + 8                                                     // i64 (`creation_day`)
        + (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH)         // String (`alias`)
        + (STRING_LENGTH_PREFIX + UUID_LENGTH)                  // String (`uuid`)
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)           // String (`metadata_uri`)
        + (1 + 32)                                              // Option<Pubkey> (`publishing_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`connecting_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`collecting_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`referencing_processor`)
        + 8;                                                    // i64 (`created`)

    /// Method for validating Subspace Alias
    ///
    /// Parameters:
    ///
    /// 1. `alias` - Reference to Application unique Aliasr String
    /// 
    pub fn validate_alias(&self, alias: &String) -> Result<()> {

        if !alias.chars().all(|x| x.is_ascii_lowercase() || x.is_ascii_digit() || x == '_') {
            return Err(error!(CustomError::AliasInvalid));
        }

        if alias.len() < MIN_ALIAS_LENGTH || alias.len() > MAX_ALIAS_LENGTH {
            return Err(error!(CustomError::AliasLengthIncorrect));
        }

        Ok(())
    }

    /// Method for validating Subspace Name
    ///
    /// Parameters:
    ///
    /// 1. `name` - Reference to Subspace Name String
    /// 
    pub fn validate_name(&self, name: &String) -> Result<[u8; MAX_SUBSPACE_NAME_LENGTH]> {
        if name.len() < MIN_SUBSPACE_NAME_LENGTH || name.len() > MAX_SUBSPACE_NAME_LENGTH {
            return Err(error!(CustomError::SubspaceNameIncorrect));
        }
    
        let mut bytes = [0u8; MAX_SUBSPACE_NAME_LENGTH];
        for (i, byte) in name.bytes().enumerate() {
            bytes[i] = byte;
        }
    
        Ok(bytes)
    }
}

/// SubspaceManager account that holds data about Subspace management team user
///
/// # SubspaceManager account stores:
///
/// 1. Application (PDA) address
/// 2. Subspace (PDA) address
/// 3. Profile (PDA) address
/// 4. Account authority address
/// 5. Manager Role
///
#[account]
// #[derive(Default)]
pub struct SubspaceManager {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Subspace Pubkey (32)
    pub subspace: Pubkey,
    /// Pubkey of the manager Profile (32).
    pub profile: Pubkey,
    /// Pubkey of the account authority (32).
    pub authority: Pubkey,
    /// Manager role
    pub role: SubspaceManagementRoleType
}

impl SubspaceManager {
    pub const PREFIX: &'static str = "subspace_manager";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                     // Anchor internal discrimitator
        + 32                                                        // Pubkey
        + 32                                                        // Pubkey
        + 32                                                        // Pubkey
        + 32                                                        // Pubkey
        + 1;                                                        // Enum
}

/// The Publication is account (PDA) that holds Application's Publication data
///
/// # Publication account stores:
///
/// 1.  Existing Protocol Application in which Publication was created
/// 2.  References to Publication's author Profile
/// 3.  Publication authority address
/// 4.  Whether or not the publication has encrypted content
/// 5.  Whether or not the Publication is mirroring other existing Publication (e.g. re-post)
/// 6.  Whether or not the Publication is replying to other existing Publication (e.g. comment)
/// 7.  Publication main content type
/// 8.  Publication tag
/// 9.  References to existing Publication if there is a mirror or reply
/// 10. Subspace in which Publication being published
/// 11. Reserved field 1
/// 12. Reserved field 2
/// 13. Publication creation searchable number of week
/// 14. Publication creation searchable number of 3-day-perid
/// 15. Publication creation searchable number of day
/// 16. Publication UUID as string
/// 17. Publication metadata URI
/// 18. External Collecting processor (optional)
/// 19. External Referencing processor (optional)
/// 20. Publication create unix timestamp
/// 21. Publication update unix timestamp (optional)
///
#[account]
// #[derive(Default)]
pub struct Publication {
    /// Application account Pubkey (32)
    pub app: Pubkey,
    /// Publication author profile account Pubkey (32)
    pub profile: Pubkey,
    /// Publication authority account Pubkey (32)
    pub authority: Pubkey,

    /// Whether or not the publication has encrypted content
    pub is_encrypted: bool,

    /// Flag to determine whether publication is mirror (e.g. 'repost') (1)
    pub is_mirror: bool,
    /// Flag to determine whether publication is reply (e.g. 'comment') (1)
    pub is_reply: bool,

    /// Publication content main type (1)
    pub content_type: ContentType,
    /// Publication Tag (e.g. 'hashtag')
    pub tag: [u8; MAX_TAG_LENGTH],

    /// Pubkey that specify target in case Publication is a mirror or reply (32), default value if not mirror or reply
    pub target_publication: Pubkey,
    /// Subspace to publish, default value if publishing in profile space
    pub subspace: Pubkey,

    /// Reserved field 1
    pub reserved_1: u8,
    /// Reserved field 2
    pub reserved_2: u8,

    /// Searchable creation week period
    pub creation_week: i64,
    /// Searchable creation 3 day period
    pub creation_3_day: i64,
    /// Searchable creation day
    pub creation_day: i64,

    /// Publication UUID (STRING_LENGTH_PREFIX + UUID_LENGTH)
    pub uuid: String,
    /// The URI of the publication metadata(STRING_LENGTH_PREFIX + MAX_URI_LENGTH)
    pub metadata_uri: String,

    /// An address of a Program (external processor) for Publication Collecting additional processing (1 + 32)
    pub collecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication Referencing additional processing (1 + 32)
    pub referencing_processor: Option<Pubkey>,

    /// Unix timestamp of the Publication creation (8)
    pub created_at: i64,
    /// The optional Unix timestamp of the Publication modification (1 + 8)
    pub modified_at: Option<i64>,
}

impl Publication {
    pub const PREFIX: &'static str = "publication";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator   
        + 32                                            // Pubkey (`app`)
        + 32                                            // Pubkey (`profile`)
        + 32                                            // Pubkey (`authority`)
        + 1                                             // bool (`is_encrypted`)
        + 1                                             // bool (`is_mirror`)
        + 1                                             // bool (`is_reply`)
        + 1                                             // Enum (`content_type`) 
        + (MAX_TAG_LENGTH)                              // [u8; MAX_TAG_LENGTH] (`tag`)
        + 32                                            // Pubkey (`target_publication`)
        + 32                                            // Pubkey (`subspace`) 
        + 1                                             // u8 (`reserved_1`)
        + 1                                             // u8 (`reserved_2`)
        + 8                                             // i64 (`creation_week`)
        + 8                                             // i64 (`creation_3_day`)
        + 8                                             // i64 (`creation_day`)
        + (STRING_LENGTH_PREFIX + UUID_LENGTH)          // String (`uuid`)
        + (STRING_LENGTH_PREFIX + MAX_URI_LENGTH)       // String (`metadata_uri`)                               
        + (1 + 32)                                      // Option<Pubkey> (`collecting_processor`)
        + (1 + 32)                                      // Option<Pubkey> (`referencing_processor`) 
        + 8                                             // i64 (`created_at`)   
        + (1 + 8);                                      // Option<i64> (`modified_at`)


    /// Method for validating Publication Tag
    ///
    /// Parameters:
    ///
    /// 1. `tag` - Reference to Tag String
    /// 
    pub fn validate_tag(&self, tag: &String) -> Result<[u8; MAX_TAG_LENGTH]> {
        if tag.len() > MAX_TAG_LENGTH {
            return Err(error!(CustomError::PublicationTagIncorrect));
        }
    
        let mut bytes = [0u8; MAX_TAG_LENGTH];
        for (i, byte) in tag.bytes().enumerate() {
            bytes[i] = byte;
        }
    
        Ok(bytes)
    }
}

/// Connection account holds data about Connection between two Application's entities (e.g. following)
///
/// # The Connection account stores:
///
/// 1. Application address
/// 2. Connection authority address
/// 3. Connection Target type ('profile-to-profile' or 'profile-to-subspace')
/// 4. Connection initializer address (e.g. follower)
/// 5. Target Application's Profile/Subspace address (e.g. which initializer followed)
/// 6. Whether or not Connection is approved by target (e.g. accept friend request)
/// 7. Connection initialize unix timestamp
/// 8. Connection creation searchable number of 3week
/// 8. Connection creation searchable number of 3-day-period
/// 8. Connection creation searchable number of day
/// 9. Connection modify unix timestamp
///
#[account]
#[derive(Default)]
pub struct Connection {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Connection authority account Pubkey (32)
    pub authority: Pubkey,
    /// Connection Target type (1)
    pub connection_target_type: ConnectionTargetType,
    /// Connection initializer Pubkey (32)
    pub initializer: Pubkey,
    /// Connection target Pubkey (might be another Profile or Application Subspace) (32)
    pub target: Pubkey,
    /// Flag to determine whether Connection is approved by target entitty (e.g. accept friend request or private group acceptance) (1)
    pub is_approved: bool,
    /// Connection initialization Unix timestamp (8)
    pub created_at: i64,
    /// Searchable creation week
    pub creation_week: i64,
    /// Searchable creation 3 day period
    pub creation_3_day: i64,
    /// Searchable day
    pub creation_day: i64,
    /// Connection approve Unix timestamp (1 + 8)
    pub modified_at: Option<i64>,
}

impl Connection {
    pub const PREFIX: &'static str = "connection";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator  
        + 32                                            // Pubkey (`app`)
        + 32                                            // Pubkey (`authority`)
        + 1                                             // Enum variant (`connection_target_type`)
        + 32                                            // Pubkey (`initializer`)
        + 32                                            // Pubkey (`target`)
        + 1                                             // bool (`is_approved`)
        + 8                                             // i64 (`created_at`)
        + 8                                             // i64 (`creation_week`)
        + 8                                             // i64 (`creation_3_day`)
        + 8                                             // i64 (`creation_day`)
        + (1 + 8);                                      // Option<i64> (`modified_at`)
}

/// CollectionItem account that creates when some Profile collects some Application Entity (e.g. Publication)
///
/// # The CollectionItem account stores:
///
/// 1. Application address
/// 2. CollectionItem initializer Profile address
/// 3. CollectionItem target entity (e.g. Publication) address
/// 4. CollectionItem authority address
/// 5. CollectionItem creation unix timestamp
/// 6. CollectionItem creation searchable number of 3week
/// 7. CollectionItem creation searchable number of 3-day-period
/// 8. CollectionItem creation searchable number of day
///
#[account]
#[derive(Default)]
pub struct CollectionItem {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// CollectionItem initializer account Pubkey (32)
    pub initializer: Pubkey,
    /// CollectionItem target Publication Pubkey (32)
    pub target: Pubkey,
    /// CollectionItem authority account Pubkey (32)
    pub authority: Pubkey,
    /// Unix timestamp of the CollectionItem creation (8)
    pub created_at: i64,
    /// Searchable creation week
    pub creation_week: i64,
    /// Searchable creation 3-day period
    pub creation_3_day: i64,
    /// Searchable creation day
    pub creation_day: i64,
}

impl CollectionItem {
    pub const PREFIX: &'static str = "collection_item";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH       
        + 32                                            // Pubkey (`app`)
        + 32                                            // Pubkey (`intializer`)
        + 32                                            // Pubkey (`target`)
        + 32                                            // Pubkey (`authority`)
        + 8                                             // i64 (`created_at`)
        + 8                                             // i64 (`creation_week`)
        + 8                                             // i64 (`creation_3_day`)
        + 8;                                            // i64 (`creation_day`)
}

/// Alias account that creates when new Alias is claimed by user Profile or Subspace
///
/// # The Alias account stores:
///
/// 1. Application address
/// 2. Profile which the alias belongs to
/// 3. Alias authority address
/// 4. Alias value
///
#[account]
#[derive(Default)]
pub struct Alias {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Alias type (1)
    pub alias_type: AliasType,
    /// Alias owner (Profile or Subspace) Pubkey (32)
    pub owner: Pubkey,
    /// Alias authority account Pubkey (32)
    pub authority: Pubkey,
    /// Alias value (STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH)
    pub value: String,
}

impl Alias {
    pub const PREFIX: &'static str = "alias";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator 
        + 32                                            // Pubkey
        + 1                                             // Enum variant
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + (STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH);   // String
}

/// Reaction account that creates when new Publication Reaction initialized
///
/// # The Reaction account stores:
///
/// 1.  Application address
/// 2.  Reaction authority address
/// 3.  Reaction Traget type
/// 4.  Target Publication address
/// 5.  Reaction initializer Profile
/// 6.  Reaction type variant
/// 7.  Reaction create unix timestamp
/// 8.  Reaction creation searchable number of 3week
/// 9.  Reaction creation searchable number of 3-day-period
/// 10. Reaction creation searchable number of day
///
#[account]
// #[derive(Default)]
pub struct Reaction {
    /// Application account Pubkey (32)
    pub app: Pubkey,
    /// Reaction authority account Pubkey (32)
    pub authority: Pubkey,
    /// Reaction target type (1)
    pub target_type: ReactionTargetType,
    /// Reaction target Publication Pubkey (32)
    pub target: Pubkey,
    /// Reaction initializer Profile Pubkey (32)
    pub initializer: Pubkey,
    /// Unix timestamp of the Reaction creation (8)
    pub created_at: i64,
    /// Searchable creation week
    pub creation_week: i64,
    /// Searchable creation 3-day period
    pub creation_3_day: i64,
    /// Searchable creation day
    pub creation_day: i64,
    /// Reaction value (1 + 8)
    pub reaction_type: ReactionType,
}

impl Reaction {
    pub const PREFIX: &'static str = "reaction";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator 
        + 32                                            // Pubkey (`app`)
        + 32                                            // Pubkey (`authority`)
        + 1                                             // Enum (`target_type`)
        + 32                                            // Pubkey (`target`)
        + 32                                            // Pubkey (`initializer`)
        + 8                                             // i64 (`created_at`)
        + 8                                             // i64 (`creation_week`)
        + 8                                             // i64 (`creation_3_day`)
        + 8                                             // i64 (`creation_day`)
        + (1 + 8);                                      // Enum (`reaction_type`)
}

/// Report account that creates when new Report initialized
///
/// # Report account stores:
///
/// 1.  Application address
/// 2.  Report authority address
/// 3.  Report Taget type
/// 4.  Report Target address
/// 5.  Report initializer Profile
/// 6.  Report type variant
/// 7.  Report create unix timestamp
/// 8.  Report creation searchable number of 3week
/// 9.  Report creation searchable number of 3-day-period
/// 10. Report creation searchable number of day
/// 11. Report notification text
///
#[account]
// #[derive(Default)]
pub struct Report {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Alias authority account Pubkey (32)
    pub authority: Pubkey,
    /// Report target type (1)
    pub target_type: ReportTargetType,
    /// Report target Publication Pubkey (32)
    pub target: Pubkey,
    /// Report initializer Pubkey (32)
    pub initializer: Pubkey,
    /// Report type value (1)
    pub report_type: ReportType,
    /// Unix timestamp of the Report creation (8)
    pub created_at: i64,
    /// Searchable creation week
    pub creation_week: i64,
    /// Searchable creation 3-day period
    pub creation_3_day: i64,
    /// Searchable creation day
    pub creation_day: i64,
    /// Report Notification
    pub notification: Option<String>,
}

impl Report {
    pub const PREFIX: &'static str = "report";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH                         // Anchor internal discrimitator  
        + 32                                                            // Pubkey (`app`)
        + 32                                                            // Pubkey (`authority`)
        + 1                                                             // Enum (`target_type`)
        + 32                                                            // Pubkey (`target`)
        + 32                                                            // Pubkey (`initializer`)
        + 1                                                             // Enum (`report_type`)
        + 8                                                             // i64 (`created_at`)
        + 8                                                             // i64 (`creation_week`)
        + 8                                                             // i64 (`creation_3_day`)
        + 8                                                             // i64 (`creation_day`)
        + (1 + STRING_LENGTH_PREFIX + MAX_REPORT_NOTIFICATION_LENGTH);  // Option<String>
}

/// ## App instruction data struct.
///
/// The struct contains data for the application instruction.
///
/// ## Fields:
///
/// - `metadata_uri`: The optional metadata URI for the app.
/// - `is_profile_delete_allowed`: Specifies the permission to delete a Profile.
/// - `is_subspace_delete_allowed`: Specifies the permission to delete a Subspace.
/// - `is_publication_delete_allowed`: Specifies the permission to delete a Publication.
/// - `is_profile_individual_processors_allowed`: Specifies the permission to assign Profile's individual external processors.
/// - `is_subspace_individual_processors_allowed`: Specifies the permission to assign Subspace's individual external processors.
/// - `is_publication_individual_processors_allowed`: Specifies the permission to assign Publication's individual external processors.
/// 
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct AppData {
    pub metadata_uri: Option<String>,
    pub is_profile_delete_allowed: bool,
    pub is_subspace_delete_allowed: bool,
    pub is_publication_delete_allowed: bool,
    pub is_profile_individual_processors_allowed: bool,
    pub is_subspace_individual_processors_allowed: bool,
    pub is_publication_individual_processors_allowed: bool, 
}

/// Profile instruction data struct
///
/// # Struct contains:
///
/// 1.  `alias` - Unique Application's user Profile Alias as string (ASCII alphanumeric)
/// 2.  `metadata_uri` - Profile metadata URI
/// 3.  `gender` - Profile gender
/// 4.  `relations_status` - Profile relations status
/// 5.  `sexuality` - Profile sexuality
/// 6.  `education` - Profile education
/// 7.  `body_shape` - Profile body shape
/// 8.  `height_type` - Profile body shape
/// 9.  `first_name` Profile first name
/// 10. `last_name` Profile last name
/// 11. `birth_date` - Profile birth date
/// 12. `country_code` Country code
/// 13. `region_code` Region code
/// 14. `city_code` City code
/// 15. `personal_data_1` Universal 1 byte field 1
/// 16. `personal_data_2` Universal 1 byte field 2
/// 17. `personal_data_3` Universal 1 byte field 3
/// 18. `personal_data_4` Universal 1 byte field 4
/// 19. `personal_data_5` Universal 1 byte field 5
/// 20. `personal_data_6` Universal 1 byte field 6
/// 21. `personal_data_7` Universal 1 byte field 7
/// 22. `personal_data_8` Universal 1 byte field 8
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct ProfileData {
    pub alias: Option<String>,
    pub metadata_uri: Option<String>,
    pub gender: Option<Gender>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub birth_date: Option<i64>,
    pub country_code: Option<u16>,
    pub region_code: Option<u16>,
    pub city_code: Option<u16>,
    pub personal_data_1: Option<u8>,
    pub personal_data_2: Option<u8>,
    pub personal_data_3: Option<u8>,
    pub personal_data_4: Option<u8>,
    pub personal_data_5: Option<u8>,
    pub personal_data_6: Option<u8>,
    pub personal_data_7: Option<u8>,
    pub personal_data_8: Option<u8>,
}

/// Subspace data struct
///
/// # Struct contains:
///
/// 1. `alias` - Unique Application's Subspace Alias as string (ASCII alphanumeric) (optional)
/// 2. `name` - Subspace name
/// 3. `metadata_uri` - Publication metadata URI (optional)
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct SubspaceData {
    pub alias: Option<String>,
    pub name: String,
    pub publishing_permission: SubspacePublishingPermissionLevel,
    pub metadata_uri: Option<String>,
}

/// Publication data struct
///
/// # Struct contains:
///
/// 1. `is_encrypted` - Whether or not the publication has encrypted content
/// 2. `metadata_uri` - Publication metadata URI
/// 3. `is_mirror` - Whether or not the publication is mirroring other existing publication (e.g. re-post)
/// 4. `is_reply` - Whether or not the publication is replying to other existing publication (e.g. comment)
/// 5. `content_type` - Publication content type
/// 6. `tag` - Publication Tag
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct PublicationData {
    pub is_encrypted: bool,
    pub metadata_uri: String,
    pub is_mirror: bool,
    pub is_reply: bool,
    pub content_type: ContentType,
    pub tag: String,
}

/// Report data struct
///
/// # Struct contains:
///
/// 1. `report_type` - Enum with Report variants
/// 2. `notification_string` - Additional Report information
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct ReportData {
    pub report_type: ReportType,
    pub notification_string: Option<String>,
}

/// External Processor Type
///
/// # Enum variants:
///
/// 0. Registering
/// 1. Connecting
/// 2. Publishing
/// 3. Collecting
/// 4. Referencing
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ProcessorType {
    Registering,
    Connecting,
    Publishing,
    Collecting,
    Referencing
}

/// Alias type (e.g. Profile or Subspace)
///
/// # Enum variants:
///
/// 0. Profile
/// 1. Subspace
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum AliasType {
    #[default]
    Profile,
    Subspace,
}

/// Connection Target type (e.g. Profile or Subspace)
///
/// # Enum variants:
///
/// 0. Profile
/// 1. Subspace
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ConnectionTargetType {
    #[default]
    Profile,
    Subspace,
}

/// Gender type
///
/// # Enum variants:
///
/// 0. Not Specified
/// 1. Male
/// 2. Female
/// 3. Other (or Prefer not to say)
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum Gender {
    #[default]
    NotSpecified,
    Male,
    Female,
    OtherOrPreferNotToSay
}

/// Content type that publication focus
///
/// # Enum variants:
///
/// 0. NotSpecified: Not specified or disclosed.
/// 1. Article - Article type (e.g. - mixed content / blog post)
/// 2. Image file - Image file type
/// 3. Video file - Video file type
/// 4. Short video - Shor video file type
/// 5. Audio file - Audio file type
/// 6. Text only - Text type
/// 7. Document
/// 8. External link - Link type
/// 9. Poll
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ContentType {
    #[default]
    NotSpecified,
    Article,
    Image,
    Video,
    ShortVideo,
    Audio,
    Text,
    Document,
    Link,
    Poll
}

/// Subspace publishing permission level
///
/// # Enum variants:
///
/// 0. All
/// 1. AllMembers
/// 2. ApprovedMembers
/// 3. Admins
/// 4. Owner
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum SubspacePublishingPermissionLevel {
    All,
    #[default]
    AllMembers,
    ApprovedMembers,
    Admins,
    Owner
}

/// Reaction Target type
///
/// # Enum variants:
///
/// 0. Profile
/// 1. Publication
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ReactionTargetType { 
    Profile,
    Publication
} 

/// Reaction type (e.g. Like / Dislike)
///
/// # Enum variants:
///
/// 0. UpVote - (e.g. "Like")
/// 1. DownVote - (e.g. "Dislike")
/// 2. CustomVote - custom smile/icon implementation
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ReactionType {
    #[default]
    UpVote,
    DownVote,
    CustomVote { code: u32 },
}

/// Report Target type
///
/// # Enum variants:
///
/// 0. Profile
/// 1. Subspace
/// 2. Publication
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ReportTargetType { 
    Profile,
    Subspace,
    Publication
}   

/// Report type
///
/// # Enum variants:
///
/// 0. Scam
/// 1. Abuse
/// 2. Spam
/// 3. HateSpeech
/// 4. Harassment
/// 5. Misinformation
/// 6. Violence
/// 7. Threats
/// 8. Copyright
/// 9. Adult
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ReportType { 
    Scam,
    Phishing,
    Abuse,
    Spam,
    HateSpeech,
    Harassment,
    Misinformation,
    Violence,
    Threats,
    Copyright,
    Adult,
}

/// Subspace management Roles
///
/// # Enum variants:
///
/// 0. Admin
/// 1. Publisher
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum SubspaceManagementRoleType { 
    Publisher,
    Admin
}