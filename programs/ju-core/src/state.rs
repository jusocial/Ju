use anchor_lang::prelude::*;
use crate::constants::*;
use crate::errors::*;

// Accounts

/// ApprovedProcessorPDA holds data about every whitelisted Protocol external Processors
///
/// App account stores:
///
/// 1. Processor type 
/// 2. Processor name (ASCII alphanumeric)
/// 3. Processor PDA authority address
/// 4. Processor developer walet
/// 5. Processorr program address
///
#[account]
pub struct ExternalProcessorPDA {
    /// Processot type (1)
    pub processor_type: ProcessorType,
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
        + 1                                                     // Enum
        + (STRING_LENGTH_PREFIX + MAX_PROCESSORNAME_LENGTH)     // String      
        + 32                                                    // Pubkey
        + 33                                                    // Option<Pubkey>
        + 32;                                                   // Pubkey

    /// Method for validating Processor Name
    ///
    /// Parameters:
    ///
    /// 1. `processor_name` - Reference to Protocol Processor name String
    /// 
    pub fn validate_name(&self, processor_name: &String) -> Result<()> {

        if !processor_name.chars().all(|x| x.is_ascii_alphanumeric()) {
            return Err(error!(CustomError::ProcessorNameMustBeAlphanumeric));
        }

        if processor_name.len() < MIN_PROCESSORNAME_LENGTH || processor_name.len() > MAX_PROCESSORNAME_LENGTH {
            return Err(error!(CustomError::ProcessorNameLengthIncorrect));
        }

        Ok(())
    }

}

/// App account for every protocol Application
///
/// App account stores:
///
/// 1. Unique Application name (ID) as string (ASCII alphanumeric)
/// 2. Application authority address
/// 3. Application metadata URI (settings)
/// 4. Registering external Processor
/// 5. Conecting external Processor
/// 6. Publishing external Processor
/// 7. Collecting external Processor
/// 8. Referencing external Processor
///
#[account]
#[derive(Default)]
pub struct App {
    /// App name/ID (STRING_LENGTH_PREFIX + MAX_APPID_LENGTH).
    pub app_name: String,
    /// Pubkey of the application creator (32).
    pub authority: Pubkey,
    /// URI of the metadata (STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: String,
    /// An address of a Program (external processor) that makes application Profile creation additional processing (33)
    pub registering_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for profiles Connection additional processing (33)
    pub connecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication Creating additional processing (33)
    pub publishing_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication Collecting additional processing (33)
    pub collecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication referencing additional processing (33)
    pub referencing_processor: Option<Pubkey>,
}

impl App {
    pub const PREFIX: &'static str = "app";

    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator
        + (STRING_LENGTH_PREFIX + MAX_APPNAME_LENGTH)   // String      
        + 32                                            // Pubkey
        + (STRING_LENGTH_PREFIX + MAX_URI_LENGTH)       // String
        + 33                                            // Option<Pubkey>
        + 33                                            // Option<Pubkey>
        + 33                                            // Option<Pubkey>
        + 33                                            // Option<Pubkey>
        + 33;                                           // Option<Pubkey>

    /// Method for validating App Name
    ///
    /// Parameters:
    ///
    /// 1. `app_name` - Reference to Protocol unique Application name String
    /// 
    pub fn validate_name(&self, app_name: &String) -> Result<()> {
        if !app_name.chars().all(|x| x.is_ascii_alphanumeric()) {
            return Err(error!(CustomError::AppNameMustBeAlphanumeric));
        }

        if app_name.len() < MIN_APPNAME_LENGTH || app_name.len() > MAX_APPNAME_LENGTH {
            return Err(error!(CustomError::AppNameLengthIncorrect));
        }

        Ok(())
    }

}

