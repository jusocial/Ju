/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
export type AppArgs = {
    appName: string;
    authority: web3.PublicKey;
    metadataUri: string;
    registeringProcessor: beet.COption<web3.PublicKey>;
    connectingProcessor: beet.COption<web3.PublicKey>;
    publishingProcessor: beet.COption<web3.PublicKey>;
    collectingProcessor: beet.COption<web3.PublicKey>;
    referencingProcessor: beet.COption<web3.PublicKey>;
};
export declare const appDiscriminator: number[];
export declare class App implements AppArgs {
    readonly appName: string;
    readonly authority: web3.PublicKey;
    readonly metadataUri: string;
    readonly registeringProcessor: beet.COption<web3.PublicKey>;
    readonly connectingProcessor: beet.COption<web3.PublicKey>;
    readonly publishingProcessor: beet.COption<web3.PublicKey>;
    readonly collectingProcessor: beet.COption<web3.PublicKey>;
    readonly referencingProcessor: beet.COption<web3.PublicKey>;
    private constructor();
    static fromArgs(args: AppArgs): App;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [App, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<App>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<AppArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [App, number];
    serialize(): [Buffer, number];
    static byteSize(args: AppArgs): number;
    static getMinimumBalanceForRentExemption(args: AppArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        appName: string;
        authority: string;
        metadataUri: string;
        registeringProcessor: beet.COption<web3.PublicKey>;
        connectingProcessor: beet.COption<web3.PublicKey>;
        publishingProcessor: beet.COption<web3.PublicKey>;
        collectingProcessor: beet.COption<web3.PublicKey>;
        referencingProcessor: beet.COption<web3.PublicKey>;
    };
}
export declare const appBeet: beet.FixableBeetStruct<App, AppArgs & {
    accountDiscriminator: number[];
}>;
