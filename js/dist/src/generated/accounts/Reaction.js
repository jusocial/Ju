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
exports.reactionBeet = exports.Reaction = exports.reactionDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const ReactionType_1 = require("../types/ReactionType");
exports.reactionDiscriminator = [226, 61, 100, 191, 223, 221, 142, 139];
class Reaction {
    constructor(app, authority, initializerProfile, target, reactionType, createdAt) {
        this.app = app;
        this.authority = authority;
        this.initializerProfile = initializerProfile;
        this.target = target;
        this.reactionType = reactionType;
        this.createdAt = createdAt;
    }
    static fromArgs(args) {
        return new Reaction(args.app, args.authority, args.initializerProfile, args.target, args.reactionType, args.createdAt);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Reaction.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Reaction account at ${address}`);
        }
        return Reaction.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.reactionBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.reactionBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.reactionBeet.serialize({
            accountDiscriminator: exports.reactionDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.reactionBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Reaction.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === Reaction.byteSize;
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            authority: this.authority.toBase58(),
            initializerProfile: this.initializerProfile.toBase58(),
            target: this.target.toBase58(),
            reactionType: 'ReactionType.' + ReactionType_1.ReactionType[this.reactionType],
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
exports.Reaction = Reaction;
exports.reactionBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['initializerProfile', beetSolana.publicKey],
    ['target', beetSolana.publicKey],
    ['reactionType', ReactionType_1.reactionTypeBeet],
    ['createdAt', beet.i64],
], Reaction.fromArgs, 'Reaction');
//# sourceMappingURL=Reaction.js.map