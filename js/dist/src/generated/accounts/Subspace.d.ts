/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
export type SubspaceArgs = {
    uuid: string;
    app: web3.PublicKey;
    authority: web3.PublicKey;
    creator: web3.PublicKey;
    alias: beet.COption<string>;
    metadataUri: string;
    publishingProcessor: beet.COption<web3.PublicKey>;
    connectingProcessor: beet.COption<web3.PublicKey>;
    collectingProcessor: beet.COption<web3.PublicKey>;
    referencingProcessor: beet.COption<web3.PublicKey>;
};
export declare const subspaceDiscriminator: number[];
export declare class Subspace implements SubspaceArgs {
    readonly uuid: string;
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly creator: web3.PublicKey;
    readonly alias: beet.COption<string>;
    readonly metadataUri: string;
    readonly publishingProcessor: beet.COption<web3.PublicKey>;
    readonly connectingProcessor: beet.COption<web3.PublicKey>;
    readonly collectingProcessor: beet.COption<web3.PublicKey>;
    readonly referencingProcessor: beet.COption<web3.PublicKey>;
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
        uuid: string;
        app: string;
        authority: string;
        creator: string;
        alias: beet.COption<string>;
        metadataUri: string;
        publishingProcessor: beet.COption<web3.PublicKey>;
        connectingProcessor: beet.COption<web3.PublicKey>;
        collectingProcessor: beet.COption<web3.PublicKey>;
        referencingProcessor: beet.COption<web3.PublicKey>;
    };
}
export declare const subspaceBeet: beet.FixableBeetStruct<Subspace, SubspaceArgs & {
    accountDiscriminator: number[];
}>;
