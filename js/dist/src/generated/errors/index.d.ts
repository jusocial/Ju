type ErrorWithCode = Error & {
    code: number;
};
type MaybeErrorWithCode = ErrorWithCode | null | undefined;
export declare class ProcessorManagementNotAthorizedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProcessorTypeMismatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProcessorNameLengthIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProcessorNameMustBeAlphanumericError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProcessorNotWhitelistedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AppNameLengthIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AppNameMustBeAlphanumericError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AppManagementNotAthorizedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class MissingRequiredFieldError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ActionProhibitedByAppSettingsError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AliasLengthIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AliasMustBeAlphanumericError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProfileIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProfileAliasIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AliasAccountRequiredError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AliasAccountsMustBeNoneError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class BothAliasAccountRequiredError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class CurrentAliasAccountRequiredError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class UpdateNotAuthorizedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProfileFirstNameLengthIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ProfileLastNameLengthIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class SubspaceAliasIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class SubspaceNameIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class UriLengthIncorrectError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class TargetPublicationRequiredError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class BothMirrorAndReplyNotAllowedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class SelfConnectionNotAllowedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ConnectionTargetAccountMissedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ConnectionTargetAccountInvalidError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ConnectionTargetAuthorityMismatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ConnectionValidationFailError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class AliasAccountExistError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class SelfPublicationCollectingError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class RegisteringProcessorAccountMissedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ConnectingProcessorAccountMissedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class PublishingProcessorAccountMissedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class CollectingProcessorAccountMissedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ReferencingProcessorAccountMissedError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class RegisteringProcessorMismatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ConnectingProcessorMismatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class PublishingProcessorMismatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class CollectingProcessorMismatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ReferencingProcessorMismatchError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ReactionTargetAccountInvalidError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare class ReportTargetAccountInvalidError extends Error {
    readonly code: number;
    readonly name: string;
    constructor();
}
export declare function errorFromCode(code: number): MaybeErrorWithCode;
export declare function errorFromName(name: string): MaybeErrorWithCode;
export {};
