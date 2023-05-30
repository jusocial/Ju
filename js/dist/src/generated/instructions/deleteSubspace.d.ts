import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const deleteSubspaceStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type DeleteSubspaceInstructionAccounts = {
    app: web3.PublicKey;
    subspace: web3.PublicKey;
    aliasPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deleteSubspaceInstructionDiscriminator: number[];
export declare function createDeleteSubspaceInstruction(accounts: DeleteSubspaceInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
