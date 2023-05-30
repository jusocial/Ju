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
exports.createUpdateSubspaceInstruction = exports.updateSubspaceInstructionDiscriminator = exports.updateSubspaceStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const SubspaceData_1 = require("../types/SubspaceData");
exports.updateSubspaceStruct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['data', SubspaceData_1.subspaceDataBeet],
], 'UpdateSubspaceInstructionArgs');
exports.updateSubspaceInstructionDiscriminator = [68, 66, 37, 238, 181, 13, 57, 20];
function createUpdateSubspaceInstruction(accounts, args, programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
    var _a;
    const [data] = exports.updateSubspaceStruct.serialize({
        instructionDiscriminator: exports.updateSubspaceInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: accounts.app,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.profile,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.subspace,
            isWritable: true,
            isSigner: false,
        },
    ];
    if (accounts.currentAliasPda != null) {
        keys.push({
            pubkey: accounts.currentAliasPda,
            isWritable: true,
            isSigner: false,
        });
    }
    if (accounts.newAliasPda != null) {
        if (accounts.currentAliasPda == null) {
            throw new Error("When providing 'newAliasPda' then 'accounts.currentAliasPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.newAliasPda,
            isWritable: true,
            isSigner: false,
        });
    }
    if (accounts.connectingProcessorPda != null) {
        if (accounts.currentAliasPda == null || accounts.newAliasPda == null) {
            throw new Error("When providing 'connectingProcessorPda' then 'accounts.currentAliasPda', 'accounts.newAliasPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.connectingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.publishingProcessorPda != null) {
        if (accounts.currentAliasPda == null ||
            accounts.newAliasPda == null ||
            accounts.connectingProcessorPda == null) {
            throw new Error("When providing 'publishingProcessorPda' then 'accounts.currentAliasPda', 'accounts.newAliasPda', 'accounts.connectingProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.publishingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.collectingProcessorPda != null) {
        if (accounts.currentAliasPda == null ||
            accounts.newAliasPda == null ||
            accounts.connectingProcessorPda == null ||
            accounts.publishingProcessorPda == null) {
            throw new Error("When providing 'collectingProcessorPda' then 'accounts.currentAliasPda', 'accounts.newAliasPda', 'accounts.connectingProcessorPda', 'accounts.publishingProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.collectingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.referencingProcessorPda != null) {
        if (accounts.currentAliasPda == null ||
            accounts.newAliasPda == null ||
            accounts.connectingProcessorPda == null ||
            accounts.publishingProcessorPda == null ||
            accounts.collectingProcessorPda == null) {
            throw new Error("When providing 'referencingProcessorPda' then 'accounts.currentAliasPda', 'accounts.newAliasPda', 'accounts.connectingProcessorPda', 'accounts.publishingProcessorPda', 'accounts.collectingProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.referencingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    keys.push({
        pubkey: accounts.authority,
        isWritable: true,
        isSigner: true,
    });
    keys.push({
        pubkey: (_a = accounts.systemProgram) !== null && _a !== void 0 ? _a : web3.SystemProgram.programId,
        isWritable: false,
        isSigner: false,
    });
    const ix = new web3.TransactionInstruction({
        programId,
        keys,
        data,
    });
    return ix;
}
exports.createUpdateSubspaceInstruction = createUpdateSubspaceInstruction;
//# sourceMappingURL=updateSubspace.js.map