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
exports.aliasBeet = exports.Alias = exports.aliasDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const AliasType_1 = require("../types/AliasType");
exports.aliasDiscriminator = [175, 23, 49, 34, 113, 79, 229, 204];
class Alias {
    constructor(app, aliasType, owner, authority, value) {
        this.app = app;
        this.aliasType = aliasType;
        this.owner = owner;
        this.authority = authority;
        this.value = value;
    }
    static fromArgs(args) {
        return new Alias(args.app, args.aliasType, args.owner, args.authority, args.value);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Alias.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Alias account at ${address}`);
        }
        return Alias.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.aliasBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.aliasBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.aliasBeet.serialize({
            accountDiscriminator: exports.aliasDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Alias.fromArgs(args);
        return exports.aliasBeet.toFixedFromValue({
            accountDiscriminator: exports.aliasDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Alias.byteSize(args), commitment);
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            aliasType: 'AliasType.' + AliasType_1.AliasType[this.aliasType],
            owner: this.owner.toBase58(),
            authority: this.authority.toBase58(),
            value: this.value,
        };
    }
}
exports.Alias = Alias;
exports.aliasBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['aliasType', AliasType_1.aliasTypeBeet],
    ['owner', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['value', beet.utf8String],
], Alias.fromArgs, 'Alias');
//# sourceMappingURL=Alias.js.map