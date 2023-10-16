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
    reactionType: ReactionType;
    createdAt: beet.bignum;
    searchable3Day: beet.bignum;
    searchableDay: beet.bignum;
};
export declare const reactionDiscriminator: number[];
export declare class Reaction implements ReactionArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly targetType: ReactionTargetType;
    readonly target: web3.PublicKey;
    readonly initializer: web3.PublicKey;
    readonly reactionType: ReactionType;
    readonly createdAt: beet.bignum;
    readonly searchable3Day: beet.bignum;
    readonly searchableDay: beet.bignum;
    private constructor();
    static fromArgs(args: ReactionArgs): Reaction;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Reaction, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Reaction>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        app: any;
        authority: any;
        accountDiscriminator: any;
        initializer: any;
        target: any;
        createdAt: any;
        searchable3Day: any;
        searchableDay: any;
        targetType: any;
        reactionType: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [Reaction, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        app: string;
        authority: string;
        targetType: string;
        target: string;
        initializer: string;
        reactionType: string;
        createdAt: number | {
            toNumber: () => number;
        };
        searchable3Day: number | {
            toNumber: () => number;
        };
        searchableDay: number | {
            toNumber: () => number;
        };
    };
}
export declare const reactionBeet: beet.BeetStruct<Reaction, ReactionArgs & {
    accountDiscriminator: number[];
}>;
