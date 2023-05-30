import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const deletePublicationStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type DeletePublicationInstructionAccounts = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    publication: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deletePublicationInstructionDiscriminator: number[];
export declare function createDeletePublicationInstruction(accounts: DeletePublicationInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
