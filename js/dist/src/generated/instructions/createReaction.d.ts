import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { ReactionType } from '../types/ReactionType';
export type CreateReactionInstructionArgs = {
    reactionType: ReactionType;
};
export declare const createReactionStruct: beet.FixableBeetArgsStruct<CreateReactionInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type CreateReactionInstructionAccounts = {
    app: web3.PublicKey;
    initializer: web3.PublicKey;
    target: web3.PublicKey;
    reaction: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const createReactionInstructionDiscriminator: number[];
export declare function createCreateReactionInstruction(accounts: CreateReactionInstructionAccounts, args: CreateReactionInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
