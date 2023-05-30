import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { SubspaceData } from '../types/SubspaceData';
export type UpdateSubspaceInstructionArgs = {
    data: SubspaceData;
};
export declare const updateSubspaceStruct: beet.FixableBeetArgsStruct<UpdateSubspaceInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type UpdateSubspaceInstructionAccounts = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    subspace: web3.PublicKey;
    currentAliasPda?: web3.PublicKey;
    newAliasPda?: web3.PublicKey;
    connectingProcessorPda?: web3.PublicKey;
    publishingProcessorPda?: web3.PublicKey;
    collectingProcessorPda?: web3.PublicKey;
    referencingProcessorPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const updateSubspaceInstructionDiscriminator: number[];
export declare function createUpdateSubspaceInstruction(accounts: UpdateSubspaceInstructionAccounts, args: UpdateSubspaceInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
