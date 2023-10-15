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
/// 3. Processor name (ASCII alphanumeric)
/// 4. Processor PDA authority address
/// 5. Processor developer walet
/// 6. Processorr program address
///
#[account]
pub struct ExternalProcessorPDA {
    /// Processot type (1)
    pub processor_type: ProcessorType,
    /// Approve status
    pub is_approved: bool,
    /// Processor name (STRING_LENGTH_PREFIX + MAX_PROCESSORNAME_LENGTH).
    pub processor_name: String,
    /// Processor PDA authority (32).
    pub authority: Pubkey,
    /// Processor program author wallet
    pub developer_wallet: Option<Pubkey>,
    /// External Processor executable program address
    pub program_address: Pubkey,
}

impl ExternalProcessorPDA {
    pub const PREFIX: &'static str = "processor";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                 // Anchor internal discrimitator
        + 1                                                     // Enum (`processor_type`)
        + 1                                                     // bool (`is_approved`)
        + (STRING_LENGTH_PREFIX + MAX_PROCESSORNAME_LENGTH)     // String (`processor_name`)    
        + 32                                                    // Pubkey (`authority`)
        + 33                                                    // Option<Pubkey> (`developer_wallet`)
        + 32;                                                   // Pubkey (`program_address`)

    /// Method for validating Processor Name
    ///
    /// Parameters:
    ///
    /// 1. `processor_name` - Reference to Protocol Processor name String
    /// 
    pub fn validate_name(&self, processor_name: &String) -> Result<()> {

        if !processor_name.chars().all(|x| x.is_ascii_lowercase() || x.is_ascii_digit()) {
            return Err(error!(CustomError::ProcessorNameInvalid));
        }

        if processor_name.len() < MIN_PROCESSORNAME_LENGTH || processor_name.len() > MAX_PROCESSORNAME_LENGTH {
            return Err(error!(CustomError::ProcessorNameLengthIncorrect));
        }

        Ok(())
    }

}

/// # App account for every protocol Application
///
/// ## App account stores:
///
/// 1. `authority`: Application authority address
/// 2. `profile_gender_required`: Specifies whether the Profile gender is required
/// 3. `profile_first_name_required`: Specifies whether the Profile first name is required
/// 4. `profile_last_name_required`: Specifies whether the Profile last name is required
/// 5. `profile_birthdate_required`: Specifies whether the Profile birth date is required
/// 6. `profile_country_required`: Specifies whether the Profile country is required
/// 7. `profile_region_required`: Specifies whether the Profile region is required
/// 8. `profile_city_required`: Specifies whether the Profile city is required
/// 9. `profile_metadata_required`: Specifies whether the Profile metadata required
/// 10. `subspace_metadata_required`: Specifies whether the Subspace metadata required
/// 11. `profile_delete_allowed`: Specifies the permission to delete a Profile
/// 12. `subspace_delete_allowed`: Specifies the permission to delete a Subspace
/// 13. `publication_delete_allowed`: Specifies the permission to delete a Publication
/// 14. `profile_individual_processors_allowed`: Specifies the permission to assign Profile's individual external processors.
/// 15. `subspace_individual_processors_allowed`: Specifies the permission to assign Subspace's individual external processors.
/// 16. `publication_individual_processors_allowed`: Specifies the permission to assign Publication's individual external processors.
/// 17. `app_name`: Unique Application name (ID) as string (ASCII alphanumeric)
/// 18. `metadata_uri`: Application metadata URI (settings)
/// 18. `registering_processor`: An address of an external processor for additional processing during Profile creation
/// 19. `connecting_processor`: An address of an external processor for additional processing during Profile connection
/// 20. `publishing_processor`: An address of an external processor for additional processing during Publication creation
/// 21. `collecting_processor`: An address of an external processor for additional processing during Publication collection
/// 22. `referencing_processor`: An address of an external processor for additional processing during Publication referencing
/// 23.  ***** `reserved_1`: Reserved field 1
/// 24.  ***** `reserved_1`: Reserved field 2
/// 25.  ***** `reserved_1`: Reserved field 3
///
#[account]
#[derive(Default)]
pub struct App {
    /// Pubkey of the application creator (32).
    pub authority: Pubkey,
    
