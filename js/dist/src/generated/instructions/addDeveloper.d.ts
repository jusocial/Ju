import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export type AddDeveloperInstructionArgs = {
    developer: web3.PublicKey;
};
export declare const addDeveloperStruct: beet.BeetArgsStruct<AddDeveloperInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type AddDeveloperInstructionAccounts = {
    developerWhitelistProof: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const addDeveloperInstructionDiscriminator: number[];
export declare function createAddDeveloperInstruction(accounts: AddDeveloperInstructionAccounts, args: AddDeveloperInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
