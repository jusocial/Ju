"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferencingProcessorMismatchError = exports.CollectingProcessorMismatchError = exports.PublishingProcessorMismatchError = exports.ConnectingProcessorMismatchError = exports.RegisteringProcessorMismatchError = exports.ReferencingProcessorAccountMissedError = exports.CollectingProcessorAccountMissedError = exports.PublishingProcessorAccountMissedError = exports.ConnectingProcessorAccountMissedError = exports.RegisteringProcessorAccountMissedError = exports.PublicationTagIncorrectError = exports.SelfPublicationCollectingError = exports.AliasAccountExistError = exports.ConnectionValidationFailError = exports.ConnectionTargetAuthorityMismatchError = exports.ConnectionTargetAccountInvalidError = exports.ConnectionTargetAccountMissedError = exports.SelfConnectionNotAllowedError = exports.BothMirrorAndReplyNotAllowedError = exports.TargetPublicationRequiredError = exports.UriLengthIncorrectError = exports.SubspacePublishingManagerProofAccountRequiredError = exports.SubspacePublishingConnectionProofAccountRequiredError = exports.SubspacePublishingPermissionViolationError = exports.SubspaceNameIncorrectError = exports.SubspaceAliasIncorrectError = exports.ProfileLastNameLengthIncorrectError = exports.ProfileFirstNameLengthIncorrectError = exports.BirthDateIncorrectError = exports.UpdateNotAuthorizedError = exports.CurrentAliasAccountRequiredError = exports.BothAliasAccountRequiredError = exports.AliasAccountsMustBeNoneError = exports.AliasAccountRequiredError = exports.ProfileAliasIncorrectError = exports.ProfileIncorrectError = exports.AliasInvalidError = exports.AliasLengthIncorrectError = exports.ActionProhibitedByAppSettingsError = exports.MissingRequiredFieldError = exports.AppManagementNotAthorizedError = exports.AppDomainNameInvalidError = exports.AppDomainNameLengthIncorrectError = exports.ProcessorNotWhitelistedError = exports.ProcessorNameInvalidError = exports.ProcessorNameLengthIncorrectError = exports.ProcessorTypeMismatchError = exports.ProcessorAuthorityMismatchError = exports.DeveloperActionNotAthorizedError = exports.DeveloperNotAthorizedError = void 0;
exports.errorFromName = exports.errorFromCode = exports.ReportTargetAccountInvalidError = exports.ReactionCustomCodeMissedError = exports.ReactionTargetAccountInvalidError = void 0;
const createErrorFromCodeLookup = new Map();
const createErrorFromNameLookup = new Map();
class DeveloperNotAthorizedError extends Error {
    constructor() {
        super('Developer not authorized');
        this.code = 0x1770;
        this.name = 'DeveloperNotAthorized';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, DeveloperNotAthorizedError);
        }
    }
}
exports.DeveloperNotAthorizedError = DeveloperNotAthorizedError;
createErrorFromCodeLookup.set(0x1770, () => new DeveloperNotAthorizedError());
createErrorFromNameLookup.set('DeveloperNotAthorized', () => new DeveloperNotAthorizedError());
class DeveloperActionNotAthorizedError extends Error {
    constructor() {
        super('Developer action not authorized');
        this.code = 0x1771;
        this.name = 'DeveloperActionNotAthorized';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, DeveloperActionNotAthorizedError);
        }
    }
}
exports.DeveloperActionNotAthorizedError = DeveloperActionNotAthorizedError;
createErrorFromCodeLookup.set(0x1771, () => new DeveloperActionNotAthorizedError());
createErrorFromNameLookup.set('DeveloperActionNotAthorized', () => new DeveloperActionNotAthorizedError());
class ProcessorAuthorityMismatchError extends Error {
    constructor() {
        super('Procesor authority mismatch');
        this.code = 0x1772;
        this.name = 'ProcessorAuthorityMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorAuthorityMismatchError);
        }
    }
}
exports.ProcessorAuthorityMismatchError = ProcessorAuthorityMismatchError;
createErrorFromCodeLookup.set(0x1772, () => new ProcessorAuthorityMismatchError());
createErrorFromNameLookup.set('ProcessorAuthorityMismatch', () => new ProcessorAuthorityMismatchError());
class ProcessorTypeMismatchError extends Error {
    constructor() {
        super('Procesor type mismatch');
        this.code = 0x1773;
        this.name = 'ProcessorTypeMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorTypeMismatchError);
        }
    }
}
exports.ProcessorTypeMismatchError = ProcessorTypeMismatchError;
createErrorFromCodeLookup.set(0x1773, () => new ProcessorTypeMismatchError());
createErrorFromNameLookup.set('ProcessorTypeMismatch', () => new ProcessorTypeMismatchError());
class ProcessorNameLengthIncorrectError extends Error {
    constructor() {
        super('Procesor name length is incorrect');
        this.code = 0x1774;
        this.name = 'ProcessorNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorNameLengthIncorrectError);
        }
    }
}
exports.ProcessorNameLengthIncorrectError = ProcessorNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1774, () => new ProcessorNameLengthIncorrectError());
createErrorFromNameLookup.set('ProcessorNameLengthIncorrect', () => new ProcessorNameLengthIncorrectError());
class ProcessorNameInvalidError extends Error {
    constructor() {
        super('Processor name must contain only ASCII letters in lower case and numbers');
        this.code = 0x1775;
        this.name = 'ProcessorNameInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorNameInvalidError);
        }
    }
}
exports.ProcessorNameInvalidError = ProcessorNameInvalidError;
createErrorFromCodeLookup.set(0x1775, () => new ProcessorNameInvalidError());
createErrorFromNameLookup.set('ProcessorNameInvalid', () => new ProcessorNameInvalidError());
class ProcessorNotWhitelistedError extends Error {
    constructor() {
        super('Procesor trying to use is not whitelisted');
        this.code = 0x1776;
        this.name = 'ProcessorNotWhitelisted';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorNotWhitelistedError);
        }
    }
}
exports.ProcessorNotWhitelistedError = ProcessorNotWhitelistedError;
createErrorFromCodeLookup.set(0x1776, () => new ProcessorNotWhitelistedError());
createErrorFromNameLookup.set('ProcessorNotWhitelisted', () => new ProcessorNotWhitelistedError());
class AppDomainNameLengthIncorrectError extends Error {
    constructor() {
        super('Application domain name (ID) length is incorrect');
        this.code = 0x1777;
        this.name = 'AppDomainNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AppDomainNameLengthIncorrectError);
        }
    }
}
exports.AppDomainNameLengthIncorrectError = AppDomainNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1777, () => new AppDomainNameLengthIncorrectError());
createErrorFromNameLookup.set('AppDomainNameLengthIncorrect', () => new AppDomainNameLengthIncorrectError());
class AppDomainNameInvalidError extends Error {
    constructor() {
        super('Application domain name must contain only ASCII letters in lower case and numbers');
        this.code = 0x1778;
        this.name = 'AppDomainNameInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AppDomainNameInvalidError);
        }
    }
}
exports.AppDomainNameInvalidError = AppDomainNameInvalidError;
createErrorFromCodeLookup.set(0x1778, () => new AppDomainNameInvalidError());
createErrorFromNameLookup.set('AppDomainNameInvalid', () => new AppDomainNameInvalidError());
class AppManagementNotAthorizedError extends Error {
    constructor() {
        super('App management action not authorized');
        this.code = 0x1779;
        this.name = 'AppManagementNotAthorized';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AppManagementNotAthorizedError);
        }
    }
}
exports.AppManagementNotAthorizedError = AppManagementNotAthorizedError;
createErrorFromCodeLookup.set(0x1779, () => new AppManagementNotAthorizedError());
createErrorFromNameLookup.set('AppManagementNotAthorized', () => new AppManagementNotAthorizedError());
class MissingRequiredFieldError extends Error {
    constructor() {
        super('Missing field required by Application settings');
        this.code = 0x177a;
        this.name = 'MissingRequiredField';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, MissingRequiredFieldError);
        }
    }
}
exports.MissingRequiredFieldError = MissingRequiredFieldError;
createErrorFromCodeLookup.set(0x177a, () => new MissingRequiredFieldError());
createErrorFromNameLookup.set('MissingRequiredField', () => new MissingRequiredFieldError());
class ActionProhibitedByAppSettingsError extends Error {
    constructor() {
        super('The action is prohibited by application settings');
        this.code = 0x177b;
        this.name = 'ActionProhibitedByAppSettings';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ActionProhibitedByAppSettingsError);
        }
    }
}
exports.ActionProhibitedByAppSettingsError = ActionProhibitedByAppSettingsError;
createErrorFromCodeLookup.set(0x177b, () => new ActionProhibitedByAppSettingsError());
createErrorFromNameLookup.set('ActionProhibitedByAppSettings', () => new ActionProhibitedByAppSettingsError());
class AliasLengthIncorrectError extends Error {
    constructor() {
        super('Alias length is incorrect');
        this.code = 0x177c;
        this.name = 'AliasLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasLengthIncorrectError);
        }
    }
}
exports.AliasLengthIncorrectError = AliasLengthIncorrectError;
createErrorFromCodeLookup.set(0x177c, () => new AliasLengthIncorrectError());
createErrorFromNameLookup.set('AliasLengthIncorrect', () => new AliasLengthIncorrectError());
class AliasInvalidError extends Error {
    constructor() {
        super('Alias must contain only ASCII letters in lower case, numbers and underscores');
        this.code = 0x177d;
        this.name = 'AliasInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasInvalidError);
        }
    }
}
exports.AliasInvalidError = AliasInvalidError;
createErrorFromCodeLookup.set(0x177d, () => new AliasInvalidError());
createErrorFromNameLookup.set('AliasInvalid', () => new AliasInvalidError());
class ProfileIncorrectError extends Error {
    constructor() {
        super('Profile incorrect');
        this.code = 0x177e;
        this.name = 'ProfileIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileIncorrectError);
        }
    }
}
exports.ProfileIncorrectError = ProfileIncorrectError;
createErrorFromCodeLookup.set(0x177e, () => new ProfileIncorrectError());
createErrorFromNameLookup.set('ProfileIncorrect', () => new ProfileIncorrectError());
class ProfileAliasIncorrectError extends Error {
    constructor() {
        super('Profile alias is incorrect');
        this.code = 0x177f;
        this.name = 'ProfileAliasIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileAliasIncorrectError);
        }
    }
}
exports.ProfileAliasIncorrectError = ProfileAliasIncorrectError;
createErrorFromCodeLookup.set(0x177f, () => new ProfileAliasIncorrectError());
createErrorFromNameLookup.set('ProfileAliasIncorrect', () => new ProfileAliasIncorrectError());
class AliasAccountRequiredError extends Error {
    constructor() {
        super('Alias account required to register action');
        this.code = 0x1780;
        this.name = 'AliasAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasAccountRequiredError);
        }
    }
}
exports.AliasAccountRequiredError = AliasAccountRequiredError;
createErrorFromCodeLookup.set(0x1780, () => new AliasAccountRequiredError());
createErrorFromNameLookup.set('AliasAccountRequired', () => new AliasAccountRequiredError());
class AliasAccountsMustBeNoneError extends Error {
    constructor() {
        super('Alias accounts must not be passed');
        this.code = 0x1781;
        this.name = 'AliasAccountsMustBeNone';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasAccountsMustBeNoneError);
        }
    }
}
exports.AliasAccountsMustBeNoneError = AliasAccountsMustBeNoneError;
createErrorFromCodeLookup.set(0x1781, () => new AliasAccountsMustBeNoneError());
createErrorFromNameLookup.set('AliasAccountsMustBeNone', () => new AliasAccountsMustBeNoneError());
class BothAliasAccountRequiredError extends Error {
    constructor() {
        super('Both alias account required to update');
        this.code = 0x1782;
        this.name = 'BothAliasAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, BothAliasAccountRequiredError);
        }
    }
}
exports.BothAliasAccountRequiredError = BothAliasAccountRequiredError;
createErrorFromCodeLookup.set(0x1782, () => new BothAliasAccountRequiredError());
createErrorFromNameLookup.set('BothAliasAccountRequired', () => new BothAliasAccountRequiredError());
class CurrentAliasAccountRequiredError extends Error {
    constructor() {
        super('Current alias account required to delete');
        this.code = 0x1783;
        this.name = 'CurrentAliasAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CurrentAliasAccountRequiredError);
        }
    }
}
exports.CurrentAliasAccountRequiredError = CurrentAliasAccountRequiredError;
createErrorFromCodeLookup.set(0x1783, () => new CurrentAliasAccountRequiredError());
createErrorFromNameLookup.set('CurrentAliasAccountRequired', () => new CurrentAliasAccountRequiredError());
class UpdateNotAuthorizedError extends Error {
    constructor() {
        super('Profile update not authorized');
        this.code = 0x1784;
        this.name = 'UpdateNotAuthorized';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, UpdateNotAuthorizedError);
        }
    }
}
exports.UpdateNotAuthorizedError = UpdateNotAuthorizedError;
createErrorFromCodeLookup.set(0x1784, () => new UpdateNotAuthorizedError());
createErrorFromNameLookup.set('UpdateNotAuthorized', () => new UpdateNotAuthorizedError());
class BirthDateIncorrectError extends Error {
    constructor() {
        super('Profile birth date is incorrect');
        this.code = 0x1785;
        this.name = 'BirthDateIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, BirthDateIncorrectError);
        }
    }
}
exports.BirthDateIncorrectError = BirthDateIncorrectError;
createErrorFromCodeLookup.set(0x1785, () => new BirthDateIncorrectError());
createErrorFromNameLookup.set('BirthDateIncorrect', () => new BirthDateIncorrectError());
class ProfileFirstNameLengthIncorrectError extends Error {
    constructor() {
        super('Profile first name length is incorrect');
        this.code = 0x1786;
        this.name = 'ProfileFirstNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileFirstNameLengthIncorrectError);
        }
    }
}
exports.ProfileFirstNameLengthIncorrectError = ProfileFirstNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1786, () => new ProfileFirstNameLengthIncorrectError());
createErrorFromNameLookup.set('ProfileFirstNameLengthIncorrect', () => new ProfileFirstNameLengthIncorrectError());
class ProfileLastNameLengthIncorrectError extends Error {
    constructor() {
        super('Profile last name length is incorrect');
        this.code = 0x1787;
        this.name = 'ProfileLastNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileLastNameLengthIncorrectError);
        }
    }
}
exports.ProfileLastNameLengthIncorrectError = ProfileLastNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1787, () => new ProfileLastNameLengthIncorrectError());
createErrorFromNameLookup.set('ProfileLastNameLengthIncorrect', () => new ProfileLastNameLengthIncorrectError());
class SubspaceAliasIncorrectError extends Error {
    constructor() {
        super('Subspace alias is incorrect');
        this.code = 0x1788;
        this.name = 'SubspaceAliasIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SubspaceAliasIncorrectError);
        }
    }
}
exports.SubspaceAliasIncorrectError = SubspaceAliasIncorrectError;
createErrorFromCodeLookup.set(0x1788, () => new SubspaceAliasIncorrectError());
createErrorFromNameLookup.set('SubspaceAliasIncorrect', () => new SubspaceAliasIncorrectError());
class SubspaceNameIncorrectError extends Error {
    constructor() {
        super('Subspace name length is incorrect');
        this.code = 0x1789;
        this.name = 'SubspaceNameIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SubspaceNameIncorrectError);
        }
    }
}
exports.SubspaceNameIncorrectError = SubspaceNameIncorrectError;
createErrorFromCodeLookup.set(0x1789, () => new SubspaceNameIncorrectError());
createErrorFromNameLookup.set('SubspaceNameIncorrect', () => new SubspaceNameIncorrectError());
class SubspacePublishingPermissionViolationError extends Error {
    constructor() {
        super('Subspace publishing permission violated');
        this.code = 0x178a;
        this.name = 'SubspacePublishingPermissionViolation';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SubspacePublishingPermissionViolationError);
        }
    }
}
exports.SubspacePublishingPermissionViolationError = SubspacePublishingPermissionViolationError;
createErrorFromCodeLookup.set(0x178a, () => new SubspacePublishingPermissionViolationError());
createErrorFromNameLookup.set('SubspacePublishingPermissionViolation', () => new SubspacePublishingPermissionViolationError());
class SubspacePublishingConnectionProofAccountRequiredError extends Error {
    constructor() {
        super('Subspace publishing Connection-proof account required');
        this.code = 0x178b;
        this.name = 'SubspacePublishingConnectionProofAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SubspacePublishingConnectionProofAccountRequiredError);
        }
    }
}
exports.SubspacePublishingConnectionProofAccountRequiredError = SubspacePublishingConnectionProofAccountRequiredError;
createErrorFromCodeLookup.set(0x178b, () => new SubspacePublishingConnectionProofAccountRequiredError());
createErrorFromNameLookup.set('SubspacePublishingConnectionProofAccountRequired', () => new SubspacePublishingConnectionProofAccountRequiredError());
class SubspacePublishingManagerProofAccountRequiredError extends Error {
    constructor() {
        super('Subspace publishing Manager-proof account required');
        this.code = 0x178c;
        this.name = 'SubspacePublishingManagerProofAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SubspacePublishingManagerProofAccountRequiredError);
        }
    }
}
exports.SubspacePublishingManagerProofAccountRequiredError = SubspacePublishingManagerProofAccountRequiredError;
createErrorFromCodeLookup.set(0x178c, () => new SubspacePublishingManagerProofAccountRequiredError());
createErrorFromNameLookup.set('SubspacePublishingManagerProofAccountRequired', () => new SubspacePublishingManagerProofAccountRequiredError());
class UriLengthIncorrectError extends Error {
    constructor() {
        super('URI length is incorrect');
        this.code = 0x178d;
        this.name = 'UriLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, UriLengthIncorrectError);
        }
    }
}
exports.UriLengthIncorrectError = UriLengthIncorrectError;
createErrorFromCodeLookup.set(0x178d, () => new UriLengthIncorrectError());
createErrorFromNameLookup.set('UriLengthIncorrect', () => new UriLengthIncorrectError());
class TargetPublicationRequiredError extends Error {
    constructor() {
        super('Missed Target Publication account');
        this.code = 0x178e;
        this.name = 'TargetPublicationRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, TargetPublicationRequiredError);
        }
    }
}
exports.TargetPublicationRequiredError = TargetPublicationRequiredError;
createErrorFromCodeLookup.set(0x178e, () => new TargetPublicationRequiredError());
createErrorFromNameLookup.set('TargetPublicationRequired', () => new TargetPublicationRequiredError());
class BothMirrorAndReplyNotAllowedError extends Error {
    constructor() {
        super('Both mirroring and replying not allowed in the same time');
        this.code = 0x178f;
        this.name = 'BothMirrorAndReplyNotAllowed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, BothMirrorAndReplyNotAllowedError);
        }
    }
}
exports.BothMirrorAndReplyNotAllowedError = BothMirrorAndReplyNotAllowedError;
createErrorFromCodeLookup.set(0x178f, () => new BothMirrorAndReplyNotAllowedError());
createErrorFromNameLookup.set('BothMirrorAndReplyNotAllowed', () => new BothMirrorAndReplyNotAllowedError());
class SelfConnectionNotAllowedError extends Error {
    constructor() {
        super('Self conections is not allowed');
        this.code = 0x1790;
        this.name = 'SelfConnectionNotAllowed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SelfConnectionNotAllowedError);
        }
    }
}
exports.SelfConnectionNotAllowedError = SelfConnectionNotAllowedError;
createErrorFromCodeLookup.set(0x1790, () => new SelfConnectionNotAllowedError());
createErrorFromNameLookup.set('SelfConnectionNotAllowed', () => new SelfConnectionNotAllowedError());
class ConnectionTargetAccountMissedError extends Error {
    constructor() {
        super('Connection target account is missed');
        this.code = 0x1791;
        this.name = 'ConnectionTargetAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionTargetAccountMissedError);
        }
    }
}
exports.ConnectionTargetAccountMissedError = ConnectionTargetAccountMissedError;
createErrorFromCodeLookup.set(0x1791, () => new ConnectionTargetAccountMissedError());
createErrorFromNameLookup.set('ConnectionTargetAccountMissed', () => new ConnectionTargetAccountMissedError());
class ConnectionTargetAccountInvalidError extends Error {
    constructor() {
        super('Connection target account is invalid');
        this.code = 0x1792;
        this.name = 'ConnectionTargetAccountInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionTargetAccountInvalidError);
        }
    }
}
exports.ConnectionTargetAccountInvalidError = ConnectionTargetAccountInvalidError;
createErrorFromCodeLookup.set(0x1792, () => new ConnectionTargetAccountInvalidError());
createErrorFromNameLookup.set('ConnectionTargetAccountInvalid', () => new ConnectionTargetAccountInvalidError());
class ConnectionTargetAuthorityMismatchError extends Error {
    constructor() {
        super('Connection target authority mismatch');
        this.code = 0x1793;
        this.name = 'ConnectionTargetAuthorityMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionTargetAuthorityMismatchError);
        }
    }
}
exports.ConnectionTargetAuthorityMismatchError = ConnectionTargetAuthorityMismatchError;
createErrorFromCodeLookup.set(0x1793, () => new ConnectionTargetAuthorityMismatchError());
createErrorFromNameLookup.set('ConnectionTargetAuthorityMismatch', () => new ConnectionTargetAuthorityMismatchError());
class ConnectionValidationFailError extends Error {
    constructor() {
        super('Connection validation failed');
        this.code = 0x1794;
        this.name = 'ConnectionValidationFail';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionValidationFailError);
        }
    }
}
exports.ConnectionValidationFailError = ConnectionValidationFailError;
createErrorFromCodeLookup.set(0x1794, () => new ConnectionValidationFailError());
createErrorFromNameLookup.set('ConnectionValidationFail', () => new ConnectionValidationFailError());
class AliasAccountExistError extends Error {
    constructor() {
        super('Alias account already exist');
        this.code = 0x1795;
        this.name = 'AliasAccountExist';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasAccountExistError);
        }
    }
}
exports.AliasAccountExistError = AliasAccountExistError;
createErrorFromCodeLookup.set(0x1795, () => new AliasAccountExistError());
createErrorFromNameLookup.set('AliasAccountExist', () => new AliasAccountExistError());
class SelfPublicationCollectingError extends Error {
    constructor() {
        super("Forbidden to collect user's  own publication");
        this.code = 0x1796;
        this.name = 'SelfPublicationCollecting';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SelfPublicationCollectingError);
        }
    }
}
exports.SelfPublicationCollectingError = SelfPublicationCollectingError;
createErrorFromCodeLookup.set(0x1796, () => new SelfPublicationCollectingError());
createErrorFromNameLookup.set('SelfPublicationCollecting', () => new SelfPublicationCollectingError());
class PublicationTagIncorrectError extends Error {
    constructor() {
        super('Publication Tag is incorrect');
        this.code = 0x1797;
        this.name = 'PublicationTagIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, PublicationTagIncorrectError);
        }
    }
}
exports.PublicationTagIncorrectError = PublicationTagIncorrectError;
createErrorFromCodeLookup.set(0x1797, () => new PublicationTagIncorrectError());
createErrorFromNameLookup.set('PublicationTagIncorrect', () => new PublicationTagIncorrectError());
class RegisteringProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed registering external processor account');
        this.code = 0x1798;
        this.name = 'RegisteringProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, RegisteringProcessorAccountMissedError);
        }
    }
}
exports.RegisteringProcessorAccountMissedError = RegisteringProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x1798, () => new RegisteringProcessorAccountMissedError());
createErrorFromNameLookup.set('RegisteringProcessorAccountMissed', () => new RegisteringProcessorAccountMissedError());
class ConnectingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed connecting external processor account');
        this.code = 0x1799;
        this.name = 'ConnectingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectingProcessorAccountMissedError);
        }
    }
}
exports.ConnectingProcessorAccountMissedError = ConnectingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x1799, () => new ConnectingProcessorAccountMissedError());
createErrorFromNameLookup.set('ConnectingProcessorAccountMissed', () => new ConnectingProcessorAccountMissedError());
class PublishingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed publishing external processor account');
        this.code = 0x179a;
        this.name = 'PublishingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, PublishingProcessorAccountMissedError);
        }
    }
}
exports.PublishingProcessorAccountMissedError = PublishingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x179a, () => new PublishingProcessorAccountMissedError());
createErrorFromNameLookup.set('PublishingProcessorAccountMissed', () => new PublishingProcessorAccountMissedError());
class CollectingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed collecting external processor account');
        this.code = 0x179b;
        this.name = 'CollectingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CollectingProcessorAccountMissedError);
        }
    }
}
exports.CollectingProcessorAccountMissedError = CollectingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x179b, () => new CollectingProcessorAccountMissedError());
createErrorFromNameLookup.set('CollectingProcessorAccountMissed', () => new CollectingProcessorAccountMissedError());
class ReferencingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed referencing external processor account');
        this.code = 0x179c;
        this.name = 'ReferencingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReferencingProcessorAccountMissedError);
        }
    }
}
exports.ReferencingProcessorAccountMissedError = ReferencingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x179c, () => new ReferencingProcessorAccountMissedError());
createErrorFromNameLookup.set('ReferencingProcessorAccountMissed', () => new ReferencingProcessorAccountMissedError());
class RegisteringProcessorMismatchError extends Error {
    constructor() {
        super('Registering external processor mismatch');
        this.code = 0x179d;
        this.name = 'RegisteringProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, RegisteringProcessorMismatchError);
        }
    }
}
exports.RegisteringProcessorMismatchError = RegisteringProcessorMismatchError;
createErrorFromCodeLookup.set(0x179d, () => new RegisteringProcessorMismatchError());
createErrorFromNameLookup.set('RegisteringProcessorMismatch', () => new RegisteringProcessorMismatchError());
class ConnectingProcessorMismatchError extends Error {
    constructor() {
        super('Connecting external processor mismatch');
        this.code = 0x179e;
        this.name = 'ConnectingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectingProcessorMismatchError);
        }
    }
}
exports.ConnectingProcessorMismatchError = ConnectingProcessorMismatchError;
createErrorFromCodeLookup.set(0x179e, () => new ConnectingProcessorMismatchError());
createErrorFromNameLookup.set('ConnectingProcessorMismatch', () => new ConnectingProcessorMismatchError());
class PublishingProcessorMismatchError extends Error {
    constructor() {
        super('Publishing external processor mismatch');
        this.code = 0x179f;
        this.name = 'PublishingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, PublishingProcessorMismatchError);
        }
    }
}
exports.PublishingProcessorMismatchError = PublishingProcessorMismatchError;
createErrorFromCodeLookup.set(0x179f, () => new PublishingProcessorMismatchError());
createErrorFromNameLookup.set('PublishingProcessorMismatch', () => new PublishingProcessorMismatchError());
class CollectingProcessorMismatchError extends Error {
    constructor() {
        super('Collecting external processor mismatch');
        this.code = 0x17a0;
        this.name = 'CollectingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CollectingProcessorMismatchError);
        }
    }
}
exports.CollectingProcessorMismatchError = CollectingProcessorMismatchError;
createErrorFromCodeLookup.set(0x17a0, () => new CollectingProcessorMismatchError());
createErrorFromNameLookup.set('CollectingProcessorMismatch', () => new CollectingProcessorMismatchError());
class ReferencingProcessorMismatchError extends Error {
    constructor() {
        super('Referencing external processor mismatch');
        this.code = 0x17a1;
        this.name = 'ReferencingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReferencingProcessorMismatchError);
        }
    }
}
exports.ReferencingProcessorMismatchError = ReferencingProcessorMismatchError;
createErrorFromCodeLookup.set(0x17a1, () => new ReferencingProcessorMismatchError());
createErrorFromNameLookup.set('ReferencingProcessorMismatch', () => new ReferencingProcessorMismatchError());
class ReactionTargetAccountInvalidError extends Error {
    constructor() {
        super('Reaction target account is invalid');
        this.code = 0x17a2;
        this.name = 'ReactionTargetAccountInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReactionTargetAccountInvalidError);
        }
    }
}
exports.ReactionTargetAccountInvalidError = ReactionTargetAccountInvalidError;
createErrorFromCodeLookup.set(0x17a2, () => new ReactionTargetAccountInvalidError());
createErrorFromNameLookup.set('ReactionTargetAccountInvalid', () => new ReactionTargetAccountInvalidError());
class ReactionCustomCodeMissedError extends Error {
    constructor() {
        super('Report custom code missed');
        this.code = 0x17a3;
        this.name = 'ReactionCustomCodeMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReactionCustomCodeMissedError);
        }
    }
}
exports.ReactionCustomCodeMissedError = ReactionCustomCodeMissedError;
createErrorFromCodeLookup.set(0x17a3, () => new ReactionCustomCodeMissedError());
createErrorFromNameLookup.set('ReactionCustomCodeMissed', () => new ReactionCustomCodeMissedError());
class ReportTargetAccountInvalidError extends Error {
    constructor() {
        super('Report target account is invalid');
        this.code = 0x17a4;
        this.name = 'ReportTargetAccountInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReportTargetAccountInvalidError);
        }
    }
}
exports.ReportTargetAccountInvalidError = ReportTargetAccountInvalidError;
createErrorFromCodeLookup.set(0x17a4, () => new ReportTargetAccountInvalidError());
createErrorFromNameLookup.set('ReportTargetAccountInvalid', () => new ReportTargetAccountInvalidError());
function errorFromCode(code) {
    const createError = createErrorFromCodeLookup.get(code);
    return createError != null ? createError() : null;
}
exports.errorFromCode = errorFromCode;
function errorFromName(name) {
    const createError = createErrorFromNameLookup.get(name);
    return createError != null ? createError() : null;
}
exports.errorFromName = errorFromName;
//# sourceMappingURL=index.js.map