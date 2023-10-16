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
exports.subspaceBeet = exports.Subspace = exports.subspaceDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const SubspacePublishingPermissionLevel_1 = require("../types/SubspacePublishingPermissionLevel");
exports.subspaceDiscriminator = [105, 6, 104, 112, 174, 108, 161, 167];
class Subspace {
    constructor(app, authority, exchangeKey, creator, publishingPermission, name, alias, uuid, metadataUri, publishingProcessor, connectingProcessor, collectingProcessor, referencingProcessor, createdAt, reserved1, reserved2) {
        this.app = app;
        this.authority = authority;
        this.exchangeKey = exchangeKey;
        this.creator = creator;
        this.publishingPermission = publishingPermission;
        this.name = name;
        this.alias = alias;
        this.uuid = uuid;
        this.metadataUri = metadataUri;
        this.publishingProcessor = publishingProcessor;
        this.connectingProcessor = connectingProcessor;
        this.collectingProcessor = collectingProcessor;
        this.referencingProcessor = referencingProcessor;
        this.createdAt = createdAt;
        this.reserved1 = reserved1;
        this.reserved2 = reserved2;
    }
    static fromArgs(args) {
        return new Subspace(args.app, args.authority, args.exchangeKey, args.creator, args.publishingPermission, args.name, args.alias, args.uuid, args.metadataUri, args.publishingProcessor, args.connectingProcessor, args.collectingProcessor, args.referencingProcessor, args.createdAt, args.reserved1, args.reserved2);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Subspace.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Subspace account at ${address}`);
        }
        return Subspace.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.subspaceBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.subspaceBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.subspaceBeet.serialize({
            accountDiscriminator: exports.subspaceDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Subspace.fromArgs(args);
        return exports.subspaceBeet.toFixedFromValue({
            accountDiscriminator: exports.subspaceDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Subspace.byteSize(args), commitment);
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            authority: this.authority.toBase58(),
            exchangeKey: this.exchangeKey.toBase58(),
            creator: this.creator.toBase58(),
            publishingPermission: 'SubspacePublishingPermissionLevel.' +
                SubspacePublishingPermissionLevel_1.SubspacePublishingPermissionLevel[this.publishingPermission],
            name: this.name,
            alias: this.alias,
            uuid: this.uuid,
            metadataUri: this.metadataUri,
            publishingProcessor: this.publishingProcessor,
            connectingProcessor: this.connectingProcessor,
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
            reserved1: this.reserved1,
            reserved2: this.reserved2,
        };
    }
}
exports.Subspace = Subspace;
exports.subspaceBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['exchangeKey', beetSolana.publicKey],
    ['creator', beetSolana.publicKey],
    ['publishingPermission', SubspacePublishingPermissionLevel_1.subspacePublishingPermissionLevelBeet],
    ['name', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['alias', beet.coption(beet.utf8String)],
    ['uuid', beet.utf8String],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['publishingProcessor', beet.coption(beetSolana.publicKey)],
    ['connectingProcessor', beet.coption(beetSolana.publicKey)],
    ['collectingProcessor', beet.coption(beetSolana.publicKey)],
    ['referencingProcessor', beet.coption(beetSolana.publicKey)],
    ['createdAt', beet.i64],
    ['reserved1', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['reserved2', beet.uniformFixedSizeArray(beet.u8, 32)],
], Subspace.fromArgs, 'Subspace');
//# sourceMappingURL=Subspace.js.map