/// Profile account that holds data about Application user
///
/// Profile account stores:
///
/// 1. Application account (PDA)
/// 2. Profile authority address
/// 3. Unique Application's user Profile Alias as string (ASCII alphanumeric)
/// 4. Profile metadata URI
/// 5. Profile status text
/// 6. Verification status
/// 7. Profile creation unix timestamp
/// 8. External connection processor (optional)
///
#[account]
#[derive(Default)]
pub struct Profile {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Pubkey of the profile owner (32).
    pub authority: Pubkey,
    /// Profile alias (1 + STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH).
    pub alias: Option<String>,
    /// Profile metadata URI (STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: String,
    /// Profile Status text (1 + STRING_LENGTH_PREFIX + MAX_STATUS_LENGTH)
    pub status_text: Option<String>,
    /// Verified status for VIP users (1)
    pub verified: bool,
    /// An address of a Program (external processor) for Connection additional processing (33)
    pub connecting_processor: Option<Pubkey>,
    /// Profile creation Unix timestamp (8)
    pub created_at: i64,
}

impl Profile {
    pub const PREFIX: &'static str = "profile";

    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + (STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH)    // String
        + (1 + STRING_LENGTH_PREFIX + MAX_URI_LENGTH)   // Option<String>
        + (STRING_LENGTH_PREFIX + MAX_STATUS_LENGTH)    // String
        + 1                                             // bool
        + 33                                            // Option<Pubkey>
        + 8;                                            // i64

    /// Method for validating Profile Alias
    ///
    /// Parameters:
    ///
    /// 1. `alias` - Reference to Application unique Aliasr String
    /// 
    pub fn validate_alias(&self, alias: &String) -> Result<()> {

        if !alias.chars().all(|x| x.is_ascii_alphanumeric()) {
            return Err(error!(CustomError::AliasMustBeAlphanumeric));
        }

        if alias.len() < MIN_ALIAS_LENGTH || alias.len() > MAX_ALIAS_LENGTH {
            return Err(error!(CustomError::AliasLengthIncorrect));
        }

        Ok(())
    }
}

/// The Subspace is an account (PDA) that holds data about a application Subspace (e.g. group / "public")
///
/// Subspace account stores:
///
/// 1. Subspace UUID
/// 2. Application address
/// 3. Profile authority address
/// 4. Subspace owner Profile Pubkey
/// 5. Unique application's user profile alias as string (optional, ASCII alphanumeric)
/// 6. Subspace metadata URI
/// 7. External Publishing processor (optional)
/// 8. External Connecting processor (optional)
/// 9. External Collecting processor (optional)
/// 10. External Referencing processor (optional)
///
#[account]
#[derive(Default)]
pub struct Subspace {
    /// Subspace UUID (UUID_LENGTH)
    pub uuid: String,
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Pubkey of the profile owner (32).
    pub authority: Pubkey,
    /// Subspace creator Profile Pubkey (32)
    pub creator: Pubkey,
    /// Profile alias (STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH).
    pub alias: Option<String>,
    /// Metadata URI (STRING_LENGTH_PREFIX + MAX_URI_LENGTH).
    pub metadata_uri: String,
    /// An address of a Program (external processor) for Publication Creating additional processing (33)
    pub publishing_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for profiles Connection additional processing (33)
    pub connecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication Collecting additional processing (33)
    pub collecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication referencing additional processing (33)
    pub referencing_processor: Option<Pubkey>,
}

impl Subspace {
    pub const PREFIX: &'static str = "subspace";

    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator
        + (STRING_LENGTH_PREFIX + UUID_LENGTH)          // String     
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + (STRING_LENGTH_PREFIX + MAX_ALIAS_LENGTH)    // String
        + (STRING_LENGTH_PREFIX + MAX_URI_LENGTH)       // String
        + 33                                            // Option<Pubkey>
        + 33                                            // Option<Pubkey>
        + 33                                            // Option<Pubkey>
        + 33;                                           // Option<Pubkey>

    /// Method for validating Subspace Alias
    ///
    /// Parameters:
    ///
    /// 1. `alias` - Reference to Application unique Aliasr String
    /// 
    pub fn validate_alias(&self, alias: &String) -> Result<()> {

        if !alias.chars().all(|x| x.is_ascii_alphanumeric()) {
            return Err(error!(CustomError::AliasMustBeAlphanumeric));
        }

        if alias.len() < MIN_ALIAS_LENGTH || alias.len() > MAX_ALIAS_LENGTH {
            return Err(error!(CustomError::AliasLengthIncorrect));
        }

        Ok(())
    }
}