    /// Specifies whether the Profile gender is required.
    pub profile_gender_required: bool,

    /// Specifies whether the Profile name is required.
    pub profile_first_name_required: bool,
    /// Specifies whether the Profile last name is required.
    pub profile_last_name_required: bool,

    /// Specifies whether the Profile birth date is required.
    pub profile_birthdate_required: bool,

    /// Specifies whether the Profile country is required.
    pub profile_country_required: bool,
    /// Specifies whether the Profile region is required.
    pub profile_region_required: bool,
    /// Specifies whether the Profile city is required.
    pub profile_city_required: bool,

    /// Specifies whether the Profile metadata required.
    pub profile_metadata_required: bool,
    /// Specifies whether the Subspace metadata required.
    pub subspace_metadata_required: bool,

    /// Specifies the permission to delete a Profile.
    pub profile_delete_allowed: bool,
    /// Specifies the permission to delete a Subspace.
    pub subspace_delete_allowed: bool,
    /// Specifies the permission to delete a Publication.
    pub publication_delete_allowed: bool,

    /// Specifies the permission to assign Profile's individual external processors.
    pub profile_individual_processors_allowed: bool,
    /// Specifies the permission to assign Subspace's individual external processors.
    pub subspace_individual_processors_allowed: bool,
    /// Specifies the permission to assign Publication's individual external processors.
    pub publication_individual_processors_allowed: bool,

    /// App name/ID (STRING_LENGTH_PREFIX + MAX_APPID_LENGTH).
    pub app_name: String,
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

    // Reserved field 1
    pub reserved_1: [u8; 32],
    // Reserved field 2
    pub reserved_2: [u8; 32],
    // Reserved field 3
    pub reserved_3: [u8; 32],
}

impl App {
    pub const PREFIX: &'static str = "app";

    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discriminator
        + 32                                            // Pubkey (`authority`)
        + 1                                             // bool (`profile_gender_required`)
        + 1                                             // bool (`profile_first_name_required`)
        + 1                                             // bool (`profile_last name_required`)
        + 1                                             // bool (`profile_birthdate_required`)
        + 1                                             // bool (`profile_country_required`)
        + 1                                             // bool (`profile_region_required`)
        + 1                                             // bool (`profile_city_required`)
        + 1                                             // bool (`profile_metadata_required`)
        + 1                                             // bool (`subspace_metadata_required`)
        + 1                                             // bool (`profile_delete_allowed`)
        + 1                                             // bool (`subspace_delete_allowed`)
        + 1                                             // bool (`publication_delete_allowed`)
        + 1                                             // bool (`profile_individual_processors_allowed`)
        + 1                                             // bool (`subspace_individual_processors_allowed`)
        + 1                                             // bool (`publication_individual_processors_allowed`)
        + (STRING_LENGTH_PREFIX + MAX_APPNAME_LENGTH)   // String (`app_name`)
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)   // Option<String> (`metadata_uri`)
        + (1 + 32)                                      // Option<Pubkey> (`registering_processor`)
        + (1 + 32)                                      // Option<Pubkey> (`connecting_processor`)
        + (1 + 32)                                      // Option<Pubkey> (`publishing_processor`)
        + (1 + 32)                                      // Option<Pubkey> (`collecting_processor`)
        + (1 + 32)                                      // Option<Pubkey> (`referencing_processor`)
        + 32                                            // [u8;32] (`reserved_1`)
        + 32                                            // [u8;32] (`reserved_2`)
        + 32;                                           // [u8;32] (`reserved_3`)

    /// Method for validating App Name
    ///
    /// # Parameters:
    ///
    /// 1. `app_name` - Reference to Protocol unique Application name String
    /// 
    pub fn validate_name(&self, app_name: &String) -> Result<()> {
        if !app_name.chars().all(|x| x.is_ascii_lowercase() || x.is_ascii_digit()) {
            return Err(error!(CustomError::AppNameInvalid));
        }

        if app_name.len() < MIN_APPNAME_LENGTH || app_name.len() > MAX_APPNAME_LENGTH {
            return Err(error!(CustomError::AppNameLengthIncorrect));
        }

        Ok(())
    }

}

