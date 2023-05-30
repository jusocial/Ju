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
exports.createUpdateAppInstruction = exports.updateAppInstructionDiscriminator = exports.updateAppStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const AppData_1 = require("../types/AppData");
exports.updateAppStruct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['data', AppData_1.appDataBeet],
], 'UpdateAppInstructionArgs');
exports.updateAppInstructionDiscriminator = [126, 189, 95, 214, 18, 25, 42, 176];
function createUpdateAppInstruction(accounts, args, programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
    var _a;
    const [data] = exports.updateAppStruct.serialize({
        instructionDiscriminator: exports.updateAppInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: accounts.app,
            isWritable: true,
            isSigner: false,
        },
    ];
    if (accounts.registeringProcessorPda != null) {
        keys.push({
            pubkey: accounts.registeringProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.connectingProcessorPda != null) {
        if (accounts.registeringProcessorPda == null) {
            throw new Error("When providing 'connectingProcessorPda' then 'accounts.registeringProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.connectingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.publishingProcessorPda != null) {
        if (accounts.registeringProcessorPda == null || accounts.connectingProcessorPda == null) {
            throw new Error("When providing 'publishingProcessorPda' then 'accounts.registeringProcessorPda', 'accounts.connectingProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.publishingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.collectingProcessorPda != null) {
        if (accounts.registeringProcessorPda == null ||
            accounts.connectingProcessorPda == null ||
            accounts.publishingProcessorPda == null) {
            throw new Error("When providing 'collectingProcessorPda' then 'accounts.registeringProcessorPda', 'accounts.connectingProcessorPda', 'accounts.publishingProcessorPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.collectingProcessorPda,
            isWritable: false,
            isSigner: false,
        });
    }
    if (accounts.referencingProcessorPda != null) {
        if (accounts.registeringProcessorPda == null ||
            accounts.connectingProcessorPda == null ||
            accounts.publishingProcessorPda == null ||
            accounts.collectingProcessorPda == null) {
            throw new Error("When providing 'referencingProcessorPda' then 'accounts.registeringProcessorPda', 'accounts.connectingProcessorPda', 'accounts.publishingProcessorPda', 'accounts.collectingProcessorPda' need(s) to be provided as well.");
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
exports.createUpdateAppInstruction = createUpdateAppInstruction;
//# sourceMappingURL=updateApp.js.map