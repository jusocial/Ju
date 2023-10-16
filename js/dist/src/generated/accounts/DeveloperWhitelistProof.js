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
exports.developerWhitelistProofBeet = exports.DeveloperWhitelistProof = exports.developerWhitelistProofDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const beet = __importStar(require("@metaplex-foundation/beet"));
exports.developerWhitelistProofDiscriminator = [151, 62, 246, 164, 78, 115, 182, 59];
class DeveloperWhitelistProof {
    constructor(authority, developer) {
        this.authority = authority;
        this.developer = developer;
    }
    static fromArgs(args) {
        return new DeveloperWhitelistProof(args.authority, args.developer);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return DeveloperWhitelistProof.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find DeveloperWhitelistProof account at ${address}`);
        }
        return DeveloperWhitelistProof.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.developerWhitelistProofBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.developerWhitelistProofBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.developerWhitelistProofBeet.serialize({
            accountDiscriminator: exports.developerWhitelistProofDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.developerWhitelistProofBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(DeveloperWhitelistProof.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === DeveloperWhitelistProof.byteSize;
    }
    pretty() {
        return {
            authority: this.authority.toBase58(),
            developer: this.developer.toBase58(),
        };
    }
}
exports.DeveloperWhitelistProof = DeveloperWhitelistProof;
exports.developerWhitelistProofBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['authority', beetSolana.publicKey],
    ['developer', beetSolana.publicKey],
], DeveloperWhitelistProof.fromArgs, 'DeveloperWhitelistProof');
//# sourceMappingURL=DeveloperWhitelistProof.js.map