/// Profile account that holds data about Application user
///
/// # Profile account stores:
///
/// 1. Profile creation unix timestamp
/// 2. Application account (PDA)
/// 3. Profile authority address
/// 4. Exchange key
/// 5. Verification status
/// 6. Profile birth date (0 if not set)
/// 7. Profile country code (0 if not set)
/// 8. Profile region code (0 if not set)
/// 9. Profile city code (0 if not set)
/// 10. Profile first name
/// 11. Profile last name
/// 12. Profile gender
/// 13. Unique Application's user Profile Alias as string (ASCII alphanumeric)
/// 14. Profile status text
/// 15. Profile metadata URI
/// 16. Profile location coordinates
/// 17. External connection processor (optional)
/// 28. Profile modification unix timestamp
/// 19. ***** Reserved field 1
/// 20. ***** Reserved field 2
/// 21. ***** Reserved field 3
///
#[account]
#[derive(Default)]
pub struct Profile {
    /// Profile creation Unix timestamp (8)
    pub created_at: i64,

    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Pubkey of the profile owner (32).
    pub authority: Pubkey,
    // Exchange key
    pub exchange_key: Pubkey,

    /// Verified status for users (1)
    pub is_verified: bool,

    // Birth date as a Unix timestamp
    pub birth_date: i64,
    // Profile's country
    pub country_code: i16,
    // Profile's region (region)
    pub region_code: i16,
    // Profile's city
    pub city_code: i16,    

    // Profile's user first name
    pub first_name: [u8; MAX_PROFILE_FIRST_NAME_LENGTH],
    // Profile's user last name
    pub last_name: [u8; MAX_PROFILE_LAST_NAME_LENGTH],

    /// Profile's user gender
    pub gender: Option<Gender>,

    /// Profile alias (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH).
    pub alias: Option<String>,

    /// Profile Status text (STRING_LENGTH_PREFIX + MAX_STATUS_LENGTH)
    pub status_text: String,
    
    /// Profile metadata URI (STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: Option<String>,
    
    // Profile's current location coordinates
    pub current_location: Option<LocationCoordinates>,

    /// An address of a Program (external processor) for Connection additional processing (33)
    pub connecting_processor: Option<Pubkey>,

    /// The optional Unix timestamp of the Profile modification (1 + 8)
    pub modified_at: Option<i64>,

    // Reserved field 1
    pub reserved_1: [u8; 32],
    // Reserved field 2
    pub reserved_2: [u8; 32],
    // Reserved field 3
    pub reserved_3: [u8; 32],
}

impl Profile {
    pub const PREFIX: &'static str = "profile";

