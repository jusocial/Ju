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
exports.createCreatePublicationInstruction = exports.createPublicationInstructionDiscriminator = exports.createPublicationStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const PublicationData_1 = require("../types/PublicationData");
exports.createPublicationStruct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['uuid', beet.utf8String],
    ['data', PublicationData_1.publicationDataBeet],
    ['externalProcessingData', beet.coption(beet.utf8String)],
], 'CreatePublicationInstructionArgs');
exports.createPublicationInstructionDiscriminator = [8, 172, 15, 160, 253, 31, 51, 212];
function createCreatePublicationInstruction(accounts, args, programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
    var _a;
    const [data] = exports.createPublicationStruct.serialize({
        instructionDiscriminator: exports.createPublicationInstructionDiscriminator,
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
            pubkey: accounts.publication,
            isWritable: true,
            isSigner: false,
        },
    ];
    if (accounts.subspace != null) {
        keys.push({
            pubkey: accounts.subspace,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.targetPublication != null) {
        if (accounts.subspace == null) {
            throw new Error("When providing 'targetPublication' then 'accounts.subspace' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.targetPublication,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.connectionProof != null) {
        if (accounts.subspace == null || accounts.targetPublication == null) {
            throw new Error("When providing 'connectionProof' then 'accounts.subspace', 'accounts.targetPublication' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.connectionProof,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.subspaceManagerProof != null) {
        if (accounts.subspace == null ||
            accounts.targetPublication == null ||
            accounts.connectionProof == null) {
            throw new Error("When providing 'subspaceManagerProof' then 'accounts.subspace', 'accounts.targetPublication', 'accounts.connectionProof' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.subspaceManagerProof,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.collectingProcessorPda != null) {
        if (accounts.subspace == null ||
            accounts.targetPublication == null ||
            accounts.connectionProof == null ||
            accounts.subspaceManagerProof == null) {
            throw new Error("When providing 'collectingProcessorPda' then 'accounts.subspace', 'accounts.targetPublication', 'accounts.connectionProof', 'accounts.subspaceManagerProof' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.collectingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.referencingProcessorPda != null) {
        if (accounts.subspace == null ||
            accounts.targetPublication == null ||
            accounts.connectionProof == null ||
            accounts.subspaceManagerProof == null ||
            accounts.collectingProcessorPda == null) {
            throw new Error("When providing 'referencingProcessorPda' then 'accounts.subspace', 'accounts.targetPublication', 'accounts.connectionProof', 'accounts.subspaceManagerProof', 'accounts.collectingProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.referencingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.publishingProcessor != null) {
        if (accounts.subspace == null ||
            accounts.targetPublication == null ||
            accounts.connectionProof == null ||
            accounts.subspaceManagerProof == null ||
            accounts.collectingProcessorPda == null ||
            accounts.referencingProcessorPda == null) {
            throw new Error("When providing 'publishingProcessor' then 'accounts.subspace', 'accounts.targetPublication', 'accounts.connectionProof', 'accounts.subspaceManagerProof', 'accounts.collectingProcessorPda', 'accounts.referencingProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.publishingProcessor,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.referencingProcessor != null) {
        if (accounts.subspace == null ||
            accounts.targetPublication == null ||
            accounts.connectionProof == null ||
            accounts.subspaceManagerProof == null ||
            accounts.collectingProcessorPda == null ||
            accounts.referencingProcessorPda == null ||
            accounts.publishingProcessor == null) {
            throw new Error("When providing 'referencingProcessor' then 'accounts.subspace', 'accounts.targetPublication', 'accounts.connectionProof', 'accounts.subspaceManagerProof', 'accounts.collectingProcessorPda', 'accounts.referencingProcessorPda', 'accounts.publishingProcessor' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.referencingProcessor,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.referencingProcessorIndividual != null) {
        if (accounts.subspace == null ||
            accounts.targetPublication == null ||
            accounts.connectionProof == null ||
            accounts.subspaceManagerProof == null ||
            accounts.collectingProcessorPda == null ||
            accounts.referencingProcessorPda == null ||
            accounts.publishingProcessor == null ||
            accounts.referencingProcessor == null) {
            throw new Error("When providing 'referencingProcessorIndividual' then 'accounts.subspace', 'accounts.targetPublication', 'accounts.connectionProof', 'accounts.subspaceManagerProof', 'accounts.collectingProcessorPda', 'accounts.referencingProcessorPda', 'accounts.publishingProcessor', 'accounts.referencingProcessor' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.referencingProcessorIndividual,
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
exports.createCreatePublicationInstruction = createCreatePublicationInstruction;
//# sourceMappingURL=createPublication.js.map