import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type UpdateConnectionInstructionArgs = {
    approveStatus: boolean;
};
export declare const updateConnectionStruct: beet.BeetArgsStruct<UpdateConnectionInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type UpdateConnectionInstructionAccounts = {
    app: web3.PublicKey;
    connection: web3.PublicKey;
    initializer: web3.PublicKey;
    target: web3.PublicKey;
    user: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const updateConnectionInstructionDiscriminator: number[];
export declare function createUpdateConnectionInstruction(accounts: UpdateConnectionInstructionAccounts, args: UpdateConnectionInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
