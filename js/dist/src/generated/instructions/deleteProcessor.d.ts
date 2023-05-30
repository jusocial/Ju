import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
export type DeleteProcessorInstructionArgs = {
    programAddress: web3.PublicKey;
};
export declare const deleteProcessorStruct: beet.BeetArgsStruct<DeleteProcessorInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type DeleteProcessorInstructionAccounts = {
    processor: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deleteProcessorInstructionDiscriminator: number[];
export declare function createDeleteProcessorInstruction(accounts: DeleteProcessorInstructionAccounts, args: DeleteProcessorInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
