use anchor_lang::prelude::error_code;

#[error_code]
pub enum CustomError {

    #[msg("Developer not authorized")]
    DeveloperNotAthorized,

    #[msg("Developer action not authorized")]
    DeveloperActionNotAthorized,

    #[msg("Procesor authority mismatch")]
    ProcessorAuthorityMismatch,

    #[msg("Procesor type mismatch")]
    ProcessorTypeMismatch,

    #[msg("Procesor name length is incorrect")]
    ProcessorNameLengthIncorrect,

    #[msg("Processor name must contain only ASCII letters in lower case and numbers")]
    ProcessorNameInvalid,

    #[msg("Procesor trying to use is not whitelisted")]
    ProcessorNotWhitelisted,

    #[msg("Application domain name (ID) length is incorrect")]
    AppDomainNameLengthIncorrect,

    #[msg("Application domain name must contain only ASCII letters in lower case and numbers")]
    AppDomainNameInvalid,

    #[msg("App management action not authorized")]
    AppManagementNotAthorized,

    #[msg("Missing field required by Application settings")]
    MissingRequiredField,

    #[msg("The action is prohibited by application settings")]
    ActionProhibitedByAppSettings,

    #[msg("Alias length is incorrect")]
    AliasLengthIncorrect,

    #[msg("Alias must contain only ASCII letters in lower case, numbers and underscores")]
    AliasInvalid,

    #[msg("Profile incorrect")]
    ProfileIncorrect,

    #[msg("Profile alias is incorrect")]
    ProfileAliasIncorrect,

    #[msg("Alias account required to register action")]
    AliasAccountRequired,

    #[msg("Alias accounts must not be passed")]
    AliasAccountsMustBeNone,

    #[msg("Both alias account required to update")]
    BothAliasAccountRequired,

    #[msg("Current alias account required to delete")]
    CurrentAliasAccountRequired,

    #[msg("Profile update not authorized")]
    UpdateNotAuthorized,

    #[msg("Profile birth date is incorrect")]
    BirthDateIncorrect,

    #[msg("Profile first name length is incorrect")]
    ProfileFirstNameLengthIncorrect,

    #[msg("Profile last name length is incorrect")]
    ProfileLastNameLengthIncorrect,

    #[msg("Subspace alias is incorrect")]
    SubspaceAliasIncorrect,

    #[msg("Subspace name length is incorrect")]
    SubspaceNameIncorrect,

    #[msg("Subspace publishing permission violated")]
    SubspacePublishingPermissionViolation,

    #[msg("Subspace publishing Connection-proof account required")]
    SubspacePublishingConnectionProofAccountRequired,

    #[msg("Subspace publishing Manager-proof account required")]
    SubspacePublishingManagerProofAccountRequired,

    #[msg("URI length is incorrect")]
    UriLengthIncorrect,

    #[msg("Missed Target Publication account")]
    TargetPublicationRequired,

    #[msg("Both mirroring and replying not allowed in the same time")]
    BothMirrorAndReplyNotAllowed,

    #[msg("Self conections is not allowed")]
    SelfConnectionNotAllowed,

    #[msg("Connection target account is missed")]
    ConnectionTargetAccountMissed,

    #[msg("Connection target account is invalid")]
    ConnectionTargetAccountInvalid,

    #[msg("Connection target authority mismatch")]
    ConnectionTargetAuthorityMismatch,

    #[msg("Connection validation failed")]
    ConnectionValidationFail,

    #[msg("Alias account already exist")]
    AliasAccountExist,

    #[msg("Forbidden to collect user's  own publication")]
    SelfPublicationCollecting,

    #[msg("Publication Tag is incorrect")]
    PublicationTagIncorrect,

    #[msg("Missed registering external processor account")]
    RegisteringProcessorAccountMissed,

    #[msg("Missed connecting external processor account")]
    ConnectingProcessorAccountMissed,

    #[msg("Missed publishing external processor account")]
    PublishingProcessorAccountMissed,

    #[msg("Missed collecting external processor account")]
    CollectingProcessorAccountMissed,

    #[msg("Missed referencing external processor account")]
    ReferencingProcessorAccountMissed,

    #[msg("Registering external processor mismatch")]
    RegisteringProcessorMismatch,

    #[msg("Connecting external processor mismatch")]
    ConnectingProcessorMismatch,

    #[msg("Publishing external processor mismatch")]
    PublishingProcessorMismatch,

    #[msg("Collecting external processor mismatch")]
    CollectingProcessorMismatch,

    #[msg("Referencing external processor mismatch")]
    ReferencingProcessorMismatch,

    #[msg("Reaction target account is invalid")]
    ReactionTargetAccountInvalid,

    #[msg("Report custom code missed")]
    ReactionCustomCodeMissed,

    #[msg("Report target account is invalid")]
    ReportTargetAccountInvalid,
}
