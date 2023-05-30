import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import { ProcessorType } from '../types/ProcessorType';
export type AddProcessorInstructionArgs = {
    processorType: ProcessorType;
    processorName: string;
    programAddress: web3.PublicKey;
    developerWallet: beet.COption<web3.PublicKey>;
};
export declare const addProcessorStruct: beet.FixableBeetArgsStruct<AddProcessorInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type AddProcessorInstructionAccounts = {
    processorPda: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const addProcessorInstructionDiscriminator: number[];
export declare function createAddProcessorInstruction(accounts: AddProcessorInstructionAccounts, args: AddProcessorInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
