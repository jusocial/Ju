import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { PublicationData } from '../types/PublicationData';
export type UpdatePublicationInstructionArgs = {
    data: PublicationData;
};
export declare const updatePublicationStruct: beet.FixableBeetArgsStruct<UpdatePublicationInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type UpdatePublicationInstructionAccounts = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    publication: web3.PublicKey;
    collectingProcessorPda?: web3.PublicKey;
    referencingProcessorPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const updatePublicationInstructionDiscriminator: number[];
export declare function createUpdatePublicationInstruction(accounts: UpdatePublicationInstructionAccounts, args: UpdatePublicationInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
