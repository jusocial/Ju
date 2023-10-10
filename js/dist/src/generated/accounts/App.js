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
    constructor(appName, authority, metadataUri, profileFirstNameRequired, profileLastNameRequired, profileBirthdateRequired, profileCountryRequired, profileCityRequired, profileMetadataUriRequired, subspaceNameRequired, subspaceMetadataUriRequired, profileDeleteAllowed, subspaceDeleteAllowed, publicationDeleteAllowed, profileIndividualProcessorsAllowed, subspaceIndividualProcessorsAllowed, publicationIndividualProcessorsAllowed, registeringProcessor, connectingProcessor, publishingProcessor, collectingProcessor, referencingProcessor) {
        this.appName = appName;
        this.authority = authority;
        this.metadataUri = metadataUri;
        this.profileFirstNameRequired = profileFirstNameRequired;
        this.profileLastNameRequired = profileLastNameRequired;
        this.profileBirthdateRequired = profileBirthdateRequired;
        this.profileCountryRequired = profileCountryRequired;
        this.profileCityRequired = profileCityRequired;
        this.profileMetadataUriRequired = profileMetadataUriRequired;
        this.subspaceNameRequired = subspaceNameRequired;
        this.subspaceMetadataUriRequired = subspaceMetadataUriRequired;
        this.profileDeleteAllowed = profileDeleteAllowed;
        this.subspaceDeleteAllowed = subspaceDeleteAllowed;
        this.publicationDeleteAllowed = publicationDeleteAllowed;
        this.profileIndividualProcessorsAllowed = profileIndividualProcessorsAllowed;
        this.subspaceIndividualProcessorsAllowed = subspaceIndividualProcessorsAllowed;
        this.publicationIndividualProcessorsAllowed = publicationIndividualProcessorsAllowed;
        this.registeringProcessor = registeringProcessor;
        this.connectingProcessor = connectingProcessor;
        this.publishingProcessor = publishingProcessor;
        this.collectingProcessor = collectingProcessor;
        this.referencingProcessor = referencingProcessor;
    }
    static fromArgs(args) {
        return new App(args.appName, args.authority, args.metadataUri, args.profileFirstNameRequired, args.profileLastNameRequired, args.profileBirthdateRequired, args.profileCountryRequired, args.profileCityRequired, args.profileMetadataUriRequired, args.subspaceNameRequired, args.subspaceMetadataUriRequired, args.profileDeleteAllowed, args.subspaceDeleteAllowed, args.publicationDeleteAllowed, args.profileIndividualProcessorsAllowed, args.subspaceIndividualProcessorsAllowed, args.publicationIndividualProcessorsAllowed, args.registeringProcessor, args.connectingProcessor, args.publishingProcessor, args.collectingProcessor, args.referencingProcessor);
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
            appName: this.appName,
            authority: this.authority.toBase58(),
            metadataUri: this.metadataUri,
            profileFirstNameRequired: this.profileFirstNameRequired,
            profileLastNameRequired: this.profileLastNameRequired,
            profileBirthdateRequired: this.profileBirthdateRequired,
            profileCountryRequired: this.profileCountryRequired,
            profileCityRequired: this.profileCityRequired,
            profileMetadataUriRequired: this.profileMetadataUriRequired,
            subspaceNameRequired: this.subspaceNameRequired,
            subspaceMetadataUriRequired: this.subspaceMetadataUriRequired,
            profileDeleteAllowed: this.profileDeleteAllowed,
            subspaceDeleteAllowed: this.subspaceDeleteAllowed,
            publicationDeleteAllowed: this.publicationDeleteAllowed,
            profileIndividualProcessorsAllowed: this.profileIndividualProcessorsAllowed,
            subspaceIndividualProcessorsAllowed: this.subspaceIndividualProcessorsAllowed,
            publicationIndividualProcessorsAllowed: this.publicationIndividualProcessorsAllowed,
            registeringProcessor: this.registeringProcessor,
            connectingProcessor: this.connectingProcessor,
            publishingProcessor: this.publishingProcessor,
            collectingProcessor: this.collectingProcessor,
            referencingProcessor: this.referencingProcessor,
        };
    }
}
exports.App = App;
exports.appBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['appName', beet.utf8String],
    ['authority', beetSolana.publicKey],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['profileFirstNameRequired', beet.bool],
    ['profileLastNameRequired', beet.bool],
    ['profileBirthdateRequired', beet.bool],
    ['profileCountryRequired', beet.bool],
    ['profileCityRequired', beet.bool],
    ['profileMetadataUriRequired', beet.bool],
    ['subspaceNameRequired', beet.bool],
    ['subspaceMetadataUriRequired', beet.bool],
    ['profileDeleteAllowed', beet.bool],
    ['subspaceDeleteAllowed', beet.bool],
    ['publicationDeleteAllowed', beet.bool],
    ['profileIndividualProcessorsAllowed', beet.bool],
    ['subspaceIndividualProcessorsAllowed', beet.bool],
    ['publicationIndividualProcessorsAllowed', beet.bool],
    ['registeringProcessor', beet.coption(beetSolana.publicKey)],
    ['connectingProcessor', beet.coption(beetSolana.publicKey)],
    ['publishingProcessor', beet.coption(beetSolana.publicKey)],
    ['collectingProcessor', beet.coption(beetSolana.publicKey)],
    ['referencingProcessor', beet.coption(beetSolana.publicKey)],
], App.fromArgs, 'App');
//# sourceMappingURL=App.js.map