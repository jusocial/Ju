import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type InitializeConnectionInstructionArgs = {
    externalProcessingData: beet.COption<string>;
};
export declare const initializeConnectionStruct: beet.FixableBeetArgsStruct<InitializeConnectionInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type InitializeConnectionInstructionAccounts = {
    app: web3.PublicKey;
    connection: web3.PublicKey;
    initializer: web3.PublicKey;
    target: web3.PublicKey;
    connectingProcessor?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const initializeConnectionInstructionDiscriminator: number[];
export declare function createInitializeConnectionInstruction(accounts: InitializeConnectionInstructionAccounts, args: InitializeConnectionInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
