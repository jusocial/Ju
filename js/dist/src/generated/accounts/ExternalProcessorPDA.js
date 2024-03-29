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
exports.externalProcessorPDABeet = exports.ExternalProcessorPDA = exports.externalProcessorPDADiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const ProcessorType_1 = require("../types/ProcessorType");
exports.externalProcessorPDADiscriminator = [204, 224, 184, 182, 78, 32, 108, 104];
class ExternalProcessorPDA {
    constructor(processorType, isApproved, authority, programAddress, developerWallet, processorName, metadataUri, createdAt) {
        this.processorType = processorType;
        this.isApproved = isApproved;
        this.authority = authority;
        this.programAddress = programAddress;
        this.developerWallet = developerWallet;
        this.processorName = processorName;
        this.metadataUri = metadataUri;
        this.createdAt = createdAt;
    }
    static fromArgs(args) {
        return new ExternalProcessorPDA(args.processorType, args.isApproved, args.authority, args.programAddress, args.developerWallet, args.processorName, args.metadataUri, args.createdAt);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return ExternalProcessorPDA.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find ExternalProcessorPDA account at ${address}`);
        }
        return ExternalProcessorPDA.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.externalProcessorPDABeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.externalProcessorPDABeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.externalProcessorPDABeet.serialize({
            accountDiscriminator: exports.externalProcessorPDADiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = ExternalProcessorPDA.fromArgs(args);
        return exports.externalProcessorPDABeet.toFixedFromValue({
            accountDiscriminator: exports.externalProcessorPDADiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(ExternalProcessorPDA.byteSize(args), commitment);
    }
    pretty() {
        return {
            processorType: 'ProcessorType.' + ProcessorType_1.ProcessorType[this.processorType],
            isApproved: this.isApproved,
            authority: this.authority.toBase58(),
            programAddress: this.programAddress.toBase58(),
            developerWallet: this.developerWallet,
            processorName: this.processorName,
            metadataUri: this.metadataUri,
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
exports.ExternalProcessorPDA = ExternalProcessorPDA;
exports.externalProcessorPDABeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['processorType', ProcessorType_1.processorTypeBeet],
    ['isApproved', beet.bool],
    ['authority', beetSolana.publicKey],
    ['programAddress', beetSolana.publicKey],
    ['developerWallet', beet.coption(beetSolana.publicKey)],
    ['processorName', beet.utf8String],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['createdAt', beet.i64],
], ExternalProcessorPDA.fromArgs, 'ExternalProcessorPDA');
//# sourceMappingURL=ExternalProcessorPDA.js.map