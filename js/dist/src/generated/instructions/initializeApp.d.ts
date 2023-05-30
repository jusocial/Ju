import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { AppData } from '../types/AppData';
export type InitializeAppInstructionArgs = {
    appName: string;
    data: AppData;
};
export declare const initializeAppStruct: beet.FixableBeetArgsStruct<InitializeAppInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type InitializeAppInstructionAccounts = {
    app: web3.PublicKey;
    registeringProcessorPda?: web3.PublicKey;
    connectingProcessorPda?: web3.PublicKey;
    publishingProcessorPda?: web3.PublicKey;
    collectingProcessorPda?: web3.PublicKey;
    referencingProcessorPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const initializeAppInstructionDiscriminator: number[];
export declare function createInitializeAppInstruction(accounts: InitializeAppInstructionAccounts, args: InitializeAppInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
