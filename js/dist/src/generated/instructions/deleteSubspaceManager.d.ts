import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const deleteSubspaceManagerStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type DeleteSubspaceManagerInstructionAccounts = {
    app: web3.PublicKey;
    subspace: web3.PublicKey;
    profile: web3.PublicKey;
    manager: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deleteSubspaceManagerInstructionDiscriminator: number[];
export declare function createDeleteSubspaceManagerInstruction(accounts: DeleteSubspaceManagerInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
