import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { PublicationData } from '../types/PublicationData';
export type CreatePublicationInstructionArgs = {
    data: PublicationData;
    externalProcessingData: beet.COption<string>;
};
export declare const createPublicationStruct: beet.FixableBeetArgsStruct<CreatePublicationInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type CreatePublicationInstructionAccounts = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    publication: web3.PublicKey;
    subspace?: web3.PublicKey;
    targetPublication?: web3.PublicKey;
    collectingProcessorPda?: web3.PublicKey;
    referencingProcessorPda?: web3.PublicKey;
    publishingProcessor?: web3.PublicKey;
    referencingProcessor?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const createPublicationInstructionDiscriminator: number[];
export declare function createCreatePublicationInstruction(accounts: CreatePublicationInstructionAccounts, args: CreatePublicationInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
