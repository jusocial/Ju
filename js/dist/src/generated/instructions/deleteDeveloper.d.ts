import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const deleteDeveloperStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type DeleteDeveloperInstructionAccounts = {
    developer: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deleteDeveloperInstructionDiscriminator: number[];
export declare function createDeleteDeveloperInstruction(accounts: DeleteDeveloperInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
