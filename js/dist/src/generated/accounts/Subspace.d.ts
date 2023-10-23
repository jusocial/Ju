/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { SubspacePublishingPermissionLevel } from '../types/SubspacePublishingPermissionLevel';
export type SubspaceArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    exchangeKey: web3.PublicKey;
    creator: web3.PublicKey;
    publishingPermission: SubspacePublishingPermissionLevel;
    name: number[];
    reserved1: number;
    reserved2: number;
    reserved3: number;
    reserved4: number;
    reserved5: number[];
    reserved6: number[];
    creationYear: beet.bignum;
    creationMonth: beet.bignum;
    creationWeek: beet.bignum;
    creationDay: beet.bignum;
    alias: beet.COption<string>;
    uuid: string;
    metadataUri: beet.COption<string>;
    publishingProcessor: beet.COption<web3.PublicKey>;
    connectingProcessor: beet.COption<web3.PublicKey>;
    collectingProcessor: beet.COption<web3.PublicKey>;
    referencingProcessor: beet.COption<web3.PublicKey>;
    createdAt: beet.bignum;
};
export declare const subspaceDiscriminator: number[];
export declare class Subspace implements SubspaceArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly exchangeKey: web3.PublicKey;
    readonly creator: web3.PublicKey;
    readonly publishingPermission: SubspacePublishingPermissionLevel;
    readonly name: number[];
    readonly reserved1: number;
    readonly reserved2: number;
    readonly reserved3: number;
    readonly reserved4: number;
    readonly reserved5: number[];
    readonly reserved6: number[];
    readonly creationYear: beet.bignum;
    readonly creationMonth: beet.bignum;
    readonly creationWeek: beet.bignum;
    readonly creationDay: beet.bignum;
    readonly alias: beet.COption<string>;
    readonly uuid: string;
    readonly metadataUri: beet.COption<string>;
    readonly publishingProcessor: beet.COption<web3.PublicKey>;
    readonly connectingProcessor: beet.COption<web3.PublicKey>;
    readonly collectingProcessor: beet.COption<web3.PublicKey>;
    readonly referencingProcessor: beet.COption<web3.PublicKey>;
    readonly createdAt: beet.bignum;
    private constructor();
    static fromArgs(args: SubspaceArgs): Subspace;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Subspace, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Subspace>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<SubspaceArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Subspace, number];
    serialize(): [Buffer, number];
    static byteSize(args: SubspaceArgs): number;
    static getMinimumBalanceForRentExemption(args: SubspaceArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        app: string;
        authority: string;
        exchangeKey: string;
        creator: string;
        publishingPermission: string;
        name: number[];
        reserved1: number;
        reserved2: number;
        reserved3: number;
        reserved4: number;
        reserved5: number[];
        reserved6: number[];
        creationYear: number | {
            toNumber: () => number;
        };
        creationMonth: number | {
            toNumber: () => number;
        };
        creationWeek: number | {
            toNumber: () => number;
        };
        creationDay: number | {
            toNumber: () => number;
        };
        alias: beet.COption<string>;
        uuid: string;
        metadataUri: beet.COption<string>;
        publishingProcessor: beet.COption<web3.PublicKey>;
        connectingProcessor: beet.COption<web3.PublicKey>;
        collectingProcessor: beet.COption<web3.PublicKey>;
        referencingProcessor: beet.COption<web3.PublicKey>;
        createdAt: number | {
            toNumber: () => number;
        };
    };
}
export declare const subspaceBeet: beet.FixableBeetStruct<Subspace, SubspaceArgs & {
    accountDiscriminator: number[];
}>;
