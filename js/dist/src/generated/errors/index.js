"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFromName = exports.errorFromCode = exports.ReportTargetAccountInvalidError = exports.ReactionTargetAccountInvalidError = exports.ReferencingProcessorMismatchError = exports.CollectingProcessorMismatchError = exports.PublishingProcessorMismatchError = exports.ConnectingProcessorMismatchError = exports.RegisteringProcessorMismatchError = exports.ReferencingProcessorAccountMissedError = exports.CollectingProcessorAccountMissedError = exports.PublishingProcessorAccountMissedError = exports.ConnectingProcessorAccountMissedError = exports.RegisteringProcessorAccountMissedError = exports.SelfPublicationCollectingError = exports.AliasAccountExistError = exports.ConnectionValidationFailError = exports.ConnectionTargetAuthorityMismatchError = exports.ConnectionTargetAccountInvalidError = exports.ConnectionTargetAccountMissedError = exports.SelfConnectionNotAllowedError = exports.BothMirrorAndReplyNotAllowedError = exports.TargetPublicationRequiredError = exports.UriLengthIncorrectError = exports.SubspaceNameIncorrectError = exports.SubspaceAliasIncorrectError = exports.ProfileLastNameLengthIncorrectError = exports.ProfileFirstNameLengthIncorrectError = exports.UpdateNotAuthorizedError = exports.CurrentAliasAccountRequiredError = exports.BothAliasAccountRequiredError = exports.AliasAccountsMustBeNoneError = exports.AliasAccountRequiredError = exports.ProfileAliasIncorrectError = exports.ProfileIncorrectError = exports.AliasMustBeAlphanumericError = exports.AliasLengthIncorrectError = exports.ActionProhibitedByAppSettingsError = exports.MissingRequiredFieldError = exports.AppManagementNotAthorizedError = exports.AppNameMustBeAlphanumericError = exports.AppNameLengthIncorrectError = exports.ProcessorNotWhitelistedError = exports.ProcessorNameMustBeAlphanumericError = exports.ProcessorNameLengthIncorrectError = exports.ProcessorTypeMismatchError = exports.ProcessorManagementNotAthorizedError = void 0;
const createErrorFromCodeLookup = new Map();
const createErrorFromNameLookup = new Map();
class ProcessorManagementNotAthorizedError extends Error {
    constructor() {
        super('Procesor management action not authorized');
        this.code = 0x1770;
        this.name = 'ProcessorManagementNotAthorized';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorManagementNotAthorizedError);
        }
    }
}
exports.ProcessorManagementNotAthorizedError = ProcessorManagementNotAthorizedError;
createErrorFromCodeLookup.set(0x1770, () => new ProcessorManagementNotAthorizedError());
createErrorFromNameLookup.set('ProcessorManagementNotAthorized', () => new ProcessorManagementNotAthorizedError());
class ProcessorTypeMismatchError extends Error {
    constructor() {
        super('Procesor type mismatch');
        this.code = 0x1771;
        this.name = 'ProcessorTypeMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorTypeMismatchError);
        }
    }
}
exports.ProcessorTypeMismatchError = ProcessorTypeMismatchError;
createErrorFromCodeLookup.set(0x1771, () => new ProcessorTypeMismatchError());
createErrorFromNameLookup.set('ProcessorTypeMismatch', () => new ProcessorTypeMismatchError());
class ProcessorNameLengthIncorrectError extends Error {
    constructor() {
        super('Procesor name length is incorrect');
        this.code = 0x1772;
        this.name = 'ProcessorNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorNameLengthIncorrectError);
        }
    }
}
exports.ProcessorNameLengthIncorrectError = ProcessorNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1772, () => new ProcessorNameLengthIncorrectError());
createErrorFromNameLookup.set('ProcessorNameLengthIncorrect', () => new ProcessorNameLengthIncorrectError());
class ProcessorNameMustBeAlphanumericError extends Error {
    constructor() {
        super('Processor name must contain only ASCII letters and numbers');
        this.code = 0x1773;
        this.name = 'ProcessorNameMustBeAlphanumeric';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorNameMustBeAlphanumericError);
        }
    }
}
exports.ProcessorNameMustBeAlphanumericError = ProcessorNameMustBeAlphanumericError;
createErrorFromCodeLookup.set(0x1773, () => new ProcessorNameMustBeAlphanumericError());
createErrorFromNameLookup.set('ProcessorNameMustBeAlphanumeric', () => new ProcessorNameMustBeAlphanumericError());
class ProcessorNotWhitelistedError extends Error {
    constructor() {
        super('Procesor trying to use is not whitelisted');
        this.code = 0x1774;
        this.name = 'ProcessorNotWhitelisted';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProcessorNotWhitelistedError);
        }
    }
}
exports.ProcessorNotWhitelistedError = ProcessorNotWhitelistedError;
createErrorFromCodeLookup.set(0x1774, () => new ProcessorNotWhitelistedError());
createErrorFromNameLookup.set('ProcessorNotWhitelisted', () => new ProcessorNotWhitelistedError());
class AppNameLengthIncorrectError extends Error {
    constructor() {
        super('Application name (ID) length is incorrect');
        this.code = 0x1775;
        this.name = 'AppNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AppNameLengthIncorrectError);
        }
    }
}
exports.AppNameLengthIncorrectError = AppNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1775, () => new AppNameLengthIncorrectError());
createErrorFromNameLookup.set('AppNameLengthIncorrect', () => new AppNameLengthIncorrectError());
class AppNameMustBeAlphanumericError extends Error {
    constructor() {
        super('Application name (ID) must contain only ASCII letters and numbers');
        this.code = 0x1776;
        this.name = 'AppNameMustBeAlphanumeric';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AppNameMustBeAlphanumericError);
        }
    }
}
exports.AppNameMustBeAlphanumericError = AppNameMustBeAlphanumericError;
createErrorFromCodeLookup.set(0x1776, () => new AppNameMustBeAlphanumericError());
createErrorFromNameLookup.set('AppNameMustBeAlphanumeric', () => new AppNameMustBeAlphanumericError());
class AppManagementNotAthorizedError extends Error {
    constructor() {
        super('App management action not authorized');
        this.code = 0x1777;
        this.name = 'AppManagementNotAthorized';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AppManagementNotAthorizedError);
        }
    }
}
exports.AppManagementNotAthorizedError = AppManagementNotAthorizedError;
createErrorFromCodeLookup.set(0x1777, () => new AppManagementNotAthorizedError());
createErrorFromNameLookup.set('AppManagementNotAthorized', () => new AppManagementNotAthorizedError());
class MissingRequiredFieldError extends Error {
    constructor() {
        super('Missing field required by Application settings');
        this.code = 0x1778;
        this.name = 'MissingRequiredField';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, MissingRequiredFieldError);
        }
    }
}
exports.MissingRequiredFieldError = MissingRequiredFieldError;
createErrorFromCodeLookup.set(0x1778, () => new MissingRequiredFieldError());
createErrorFromNameLookup.set('MissingRequiredField', () => new MissingRequiredFieldError());
class ActionProhibitedByAppSettingsError extends Error {
    constructor() {
        super('The action is prohibited by application settings');
        this.code = 0x1779;
        this.name = 'ActionProhibitedByAppSettings';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ActionProhibitedByAppSettingsError);
        }
    }
}
exports.ActionProhibitedByAppSettingsError = ActionProhibitedByAppSettingsError;
createErrorFromCodeLookup.set(0x1779, () => new ActionProhibitedByAppSettingsError());
createErrorFromNameLookup.set('ActionProhibitedByAppSettings', () => new ActionProhibitedByAppSettingsError());
class AliasLengthIncorrectError extends Error {
    constructor() {
        super('Alias length is incorrect');
        this.code = 0x177a;
        this.name = 'AliasLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasLengthIncorrectError);
        }
    }
}
exports.AliasLengthIncorrectError = AliasLengthIncorrectError;
createErrorFromCodeLookup.set(0x177a, () => new AliasLengthIncorrectError());
createErrorFromNameLookup.set('AliasLengthIncorrect', () => new AliasLengthIncorrectError());
class AliasMustBeAlphanumericError extends Error {
    constructor() {
        super('Alias must contain only ASCII letters and numbers');
        this.code = 0x177b;
        this.name = 'AliasMustBeAlphanumeric';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasMustBeAlphanumericError);
        }
    }
}
exports.AliasMustBeAlphanumericError = AliasMustBeAlphanumericError;
createErrorFromCodeLookup.set(0x177b, () => new AliasMustBeAlphanumericError());
createErrorFromNameLookup.set('AliasMustBeAlphanumeric', () => new AliasMustBeAlphanumericError());
class ProfileIncorrectError extends Error {
    constructor() {
        super('Profile incorrect');
        this.code = 0x177c;
        this.name = 'ProfileIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileIncorrectError);
        }
    }
}
exports.ProfileIncorrectError = ProfileIncorrectError;
createErrorFromCodeLookup.set(0x177c, () => new ProfileIncorrectError());
createErrorFromNameLookup.set('ProfileIncorrect', () => new ProfileIncorrectError());
class ProfileAliasIncorrectError extends Error {
    constructor() {
        super('Profile alias is incorrect');
        this.code = 0x177d;
        this.name = 'ProfileAliasIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileAliasIncorrectError);
        }
    }
}
exports.ProfileAliasIncorrectError = ProfileAliasIncorrectError;
createErrorFromCodeLookup.set(0x177d, () => new ProfileAliasIncorrectError());
createErrorFromNameLookup.set('ProfileAliasIncorrect', () => new ProfileAliasIncorrectError());
class AliasAccountRequiredError extends Error {
    constructor() {
        super('Alias account required to register action');
        this.code = 0x177e;
        this.name = 'AliasAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasAccountRequiredError);
        }
    }
}
exports.AliasAccountRequiredError = AliasAccountRequiredError;
createErrorFromCodeLookup.set(0x177e, () => new AliasAccountRequiredError());
createErrorFromNameLookup.set('AliasAccountRequired', () => new AliasAccountRequiredError());
class AliasAccountsMustBeNoneError extends Error {
    constructor() {
        super('Alias accounts must not be passed');
        this.code = 0x177f;
        this.name = 'AliasAccountsMustBeNone';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasAccountsMustBeNoneError);
        }
    }
}
exports.AliasAccountsMustBeNoneError = AliasAccountsMustBeNoneError;
createErrorFromCodeLookup.set(0x177f, () => new AliasAccountsMustBeNoneError());
createErrorFromNameLookup.set('AliasAccountsMustBeNone', () => new AliasAccountsMustBeNoneError());
class BothAliasAccountRequiredError extends Error {
    constructor() {
        super('Both alias account required to update');
        this.code = 0x1780;
        this.name = 'BothAliasAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, BothAliasAccountRequiredError);
        }
    }
}
exports.BothAliasAccountRequiredError = BothAliasAccountRequiredError;
createErrorFromCodeLookup.set(0x1780, () => new BothAliasAccountRequiredError());
createErrorFromNameLookup.set('BothAliasAccountRequired', () => new BothAliasAccountRequiredError());
class CurrentAliasAccountRequiredError extends Error {
    constructor() {
        super('Current alias account required to delete');
        this.code = 0x1781;
        this.name = 'CurrentAliasAccountRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CurrentAliasAccountRequiredError);
        }
    }
}
exports.CurrentAliasAccountRequiredError = CurrentAliasAccountRequiredError;
createErrorFromCodeLookup.set(0x1781, () => new CurrentAliasAccountRequiredError());
createErrorFromNameLookup.set('CurrentAliasAccountRequired', () => new CurrentAliasAccountRequiredError());
class UpdateNotAuthorizedError extends Error {
    constructor() {
        super('Profile update not authorized');
        this.code = 0x1782;
        this.name = 'UpdateNotAuthorized';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, UpdateNotAuthorizedError);
        }
    }
}
exports.UpdateNotAuthorizedError = UpdateNotAuthorizedError;
createErrorFromCodeLookup.set(0x1782, () => new UpdateNotAuthorizedError());
createErrorFromNameLookup.set('UpdateNotAuthorized', () => new UpdateNotAuthorizedError());
class ProfileFirstNameLengthIncorrectError extends Error {
    constructor() {
        super('Profile first name length is incorrect');
        this.code = 0x1783;
        this.name = 'ProfileFirstNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileFirstNameLengthIncorrectError);
        }
    }
}
exports.ProfileFirstNameLengthIncorrectError = ProfileFirstNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1783, () => new ProfileFirstNameLengthIncorrectError());
createErrorFromNameLookup.set('ProfileFirstNameLengthIncorrect', () => new ProfileFirstNameLengthIncorrectError());
class ProfileLastNameLengthIncorrectError extends Error {
    constructor() {
        super('Profile last name length is incorrect');
        this.code = 0x1784;
        this.name = 'ProfileLastNameLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ProfileLastNameLengthIncorrectError);
        }
    }
}
exports.ProfileLastNameLengthIncorrectError = ProfileLastNameLengthIncorrectError;
createErrorFromCodeLookup.set(0x1784, () => new ProfileLastNameLengthIncorrectError());
createErrorFromNameLookup.set('ProfileLastNameLengthIncorrect', () => new ProfileLastNameLengthIncorrectError());
class SubspaceAliasIncorrectError extends Error {
    constructor() {
        super('Subspace alias is incorrect');
        this.code = 0x1785;
        this.name = 'SubspaceAliasIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SubspaceAliasIncorrectError);
        }
    }
}
exports.SubspaceAliasIncorrectError = SubspaceAliasIncorrectError;
createErrorFromCodeLookup.set(0x1785, () => new SubspaceAliasIncorrectError());
createErrorFromNameLookup.set('SubspaceAliasIncorrect', () => new SubspaceAliasIncorrectError());
class SubspaceNameIncorrectError extends Error {
    constructor() {
        super('Subspace name length is incorrect');
        this.code = 0x1786;
        this.name = 'SubspaceNameIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SubspaceNameIncorrectError);
        }
    }
}
exports.SubspaceNameIncorrectError = SubspaceNameIncorrectError;
createErrorFromCodeLookup.set(0x1786, () => new SubspaceNameIncorrectError());
createErrorFromNameLookup.set('SubspaceNameIncorrect', () => new SubspaceNameIncorrectError());
class UriLengthIncorrectError extends Error {
    constructor() {
        super('URI length is incorrect');
        this.code = 0x1787;
        this.name = 'UriLengthIncorrect';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, UriLengthIncorrectError);
        }
    }
}
exports.UriLengthIncorrectError = UriLengthIncorrectError;
createErrorFromCodeLookup.set(0x1787, () => new UriLengthIncorrectError());
createErrorFromNameLookup.set('UriLengthIncorrect', () => new UriLengthIncorrectError());
class TargetPublicationRequiredError extends Error {
    constructor() {
        super('Missed Target Publication account');
        this.code = 0x1788;
        this.name = 'TargetPublicationRequired';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, TargetPublicationRequiredError);
        }
    }
}
exports.TargetPublicationRequiredError = TargetPublicationRequiredError;
createErrorFromCodeLookup.set(0x1788, () => new TargetPublicationRequiredError());
createErrorFromNameLookup.set('TargetPublicationRequired', () => new TargetPublicationRequiredError());
class BothMirrorAndReplyNotAllowedError extends Error {
    constructor() {
        super('Both mirroring and replying not allowed in the same time');
        this.code = 0x1789;
        this.name = 'BothMirrorAndReplyNotAllowed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, BothMirrorAndReplyNotAllowedError);
        }
    }
}
exports.BothMirrorAndReplyNotAllowedError = BothMirrorAndReplyNotAllowedError;
createErrorFromCodeLookup.set(0x1789, () => new BothMirrorAndReplyNotAllowedError());
createErrorFromNameLookup.set('BothMirrorAndReplyNotAllowed', () => new BothMirrorAndReplyNotAllowedError());
class SelfConnectionNotAllowedError extends Error {
    constructor() {
        super('Self conections is not allowed');
        this.code = 0x178a;
        this.name = 'SelfConnectionNotAllowed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SelfConnectionNotAllowedError);
        }
    }
}
exports.SelfConnectionNotAllowedError = SelfConnectionNotAllowedError;
createErrorFromCodeLookup.set(0x178a, () => new SelfConnectionNotAllowedError());
createErrorFromNameLookup.set('SelfConnectionNotAllowed', () => new SelfConnectionNotAllowedError());
class ConnectionTargetAccountMissedError extends Error {
    constructor() {
        super('Connection target account is missed');
        this.code = 0x178b;
        this.name = 'ConnectionTargetAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionTargetAccountMissedError);
        }
    }
}
exports.ConnectionTargetAccountMissedError = ConnectionTargetAccountMissedError;
createErrorFromCodeLookup.set(0x178b, () => new ConnectionTargetAccountMissedError());
createErrorFromNameLookup.set('ConnectionTargetAccountMissed', () => new ConnectionTargetAccountMissedError());
class ConnectionTargetAccountInvalidError extends Error {
    constructor() {
        super('Connection target account is invalid');
        this.code = 0x178c;
        this.name = 'ConnectionTargetAccountInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionTargetAccountInvalidError);
        }
    }
}
exports.ConnectionTargetAccountInvalidError = ConnectionTargetAccountInvalidError;
createErrorFromCodeLookup.set(0x178c, () => new ConnectionTargetAccountInvalidError());
createErrorFromNameLookup.set('ConnectionTargetAccountInvalid', () => new ConnectionTargetAccountInvalidError());
class ConnectionTargetAuthorityMismatchError extends Error {
    constructor() {
        super('Connection target authority mismatch');
        this.code = 0x178d;
        this.name = 'ConnectionTargetAuthorityMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionTargetAuthorityMismatchError);
        }
    }
}
exports.ConnectionTargetAuthorityMismatchError = ConnectionTargetAuthorityMismatchError;
createErrorFromCodeLookup.set(0x178d, () => new ConnectionTargetAuthorityMismatchError());
createErrorFromNameLookup.set('ConnectionTargetAuthorityMismatch', () => new ConnectionTargetAuthorityMismatchError());
class ConnectionValidationFailError extends Error {
    constructor() {
        super('Connection validation failed');
        this.code = 0x178e;
        this.name = 'ConnectionValidationFail';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectionValidationFailError);
        }
    }
}
exports.ConnectionValidationFailError = ConnectionValidationFailError;
createErrorFromCodeLookup.set(0x178e, () => new ConnectionValidationFailError());
createErrorFromNameLookup.set('ConnectionValidationFail', () => new ConnectionValidationFailError());
class AliasAccountExistError extends Error {
    constructor() {
        super('Alias account already exist');
        this.code = 0x178f;
        this.name = 'AliasAccountExist';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, AliasAccountExistError);
        }
    }
}
exports.AliasAccountExistError = AliasAccountExistError;
createErrorFromCodeLookup.set(0x178f, () => new AliasAccountExistError());
createErrorFromNameLookup.set('AliasAccountExist', () => new AliasAccountExistError());
class SelfPublicationCollectingError extends Error {
    constructor() {
        super("Forbidden to collect user's  own publication");
        this.code = 0x1790;
        this.name = 'SelfPublicationCollecting';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, SelfPublicationCollectingError);
        }
    }
}
exports.SelfPublicationCollectingError = SelfPublicationCollectingError;
createErrorFromCodeLookup.set(0x1790, () => new SelfPublicationCollectingError());
createErrorFromNameLookup.set('SelfPublicationCollecting', () => new SelfPublicationCollectingError());
class RegisteringProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed registering external processor account');
        this.code = 0x1791;
        this.name = 'RegisteringProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, RegisteringProcessorAccountMissedError);
        }
    }
}
exports.RegisteringProcessorAccountMissedError = RegisteringProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x1791, () => new RegisteringProcessorAccountMissedError());
createErrorFromNameLookup.set('RegisteringProcessorAccountMissed', () => new RegisteringProcessorAccountMissedError());
class ConnectingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed connecting external processor account');
        this.code = 0x1792;
        this.name = 'ConnectingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectingProcessorAccountMissedError);
        }
    }
}
exports.ConnectingProcessorAccountMissedError = ConnectingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x1792, () => new ConnectingProcessorAccountMissedError());
createErrorFromNameLookup.set('ConnectingProcessorAccountMissed', () => new ConnectingProcessorAccountMissedError());
class PublishingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed publishing external processor account');
        this.code = 0x1793;
        this.name = 'PublishingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, PublishingProcessorAccountMissedError);
        }
    }
}
exports.PublishingProcessorAccountMissedError = PublishingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x1793, () => new PublishingProcessorAccountMissedError());
createErrorFromNameLookup.set('PublishingProcessorAccountMissed', () => new PublishingProcessorAccountMissedError());
class CollectingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed collecting external processor account');
        this.code = 0x1794;
        this.name = 'CollectingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CollectingProcessorAccountMissedError);
        }
    }
}
exports.CollectingProcessorAccountMissedError = CollectingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x1794, () => new CollectingProcessorAccountMissedError());
createErrorFromNameLookup.set('CollectingProcessorAccountMissed', () => new CollectingProcessorAccountMissedError());
class ReferencingProcessorAccountMissedError extends Error {
    constructor() {
        super('Missed referencing external processor account');
        this.code = 0x1795;
        this.name = 'ReferencingProcessorAccountMissed';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReferencingProcessorAccountMissedError);
        }
    }
}
exports.ReferencingProcessorAccountMissedError = ReferencingProcessorAccountMissedError;
createErrorFromCodeLookup.set(0x1795, () => new ReferencingProcessorAccountMissedError());
createErrorFromNameLookup.set('ReferencingProcessorAccountMissed', () => new ReferencingProcessorAccountMissedError());
class RegisteringProcessorMismatchError extends Error {
    constructor() {
        super('Registering external processor mismatch');
        this.code = 0x1796;
        this.name = 'RegisteringProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, RegisteringProcessorMismatchError);
        }
    }
}
exports.RegisteringProcessorMismatchError = RegisteringProcessorMismatchError;
createErrorFromCodeLookup.set(0x1796, () => new RegisteringProcessorMismatchError());
createErrorFromNameLookup.set('RegisteringProcessorMismatch', () => new RegisteringProcessorMismatchError());
class ConnectingProcessorMismatchError extends Error {
    constructor() {
        super('Connecting external processor mismatch');
        this.code = 0x1797;
        this.name = 'ConnectingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ConnectingProcessorMismatchError);
        }
    }
}
exports.ConnectingProcessorMismatchError = ConnectingProcessorMismatchError;
createErrorFromCodeLookup.set(0x1797, () => new ConnectingProcessorMismatchError());
createErrorFromNameLookup.set('ConnectingProcessorMismatch', () => new ConnectingProcessorMismatchError());
class PublishingProcessorMismatchError extends Error {
    constructor() {
        super('Publishing external processor mismatch');
        this.code = 0x1798;
        this.name = 'PublishingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, PublishingProcessorMismatchError);
        }
    }
}
exports.PublishingProcessorMismatchError = PublishingProcessorMismatchError;
createErrorFromCodeLookup.set(0x1798, () => new PublishingProcessorMismatchError());
createErrorFromNameLookup.set('PublishingProcessorMismatch', () => new PublishingProcessorMismatchError());
class CollectingProcessorMismatchError extends Error {
    constructor() {
        super('Collecting external processor mismatch');
        this.code = 0x1799;
        this.name = 'CollectingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, CollectingProcessorMismatchError);
        }
    }
}
exports.CollectingProcessorMismatchError = CollectingProcessorMismatchError;
createErrorFromCodeLookup.set(0x1799, () => new CollectingProcessorMismatchError());
createErrorFromNameLookup.set('CollectingProcessorMismatch', () => new CollectingProcessorMismatchError());
class ReferencingProcessorMismatchError extends Error {
    constructor() {
        super('Referencing external processor mismatch');
        this.code = 0x179a;
        this.name = 'ReferencingProcessorMismatch';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReferencingProcessorMismatchError);
        }
    }
}
exports.ReferencingProcessorMismatchError = ReferencingProcessorMismatchError;
createErrorFromCodeLookup.set(0x179a, () => new ReferencingProcessorMismatchError());
createErrorFromNameLookup.set('ReferencingProcessorMismatch', () => new ReferencingProcessorMismatchError());
class ReactionTargetAccountInvalidError extends Error {
    constructor() {
        super('Reaction target account is invalid');
        this.code = 0x179b;
        this.name = 'ReactionTargetAccountInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReactionTargetAccountInvalidError);
        }
    }
}
exports.ReactionTargetAccountInvalidError = ReactionTargetAccountInvalidError;
createErrorFromCodeLookup.set(0x179b, () => new ReactionTargetAccountInvalidError());
createErrorFromNameLookup.set('ReactionTargetAccountInvalid', () => new ReactionTargetAccountInvalidError());
class ReportTargetAccountInvalidError extends Error {
    constructor() {
        super('Report target account is invalid');
        this.code = 0x179c;
        this.name = 'ReportTargetAccountInvalid';
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ReportTargetAccountInvalidError);
        }
    }
}
exports.ReportTargetAccountInvalidError = ReportTargetAccountInvalidError;
createErrorFromCodeLookup.set(0x179c, () => new ReportTargetAccountInvalidError());
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