/// The Publication is account (PDA) that holds Application's Publication data
///
/// Publication account stores:
///
/// 1. Publication UUID as string
/// 2. Existing Protocol Application in which Publication was created
/// 3. References to Publication's author Profile
/// 4. Publication authority address
/// 5. Publication metadata URI
/// 6. Subspace in which Publication being published
/// 7. Whether or not the Publication is mirroring other existing Publication (e.g. re-post)
/// 8. Whether or not the Publication is replying to other existing Publication (e.g. comment)
/// 9. References to existing Publication if there is a mirror or reply (optional)
/// 10. Publication main content type
/// 11. Publication tag
/// 12. External Collecting processor (optional)
/// 13. External Referencing processor (optional)
/// 14. Publication create unix timestamp
/// 15. Publication update unix timestamp (optional)
///
#[account]
// #[derive(Default)]
pub struct Publication {
    /// Publication UUID (STRING_LENGTH_PREFIX + UUID_LENGTH)
    pub uuid: String,
    /// Application account Pubkey (32)
    pub app: Pubkey,
    /// Publication author profile account Pubkey (32)
    pub profile: Pubkey,
    /// Publication authority account Pubkey (32)
    pub authority: Pubkey,
    /// The URI of the publication metadata(STRING_LENGTH_PREFIX + MAX_URI_LENGTH)
    pub metadata_uri: String,
    /// Subspace to publish 
    pub subspace: Option<Pubkey>,
    /// Flag to determine whether publication is mirror (e.g. 'repost') (1)
    pub is_mirror: bool,
    /// Flag to determine whether publication is reply (e.g. 'comment') (1)
    pub is_reply: bool,
    /// Optional pubkey that specify target in case Publication is a mirror or reply (33)
    pub target_publication: Option<Pubkey>,
    /// Publication content main type (1)
    pub content_type: ContentType,
    /// Publication Tag (e.g. '#hashtag') (1 + MAX_TAG_LENGTH)
    pub tag: Option<String>,
    /// An address of a Program (external processor) for Publication Collecting additional processing (33)
    pub collecting_processor: Option<Pubkey>,
    /// An address of a Program (external processor) for Publication Referencing additional processing (33)
    pub referencing_processor: Option<Pubkey>,
    /// Unix timestamp of the Publication creation (8)
    pub created_at: i64,
    /// The optional Unix timestamp of the Publication modification (9)
    pub modified_at: Option<i64>,
}

impl Publication {
    pub const PREFIX: &'static str = "publication";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH         // Anchor internal discrimitator
        + (STRING_LENGTH_PREFIX + UUID_LENGTH)          // String     
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + (STRING_LENGTH_PREFIX + MAX_URI_LENGTH)       // String
        + 33                                            // Option<Pubkey>
        + 1                                             // bool
        + 1                                             // bool
        + 33                                            // Option<Pubkey>
        + 1                                             // Enum
        + (1 + STRING_LENGTH_PREFIX + MAX_TAG_LENGTH)   // Option<String>                                        
        + 33                                            // Option<Pubkey>
        + 33                                            // Option<Pubkey>
        + 8                                             // i64
        + 9;                                            // Option<i64>
}

/// Connection account holds data about Connection between two Application's entities (e.g. following)
///
/// The Connection account stores:
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
    /// Connection approve Unix timestamp (8)
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
        + 9;                                            // Option<i64>
}

/// CollectionItem account that creates when some Profile collects some Application Entity (e.g. Publication)
///
/// The CollectionItem account stores:
///
/// 1. Application address
/// 2. CollectionItem authority address
/// 3. CollectionItem target entity (e.g. Publication) address
/// 4. CollectionItem creation unix timestamp
///
#[account]
#[derive(Default)]
pub struct CollectionItem {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// CollectionItem authority account Pubkey (32)
    pub authority: Pubkey,
    /// CollectionItem target Publication Pubkey (32)
    pub target: Pubkey,
    /// Unix timestamp of the CollectionItem creation (8)
    pub created_at: i64,
}

