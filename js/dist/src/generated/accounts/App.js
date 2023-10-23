"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appBeet = exports.App = exports.appDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
exports.appDiscriminator = [67, 135, 84, 79, 153, 49, 239, 169];
class App {
    constructor(authority, isProfileDeleteAllowed, isSubspaceDeleteAllowed, isPublicationDeleteAllowed, isProfileIndividualProcessorsAllowed, isSubspaceIndividualProcessorsAllowed, isPublicationIndividualProcessorsAllowed, reserved1, reserved2, reserved3, reserved4, reserved5, reserved6, creationYear, creationMonth, appDomainName, metadataUri, registeringProcessor, connectingProcessor, publishingProcessor, collectingProcessor, referencingProcessor, createdAt) {
        this.authority = authority;
        this.isProfileDeleteAllowed = isProfileDeleteAllowed;
        this.isSubspaceDeleteAllowed = isSubspaceDeleteAllowed;
        this.isPublicationDeleteAllowed = isPublicationDeleteAllowed;
        this.isProfileIndividualProcessorsAllowed = isProfileIndividualProcessorsAllowed;
        this.isSubspaceIndividualProcessorsAllowed = isSubspaceIndividualProcessorsAllowed;
        this.isPublicationIndividualProcessorsAllowed = isPublicationIndividualProcessorsAllowed;
        this.reserved1 = reserved1;
        this.reserved2 = reserved2;
        this.reserved3 = reserved3;
        this.reserved4 = reserved4;
        this.reserved5 = reserved5;
        this.reserved6 = reserved6;
        this.creationYear = creationYear;
        this.creationMonth = creationMonth;
        this.appDomainName = appDomainName;
        this.metadataUri = metadataUri;
        this.registeringProcessor = registeringProcessor;
        this.connectingProcessor = connectingProcessor;
        this.publishingProcessor = publishingProcessor;
        this.collectingProcessor = collectingProcessor;
        this.referencingProcessor = referencingProcessor;
        this.createdAt = createdAt;
    }
    static fromArgs(args) {
        return new App(args.authority, args.isProfileDeleteAllowed, args.isSubspaceDeleteAllowed, args.isPublicationDeleteAllowed, args.isProfileIndividualProcessorsAllowed, args.isSubspaceIndividualProcessorsAllowed, args.isPublicationIndividualProcessorsAllowed, args.reserved1, args.reserved2, args.reserved3, args.reserved4, args.reserved5, args.reserved6, args.creationYear, args.creationMonth, args.appDomainName, args.metadataUri, args.registeringProcessor, args.connectingProcessor, args.publishingProcessor, args.collectingProcessor, args.referencingProcessor, args.createdAt);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return App.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find App account at ${address}`);
        }
        return App.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.appBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.appBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.appBeet.serialize({
            accountDiscriminator: exports.appDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = App.fromArgs(args);
        return exports.appBeet.toFixedFromValue({
            accountDiscriminator: exports.appDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(App.byteSize(args), commitment);
    }
    pretty() {
        return {
            authority: this.authority.toBase58(),
            isProfileDeleteAllowed: this.isProfileDeleteAllowed,
            isSubspaceDeleteAllowed: this.isSubspaceDeleteAllowed,
            isPublicationDeleteAllowed: this.isPublicationDeleteAllowed,
            isProfileIndividualProcessorsAllowed: this.isProfileIndividualProcessorsAllowed,
            isSubspaceIndividualProcessorsAllowed: this.isSubspaceIndividualProcessorsAllowed,
            isPublicationIndividualProcessorsAllowed: this.isPublicationIndividualProcessorsAllowed,
            reserved1: this.reserved1,
            reserved2: this.reserved2,
            reserved3: this.reserved3,
            reserved4: this.reserved4,
            reserved5: this.reserved5.toBase58(),
            reserved6: this.reserved6.toBase58(),
            creationYear: (() => {
                const x = this.creationYear;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            creationMonth: (() => {
                const x = this.creationMonth;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            appDomainName: this.appDomainName,
            metadataUri: this.metadataUri,
            registeringProcessor: this.registeringProcessor,
            connectingProcessor: this.connectingProcessor,
            publishingProcessor: this.publishingProcessor,
            collectingProcessor: this.collectingProcessor,
            referencingProcessor: this.referencingProcessor,
            createdAt: (() => {
                const x = this.createdAt;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
        };
    }
}
exports.App = App;
exports.appBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['authority', beetSolana.publicKey],
    ['isProfileDeleteAllowed', beet.bool],
    ['isSubspaceDeleteAllowed', beet.bool],
    ['isPublicationDeleteAllowed', beet.bool],
    ['isProfileIndividualProcessorsAllowed', beet.bool],
    ['isSubspaceIndividualProcessorsAllowed', beet.bool],
    ['isPublicationIndividualProcessorsAllowed', beet.bool],
    ['reserved1', beet.u8],
    ['reserved2', beet.u8],
    ['reserved3', beet.u8],
    ['reserved4', beet.u8],
    ['reserved5', beetSolana.publicKey],
    ['reserved6', beetSolana.publicKey],
    ['creationYear', beet.i64],
    ['creationMonth', beet.i64],
    ['appDomainName', beet.utf8String],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['registeringProcessor', beet.coption(beetSolana.publicKey)],
    ['connectingProcessor', beet.coption(beetSolana.publicKey)],
    ['publishingProcessor', beet.coption(beetSolana.publicKey)],
    ['collectingProcessor', beet.coption(beetSolana.publicKey)],
    ['referencingProcessor', beet.coption(beetSolana.publicKey)],
    ['createdAt', beet.i64],
], App.fromArgs, 'App');
//# sourceMappingURL=App.js.map