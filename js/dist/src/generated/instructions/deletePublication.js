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
exports.createDeletePublicationInstruction = exports.deletePublicationInstructionDiscriminator = exports.deletePublicationStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
exports.deletePublicationStruct = new beet.BeetArgsStruct([['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]], 'DeletePublicationInstructionArgs');
exports.deletePublicationInstructionDiscriminator = [37, 21, 191, 39, 192, 32, 129, 201];
function createDeletePublicationInstruction(accounts, programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
    var _a;
    const [data] = exports.deletePublicationStruct.serialize({
        instructionDiscriminator: exports.deletePublicationInstructionDiscriminator,
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
exports.createDeletePublicationInstruction = createDeletePublicationInstruction;
//# sourceMappingURL=deletePublication.js.map