    pub const LEN: usize = DISCRIMINATOR_LENGTH                         // Anchor internal discrimitator
        + 8                                                             // i64 (`created`)
        + 32                                                            // Pubkey (`app`)
        + 32                                                            // Pubkey (`authority`)
        + 32                                                            // Pubkey (`exchange_key`)
        + 1                                                             // bool (`is_verified`)
        + 8                                                             // i64 (`birth_date`)
        + 2                                                             // i16 (`country_code`)
        + 2                                                             // i16 (`region_code`)
        + 2                                                             // i16 (`city_code`)
        + (MAX_PROFILE_FIRST_NAME_LENGTH)                               // [u8; MAX_PROFILE_FIRST_NAME_LENGTH] (`first_name`)
        + (MAX_PROFILE_LAST_NAME_LENGTH)                                // [u8; MAX_PROFILE_LAST_NAME_LENGTH] (`last_name`)  
        + (1 + 1)                                                       // Option<Enum> (`gender`) 
        + (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH)                 // Option<String> (`alias`) 
        + (STRING_LENGTH_PREFIX + MAX_STATUS_LENGTH)                    // String (`status_text`) 
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)                   // Option<String> (`metadata uri`)
        + (1 + 8 + 8)                                                   // Option<{u64, u64}> (`current_location`)
        + (1 + 32)                                                      // Option<Pubkey> (`connecting_processor`)
        + (1 + 8)                                                       // Option<i64> (`modified`)
        + 32                                                            // Pubkey (`reserved_1`)
        + 32                                                            // Pubkey (`reserved_2`)
        + 32;                                                           // Pubkey (`reserved_3`)

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
/// 1. Application address
/// 2. Profile authority address
/// 3. Subspace owner Profile Pubkey
/// 4. Exchange key
/// 5. Subspace name
/// 6. Subspace publishing permission level
/// 7. Unique application's user profile alias as string (optional, ASCII alphanumeric) (optional)
/// 8. Subspace UUID
/// 9. Subspace metadata URI (optional)
/// 10. External Publishing processor (optional)
/// 11. External Connecting processor (optional)
/// 12. External Collecting processor (optional)
/// 13. External Referencing processor (optional)
/// 14. ***** Reserved field 1
/// 15. ***** Reserved field 2
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

    // Reserved field 1
    pub reserved_1: [u8; 32],
    // Reserved field 2
    pub reserved_2: [u8; 32],
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
        + (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH)         // String (`alias`)
        + (STRING_LENGTH_PREFIX + UUID_LENGTH)                  // String (`uuid`)
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)           // String (`metadata_uri`)
        + (1 + 32)                                              // Option<Pubkey> (`publishing_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`connecting_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`collecting_processor`)
        + (1 + 32)                                              // Option<Pubkey> (`referencing_processor`)
        + 32                                                    // [u8;32] (`reserved_1`)
        + 32;                                                   // [u8;32] (`reserved_2`)

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
/// 1. Publication create unix timestamp
/// 2. ***** Reserved field 1
/// 3. Existing Protocol Application in which Publication was created
/// 4. References to Publication's author Profile
/// 5. Publication authority address
/// 6. Whether or not the publication has encrypted content
/// 7. Whether or not the Publication is mirroring other existing Publication (e.g. re-post)
/// 8. Whether or not the Publication is replying to other existing Publication (e.g. comment)
/// 9. Publication main content type
/// 10. Publication tag
/// 11. References to existing Publication if there is a mirror or reply (optional)
/// 12. Subspace in which Publication being published (optional)
/// 13. Publication UUID as string
/// 14. Publication metadata URI
/// 15. External Collecting processor (optional)
/// 16. External Referencing processor (optional)
/// 17. Publication update unix timestamp (optional)
///
#[account]
// #[derive(Default)]
pub struct Publication {
    /// Unix timestamp of the Publication creation (8)
    pub created_at: i64,

    // Reserved field 1
    pub reserved_1: [u8; 32],

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
    /// Publication Tag (e.g. '#hashtag')
    pub tag: [u8; MAX_TAG_LENGTH],

    /// Pubkey that specify target in case Publication is a mirror or reply (32), default value if not mirror or reply
    pub target_publication: Pubkey,

    /// Subspace to publish 
    pub subspace: Option<Pubkey>,

    /// Publication UUID (STRING_LENGTH_PREFIX + UUID_LENGTH)
    pub uuid: String,
    /// The URI of the publication metadata(STRING_LENGTH_PREFIX + MAX_URI_LENGTH)
    pub metadata_uri: String,

    /// An address of a Program (external processor) for Publication Collecting additional processing (1 + 32)
    pub collecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication Referencing additional processing (1 + 32)
    pub referencing_processor: Option<Pubkey>,

    /// The optional Unix timestamp of the Publication modification (1 + 8)
    pub modified_at: Option<i64>,
}

impl Publication {
    pub const PREFIX: &'static str = "publication";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator   
        + 8                                             // i64 (`created_at`)
        + 32                                            // [u8;32] (`reserved_1`) 
        + 32                                            // Pubkey (`app`)
        + 32                                            // Pubkey (`profile`)
        + 32                                            // Pubkey (`authority`)
        + 1                                             // bool (`is_encrypted`)
        + 1                                             // bool (`is_mirror`)
        + 1                                             // bool (`is_reply`)
        + 1                                             // Enum (`content_type`) 
        + (MAX_TAG_LENGTH)                              // [u8; MAX_TAG_LENGTH] (`tag`)
        + 32                                            // Pubkey (`target_publication`)
        + (1 + 32)                                      // Option<Pubkey> (`subspace`) 
        + (STRING_LENGTH_PREFIX + UUID_LENGTH)          // String (`uuid`)
        + (STRING_LENGTH_PREFIX + MAX_URI_LENGTH)       // String (`metadata_uri`)                               
        + (1 + 32)                                      // Option<Pubkey> (`collecting_processor`)
        + (1 + 32)                                      // Option<Pubkey> (`referencing_processor`)    
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
/// 8. Connection modify unix timestamp
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
    pub approved: bool,
    /// Connection initialization Unix timestamp (8)
    pub created_at: i64,
    /// Connection approve Unix timestamp (1 + 8)
    pub modified_at: Option<i64>,
}

