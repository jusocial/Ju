import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const addDeveloperStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type AddDeveloperInstructionAccounts = {
    developer: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const addDeveloperInstructionDiscriminator: number[];
export declare function createAddDeveloperInstruction(accounts: AddDeveloperInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
