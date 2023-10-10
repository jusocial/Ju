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
exports.createCreateProfileInstruction = exports.createProfileInstructionDiscriminator = exports.createProfileStruct = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const ProfileData_1 = require("../types/ProfileData");
exports.createProfileStruct = new beet.FixableBeetArgsStruct([
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['data', ProfileData_1.profileDataBeet],
    ['externalProcessingData', beet.coption(beet.utf8String)],
], 'CreateProfileInstructionArgs');
exports.createProfileInstructionDiscriminator = [225, 205, 234, 143, 17, 186, 50, 220];
function createCreateProfileInstruction(accounts, args, programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
    var _a;
    const [data] = exports.createProfileStruct.serialize({
        instructionDiscriminator: exports.createProfileInstructionDiscriminator,
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
            isWritable: true,
            isSigner: false,
        },
    ];
    if (accounts.aliasPda != null) {
        keys.push({
            pubkey: accounts.aliasPda,
            isWritable: true,
            isSigner: false,
        });
    }
    if (accounts.connectingProcessorPda != null) {
        if (accounts.aliasPda == null) {
            throw new Error("When providing 'connectingProcessorPda' then 'accounts.aliasPda' need(s) to be provided as well.");
        }
        keys.push({
            pubkey: accounts.connectingProcessorPda,
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
exports.createCreateProfileInstruction = createCreateProfileInstruction;
//# sourceMappingURL=createProfile.js.map