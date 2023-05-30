import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const deleteConnectionStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type DeleteConnectionInstructionAccounts = {
    app: web3.PublicKey;
    connection: web3.PublicKey;
    initializerProfile: web3.PublicKey;
    target: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deleteConnectionInstructionDiscriminator: number[];
export declare function createDeleteConnectionInstruction(accounts: DeleteConnectionInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
