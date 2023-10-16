/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
export type CollectionItemArgs = {
    app: web3.PublicKey;
    initializer: web3.PublicKey;
    target: web3.PublicKey;
    authority: web3.PublicKey;
    createdAt: beet.bignum;
    searchable3Day: beet.bignum;
    searchableDay: beet.bignum;
};
export declare const collectionItemDiscriminator: number[];
export declare class CollectionItem implements CollectionItemArgs {
    readonly app: web3.PublicKey;
    readonly initializer: web3.PublicKey;
    readonly target: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly createdAt: beet.bignum;
    readonly searchable3Day: beet.bignum;
    readonly searchableDay: beet.bignum;
    private constructor();
    static fromArgs(args: CollectionItemArgs): CollectionItem;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [CollectionItem, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<CollectionItem>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        app: any;
        authority: any;
        accountDiscriminator: any;
        initializer: any;
        target: any;
        createdAt: any;
        searchable3Day: any;
        searchableDay: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [CollectionItem, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        app: string;
        initializer: string;
        target: string;
        authority: string;
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
export declare const collectionItemBeet: beet.BeetStruct<CollectionItem, CollectionItemArgs & {
    accountDiscriminator: number[];
}>;