impl Connection {
    pub const PREFIX: &'static str = "connection";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator  
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 1                                             // Enum variant
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 1                                             // bool
        + 8                                             // i64
        + (1 + 8);                                      // Option<i64>
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
}

impl CollectionItem {
    pub const PREFIX: &'static str = "collection_item";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH       
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 8;                                            // i64
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
/// 1. Application address
/// 2. Reaction authority address
/// 3. Reaction Traget type
/// 4. Target Publication address
/// 5. Reaction initializer Profile
/// 6. Reaction type variant
/// 7. Reaction create unix timestamp
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
    /// Reaction value (1)
    pub reaction_type: ReactionType,
    /// Unix timestamp of the Reaction creation (8)
    pub created_at: i64,
}

impl Reaction {
    pub const PREFIX: &'static str = "reaction";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator 
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 1                                             // Enum
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 1                                             // Enum
        + 8;                                            // i64
}

/// Report account that creates when new Report initialized
///
/// # Report account stores:
///
/// 1. Application address
/// 2. Report authority address
/// 3. Report Taget type
/// 4. Report Target address
/// 5. Report initializer Profile
/// 6. Report type variant
/// 7. Report notification text
/// 8. Report create unix timestamp
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
    /// Report Notification
    pub notification: Option<String>,
    /// Unix timestamp of the Report creation (8)
    pub created_at: i64,
}

impl Report {
    pub const PREFIX: &'static str = "report";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH                 // Anchor internal discrimitator  
        + 32                                                    // Pubkey
        + 32                                                    // Pubkey
        + 1                                                     // Enum
        + 32                                                    // Pubkey
        + 32                                                    // Pubkey
        + 1                                                     // Enum
        + (1 + STRING_LENGTH_PREFIX + MAX_NOTIFICATION_LENGTH)  // Option<String>
        + 8;                                                    // i64
}

/// ## App instruction data struct.
///
/// The struct contains data for the application instruction.
///
/// ## Fields:
///
/// - `metadata_uri`: The optional metadata URI for the app.
/// - `profile_gender_required`: Specifies whether the Profile gender is required.
/// - `profile_first_name_required`: Specifies whether the Profile first name is required.
/// - `profile_last_name_required`: Specifies whether the Profile last name is required.
/// - `profile_birthdate_required`: Specifies whether the Profile birth date is required.
/// - `profile_country_required`: Specifies whether the Profile Country code is required.
/// - `profile_region_required`: Specifies whether the Profile State code is required.
/// - `profile_city_required`: Specifies whether the Profile City code is required.
/// - `profile_metadata_required`: Specifies whether the Profile metadata required.
/// - `subspace_metadata_required`: Specifies whether the Subspace metadata required.
/// - `profile_delete_allowed`: Specifies the permission to delete a Profile.
/// - `subspace_delete_allowed`: Specifies the permission to delete a Subspace.
/// - `publication_delete_allowed`: Specifies the permission to delete a Publication.
/// - `profile_individual_processors_allowed`: Specifies the permission to assign Profile's individual external processors.
/// - `subspace_individual_processors_allowed`: Specifies the permission to assign Subspace's individual external processors.
/// - `publication_individual_processors_allowed`: Specifies the permission to assign Publication's individual external processors.
/// 
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct AppData {
    /// The optional metadata URI for the App.
    pub metadata_uri: Option<String>,

    /// Specifies whether the Profile gender is required.
    pub profile_gender_required: bool,

    /// Specifies whether the Profile first name is required.
    pub profile_first_name_required: bool,
    /// Specifies whether the Profile last name is required.
    pub profile_last_name_required: bool,
    /// Specifies whether the Profile birth date is required.
    /// 
    pub profile_birthdate_required: bool,
    /// Specifies whether the Profile country is required.
    /// 
    pub profile_country_required: bool,
    /// Specifies whether the Profile region is required.
    pub profile_region_required: bool,
    /// Specifies whether the Profile city is required.
    pub profile_city_required: bool,

    /// Specifies whether the Profile metadata is required.
    pub profile_metadata_required: bool,
    /// Specifies whether the Subspace metadata is required.
    pub subspace_metadata_required: bool,

    /// Specifies the permission to delete a Profile.
    pub profile_delete_allowed: bool,
    /// Specifies the permission to delete a Subspace.
    pub subspace_delete_allowed: bool,
    /// Specifies the permission to delete a Publication.
    pub publication_delete_allowed: bool,

    /// Specifies the permission to assign Profile's individual external processors.
    pub profile_individual_processors_allowed: bool,
    /// Specifies the permission to assign Subspace's individual external processors.
    pub subspace_individual_processors_allowed: bool,
    /// Specifies the permission to assign Publication's individual external processors.
    pub publication_individual_processors_allowed: bool,
}

