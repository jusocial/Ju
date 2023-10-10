import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { ProfileData } from '../types/ProfileData';
export type CreateProfileInstructionArgs = {
    data: ProfileData;
    externalProcessingData: beet.COption<string>;
};
export declare const createProfileStruct: beet.FixableBeetArgsStruct<CreateProfileInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type CreateProfileInstructionAccounts = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    aliasPda?: web3.PublicKey;
    connectingProcessorPda?: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const createProfileInstructionDiscriminator: number[];
export declare function createCreateProfileInstruction(accounts: CreateProfileInstructionAccounts, args: CreateProfileInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