impl CollectionItem {
    pub const PREFIX: &'static str = "collection_item";
    
    pub const LEN: usize = DISCRIMINATOR_LENGTH       
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 8;                                            // i64
}

/// Alias account that creates when new Alias is claimed by user Profile or Subspace
///
/// The Alias account stores:
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
/// The Reaction account stores:
///
/// 1. Application address
/// 2. Reaction authority address
/// 3. Target Publication address
/// 4. Reaction initializer Profile
/// 5. Reaction type variant
/// 6. Reaction create unix timestamp
///
#[account]
#[derive(Default)]
pub struct Reaction {
    /// Application account Pubkey (32)
    pub app: Pubkey,
    /// Reaction authority account Pubkey (32)
    pub authority: Pubkey,
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
        + 32                                            // Pubkey
        + 32                                            // Pubkey
        + 1                                             // Enum
        + 8;                                            // i64
}

/// Report account that creates when new Report initialized
///
/// Report account stores:
///
/// 1. Application address
/// 2. Report authority address
/// 3. Report Target address
/// 4. Report initializer Profile
/// 5. Report type variant
/// 6. Report notification text
/// 7. Report create unix timestamp
///
#[account]
// #[derive(Default)]
pub struct Report {
    /// Application Pubkey (32)
    pub app: Pubkey,
    /// Alias authority account Pubkey (32)
    pub authority: Pubkey,
    /// Reaction target Publication Pubkey (32)
    pub target: Pubkey,
    /// Reaction initializer Pubkey (32)
    pub initializer: Pubkey,
    /// Reaction value (1)
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
        + 32                                                    // Pubkey
        + 32                                                    // Pubkey
        + 1                                                     // Enum
        + (1 + STRING_LENGTH_PREFIX + MAX_NOTIFICATION_LENGTH)  // Option<String>
        + 8;                                                    // i64
}

/// App instruction data struct
///
/// Struct contains:
///
/// 1. `metadata_uri` - App metadata json (optional)
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct AppData {
    pub metadata_uri: String,
}

/// Profile instruction data struct
///
/// Struct contains:
///
/// 1. `alias` - Unique Application's user Profile Alias as string (ASCII alphanumeric)
/// 2. `metadata_uri` - Profile metadata URI
/// 3. `status_text` - Profile status
/// 4. `connecting_processor` - Profile specified external processor to make additional Connection Processing (optional)
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct ProfileData {
    pub alias: Option<String>,
    pub metadata_uri: String,
    pub status_text: Option<String>,
    pub connecting_processor_to_assign: Option<Pubkey>,
}

/// Subspace data struct
///
/// Struct contains:
///
/// 1. `alias` - Unique Application's Subspace Alias as string (ASCII alphanumeric)
/// 2. `metadata_uri` - Publication metadata URI
///
#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct SubspaceData {
    pub alias: Option<String>,
    pub metadata_uri: String,
}

/// Publication data struct
///
/// Struct contains:
///
/// 1. `metadata_uri` - Publication metadata URI
/// 2. `is_mirror` - Whether or not the publication is mirroring other existing publication (e.g. re-post)
/// 3. `is_reply` - Whether or not the publication is replying to other existing publication (e.g. comment)
/// 4. `content_type` - Publication content type
/// 5. `tag` - Publication Tag
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct PublicationData {
    pub metadata_uri: String,
    pub is_mirror: bool,
    pub is_reply: bool,
    pub content_type: ContentType,
    pub tag: Option<String>
}

/// Report data struct
///
/// Struct contains:
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
/// Enum variants:
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
/// Enum variants:
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
/// Enum variants:
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


/// Content type that publication focus (e.g. short video)
///
/// Enum variants:
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

/// Reaction type (e.g. Like / Dislike)
///
/// Enum variants:
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

/// Report type (e.g. Scam)
///
/// Enum variants:
///
/// * Scam
/// * Abuse
///
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ReportType { 
    Scam,
    Abuse,
}
