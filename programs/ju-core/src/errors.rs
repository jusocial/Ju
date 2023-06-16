use anchor_lang::prelude::error_code;

#[error_code]
pub enum CustomError {
    #[msg("Procesor management action not authorized")]
    ProcessorManagementNotAthorized,

    #[msg("Procesor type mismatch")]
    ProcessorTypeMismatch,

    #[msg("Procesor name length is incorrect")]
    ProcessorNameLengthIncorrect,

    #[msg("Processor name must contain only ASCII letters and numbers")]
    ProcessorNameMustBeAlphanumeric,

    #[msg("Procesor trying to use is not whitelisted")]
    ProcessorNotWhitelisted,

    #[msg("Application name (ID) length is incorrect")]
    AppNameLengthIncorrect,

    #[msg("Application name (ID) must contain only ASCII letters and numbers")]
    AppNameMustBeAlphanumeric,

    #[msg("App management action not authorized")]
    AppManagementNotAthorized,

    #[msg("The action is prohibited by application settings")]
    ActionProhibitedByAppSettings,

    #[msg("Alias length is incorrect")]
    AliasLengthIncorrect,

    #[msg("Alias must contain only ASCII letters and numbers")]
    AliasMustBeAlphanumeric,

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

    #[msg("Profile's name too long'")]
    ProfileNameTooLong,

    #[msg("Profile's surname too long'")]
    ProfileSurnameTooLong,

    #[msg("Subspace alias is incorrect")]
    SubspaceAliasIncorrect,

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
    ValidationFail,

    #[msg("Alias account already exist")]
    AliasAccountExist,

    #[msg("Forbidden to collect user's  own publication")]
    SelfPublicationCollecting,

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

}
