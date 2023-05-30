import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { AppData } from '../types/AppData';
export type UpdateAppInstructionArgs = {
    data: AppData;
};
export declare const updateAppStruct: beet.FixableBeetArgsStruct<UpdateAppInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type UpdateAppInstructionAccounts = {
    app: web3.PublicKey;
    registeringProcessorPda?: web3.PublicKey;
    connectingProcessorPda?: web3.PublicKey;
    publishingProcessorPda?: web3.PublicKey;
    collectingProcessorPda?: web3.PublicKey;
    referencingProcessorPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const updateAppInstructionDiscriminator: number[];
export declare function createUpdateAppInstruction(accounts: UpdateAppInstructionAccounts, args: UpdateAppInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
