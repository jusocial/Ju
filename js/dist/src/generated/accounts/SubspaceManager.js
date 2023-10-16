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
exports.subspaceManagerBeet = exports.SubspaceManager = exports.subspaceManagerDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const SubspaceManagementRoleType_1 = require("../types/SubspaceManagementRoleType");
exports.subspaceManagerDiscriminator = [62, 248, 84, 105, 144, 134, 79, 169];
class SubspaceManager {
    constructor(app, subspace, profile, authority, role) {
        this.app = app;
        this.subspace = subspace;
        this.profile = profile;
        this.authority = authority;
        this.role = role;
    }
    static fromArgs(args) {
        return new SubspaceManager(args.app, args.subspace, args.profile, args.authority, args.role);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return SubspaceManager.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find SubspaceManager account at ${address}`);
        }
        return SubspaceManager.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.subspaceManagerBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.subspaceManagerBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.subspaceManagerBeet.serialize({
            accountDiscriminator: exports.subspaceManagerDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.subspaceManagerBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(SubspaceManager.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === SubspaceManager.byteSize;
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            subspace: this.subspace.toBase58(),
            profile: this.profile.toBase58(),
            authority: this.authority.toBase58(),
            role: 'SubspaceManagementRoleType.' + SubspaceManagementRoleType_1.SubspaceManagementRoleType[this.role],
        };
    }
}
exports.SubspaceManager = SubspaceManager;
exports.subspaceManagerBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['subspace', beetSolana.publicKey],
    ['profile', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['role', SubspaceManagementRoleType_1.subspaceManagementRoleTypeBeet],
], SubspaceManager.fromArgs, 'SubspaceManager');
//# sourceMappingURL=SubspaceManager.js.map