/// Profile instruction data struct
///
/// # Struct contains:
///
/// 1. `alias` - Unique Application's user Profile Alias as string (ASCII alphanumeric)
/// 2. `metadata_uri` - Profile metadata URI
/// 3. `status_text` - Profile status
/// 4. `gender` - Profile gender
/// 5. `first_name` Profile first name
/// 6. `last_name` Profile last name
/// 7. `birth_date` - Profile birth date
/// 8. `country_code` Profile country
/// 9. `region_code` Profile region (region)
/// 10. `city_code` Profile city
/// 11. `current_location` - Profile location coordinates
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct ProfileData {
    pub alias: Option<String>,
    pub metadata_uri: Option<String>,
    pub status_text: String,
    pub gender: Option<Gender>,
    pub first_name: String,
    pub last_name: String,
    pub birth_date: i64,
    pub country_code: i16,
    pub region_code: i16,
    pub city_code: i16,
    pub current_location: Option<LocationCoordinates>,
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
    pub tag: String
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
/// * Registering
/// * Connecting
/// * Publishing
/// * Collecting
/// * Referencing
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
/// * Profile
/// * Subspace
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
/// * Profile
/// * Subspace
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
/// 1. Male
/// 2. Female
/// 3. Other (or Prefer not to say)
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum Gender {
    Male,
    Female,
    OtherOrPreferNotToSay
}


/// Content type that publication focus (e.g. short video)
///
/// # Enum variants:
///
/// 1. Article - Article type (e.g. - mixed content / blog post)
/// 2. Image file - Image file type
/// 3. Video file - Video file type
/// 4. Short video - Shor video file type
/// 5. Audio file - Audio file type
/// 6. Text only - Text type
/// 7. External link - Link type
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ContentType {
    Article,
    Image,
    Video,
    ShortVideo,
    Audio,
    Text,
    Link,
}

/// Subspace publishing permission level
///
/// # Enum variants:
///
/// * All
/// * AllMembers
/// * ApprovedMembers
/// * Admins
/// * Owner
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
/// * Profile
/// * Publication
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
/// * UpVote - (e.g. "Like")
/// * DownVote - (e.g. "Dislike")
/// * CustomVote - custom smile/icon implementation
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ReactionType {
    #[default]
    UpVote,
    DownVote,
    CustomVote,
}

/// Report Target type
///
/// # Enum variants:
///
/// * Profile
/// * Subspace
/// * Publication
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
/// * Scam
/// * Abuse
/// * Spam
/// * HateSpeech
/// * Harassment
/// * Misinformation
/// * Violence
/// * Threats
/// * Copyright
/// * Adult
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
/// * Admin
/// * Publisher
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum SubspaceManagementRoleType { 
    Publisher,
    Admin
}

/// Coordinates
///
/// # Struct contains
///
/// * latitude
/// * longitude
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct LocationCoordinates {
    pub latitude: u64,
    pub longitude: u64,
}