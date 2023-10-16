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
exports.createUpdateSubspaceManagerInstruction = exports.updateSubspaceManagerInstructionDiscriminator = exports.updateSubspaceManagerStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const SubspaceManagementRoleType_1 = require("../types/SubspaceManagementRoleType");
exports.updateSubspaceManagerStruct = new beet.BeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['managerRole', SubspaceManagementRoleType_1.subspaceManagementRoleTypeBeet],
], 'UpdateSubspaceManagerInstructionArgs');
exports.updateSubspaceManagerInstructionDiscriminator = [136, 71, 38, 167, 153, 20, 214, 153];
function createUpdateSubspaceManagerInstruction(accounts, args, programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
    var _a;
    const [data] = exports.updateSubspaceManagerStruct.serialize({
        instructionDiscriminator: exports.updateSubspaceManagerInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: accounts.app,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.subspace,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.profile,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.connectionProof,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.manager,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.authority,
            isWritable: true,
            isSigner: true,
        },
        {
            pubkey: (_a = accounts.systemProgram) !== null && _a !== void 0 ? _a : web3.SystemProgram.programId,
            isWritable: false,
            isSigner: false,
        },
    ];
    const ix = new web3.TransactionInstruction({
        programId,
        keys,
        data,
    });
    return ix;
}
exports.createUpdateSubspaceManagerInstruction = createUpdateSubspaceManagerInstruction;
//# sourceMappingURL=updateSubspaceManager.js.map