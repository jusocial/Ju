/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ReactionType } from '../types/ReactionType';
export type ReactionArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    initializerProfile: web3.PublicKey;
    target: web3.PublicKey;
    reactionType: ReactionType;
    createdAt: beet.bignum;
};
export declare const reactionDiscriminator: number[];
export declare class Reaction implements ReactionArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly initializerProfile: web3.PublicKey;
    readonly target: web3.PublicKey;
    readonly reactionType: ReactionType;
    readonly createdAt: beet.bignum;
    private constructor();
    static fromArgs(args: ReactionArgs): Reaction;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Reaction, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Reaction>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        app: any;
        authority: any;
        accountDiscriminator: any;
        target: any;
        createdAt: any;
        initializerProfile: any;
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
        initializerProfile: string;
        target: string;
        reactionType: string;
        createdAt: number | {
            toNumber: () => number;
        };
    };
}
export declare const reactionBeet: beet.BeetStruct<Reaction, ReactionArgs & {
    accountDiscriminator: number[];
}>;
