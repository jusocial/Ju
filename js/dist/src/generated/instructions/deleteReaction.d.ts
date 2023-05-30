import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const deleteReactionStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type DeleteReactionInstructionAccounts = {
    app: web3.PublicKey;
    target: web3.PublicKey;
    initializerProfile: web3.PublicKey;
    reaction: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deleteReactionInstructionDiscriminator: number[];
export declare function createDeleteReactionInstruction(accounts: DeleteReactionInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
