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
exports.publicationBeet = exports.Publication = exports.publicationDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const ContentType_1 = require("../types/ContentType");
exports.publicationDiscriminator = [213, 137, 189, 150, 94, 132, 251, 247];
class Publication {
    constructor(uuid, app, profile, authority, metadataUri, subspace, isMirror, isReply, targetPublication, contentType, collectingProcessor, referencingProcessor, createdAt, modifiedAt) {
        this.uuid = uuid;
        this.app = app;
        this.profile = profile;
        this.authority = authority;
        this.metadataUri = metadataUri;
        this.subspace = subspace;
        this.isMirror = isMirror;
        this.isReply = isReply;
        this.targetPublication = targetPublication;
        this.contentType = contentType;
        this.collectingProcessor = collectingProcessor;
        this.referencingProcessor = referencingProcessor;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
    static fromArgs(args) {
        return new Publication(args.uuid, args.app, args.profile, args.authority, args.metadataUri, args.subspace, args.isMirror, args.isReply, args.targetPublication, args.contentType, args.collectingProcessor, args.referencingProcessor, args.createdAt, args.modifiedAt);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Publication.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Publication account at ${address}`);
        }
        return Publication.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.publicationBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.publicationBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.publicationBeet.serialize({
            accountDiscriminator: exports.publicationDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Publication.fromArgs(args);
        return exports.publicationBeet.toFixedFromValue({
            accountDiscriminator: exports.publicationDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Publication.byteSize(args), commitment);
    }
    pretty() {
        return {
            uuid: this.uuid,
            app: this.app.toBase58(),
            profile: this.profile.toBase58(),
            authority: this.authority.toBase58(),
            metadataUri: this.metadataUri,
            subspace: this.subspace,
            isMirror: this.isMirror,
            isReply: this.isReply,
            targetPublication: this.targetPublication,
            contentType: 'ContentType.' + ContentType_1.ContentType[this.contentType],
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
            modifiedAt: this.modifiedAt,
        };
    }
}
exports.Publication = Publication;
exports.publicationBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['uuid', beet.utf8String],
    ['app', beetSolana.publicKey],
    ['profile', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['metadataUri', beet.utf8String],
    ['subspace', beet.coption(beetSolana.publicKey)],
    ['isMirror', beet.bool],
    ['isReply', beet.bool],
    ['targetPublication', beet.coption(beetSolana.publicKey)],
    ['contentType', ContentType_1.contentTypeBeet],
    ['collectingProcessor', beet.coption(beetSolana.publicKey)],
    ['referencingProcessor', beet.coption(beetSolana.publicKey)],
    ['createdAt', beet.i64],
    ['modifiedAt', beet.coption(beet.i64)],
], Publication.fromArgs, 'Publication');
//# sourceMappingURL=Publication.js.map