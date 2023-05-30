import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { SubspaceData } from '../types/SubspaceData';
export type CreateSubspaceInstructionArgs = {
    data: SubspaceData;
};
export declare const createSubspaceStruct: beet.FixableBeetArgsStruct<CreateSubspaceInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type CreateSubspaceInstructionAccounts = {
    app: web3.PublicKey;
    creatorProfile: web3.PublicKey;
    subspace: web3.PublicKey;
    aliasPda?: web3.PublicKey;
    connectingProcessorPda?: web3.PublicKey;
    publishingProcessorPda?: web3.PublicKey;
    collectingProcessorPda?: web3.PublicKey;
    referencingProcessorPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const createSubspaceInstructionDiscriminator: number[];
export declare function createCreateSubspaceInstruction(accounts: CreateSubspaceInstructionAccounts, args: CreateSubspaceInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
