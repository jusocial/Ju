/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ReactionTargetType } from '../types/ReactionTargetType';
import { ReactionType } from '../types/ReactionType';
export type ReactionArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    targetType: ReactionTargetType;
    target: web3.PublicKey;
    initializer: web3.PublicKey;
    createdAt: beet.bignum;
    creationWeek: beet.bignum;
    creation3Day: beet.bignum;
    creationDay: beet.bignum;
    reactionType: ReactionType;
};
export declare const reactionDiscriminator: number[];
export declare class Reaction implements ReactionArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly targetType: ReactionTargetType;
    readonly target: web3.PublicKey;
    readonly initializer: web3.PublicKey;
    readonly createdAt: beet.bignum;
    readonly creationWeek: beet.bignum;
    readonly creation3Day: beet.bignum;
    readonly creationDay: beet.bignum;
    readonly reactionType: ReactionType;
    private constructor();
    static fromArgs(args: ReactionArgs): Reaction;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Reaction, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Reaction>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<ReactionArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Reaction, number];
    serialize(): [Buffer, number];
    static byteSize(args: ReactionArgs): number;
    static getMinimumBalanceForRentExemption(args: ReactionArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        app: string;
        authority: string;
        targetType: string;
        target: string;
        initializer: string;
        createdAt: number | {
            toNumber: () => number;
        };
        creationWeek: number | {
            toNumber: () => number;
        };
        creation3Day: number | {
            toNumber: () => number;
        };
        creationDay: number | {
            toNumber: () => number;
        };
        reactionType: "UpVote" | "DownVote" | "CustomVote";
    };
}
export declare const reactionBeet: beet.FixableBeetStruct<Reaction, ReactionArgs & {
    accountDiscriminator: number[];
}>;
