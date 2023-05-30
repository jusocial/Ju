import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const deleteProfileStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export type DeleteProfileInstructionAccounts = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    aliasPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const deleteProfileInstructionDiscriminator: number[];
export declare function createDeleteProfileInstruction(accounts: DeleteProfileInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
