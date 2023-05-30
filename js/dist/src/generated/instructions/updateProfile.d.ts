import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { ProfileData } from '../types/ProfileData';
export type UpdateProfileInstructionArgs = {
    data: ProfileData;
};
export declare const updateProfileStruct: beet.FixableBeetArgsStruct<UpdateProfileInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type UpdateProfileInstructionAccounts = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    currentAliasPda?: web3.PublicKey;
    newAliasPda?: web3.PublicKey;
    connectingProcessorPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const updateProfileInstructionDiscriminator: number[];
export declare function createUpdateProfileInstruction(accounts: UpdateProfileInstructionAccounts, args: UpdateProfileInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
