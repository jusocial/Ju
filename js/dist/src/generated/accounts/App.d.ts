/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
export type AppArgs = {
    authority: web3.PublicKey;
    isProfileDeleteAllowed: boolean;
    isSubspaceDeleteAllowed: boolean;
    isPublicationDeleteAllowed: boolean;
    isProfileIndividualProcessorsAllowed: boolean;
    isSubspaceIndividualProcessorsAllowed: boolean;
    isPublicationIndividualProcessorsAllowed: boolean;
    reserved1: number;
    reserved2: number;
    reserved3: number;
    reserved4: number;
    reserved5: web3.PublicKey;
    reserved6: web3.PublicKey;
    creationYear: beet.bignum;
    creationMonth: beet.bignum;
    appDomainName: string;
    metadataUri: beet.COption<string>;
    registeringProcessor: beet.COption<web3.PublicKey>;
    connectingProcessor: beet.COption<web3.PublicKey>;
    publishingProcessor: beet.COption<web3.PublicKey>;
    collectingProcessor: beet.COption<web3.PublicKey>;
    referencingProcessor: beet.COption<web3.PublicKey>;
    createdAt: beet.bignum;
};
export declare const appDiscriminator: number[];
export declare class App implements AppArgs {
    readonly authority: web3.PublicKey;
    readonly isProfileDeleteAllowed: boolean;
    readonly isSubspaceDeleteAllowed: boolean;
    readonly isPublicationDeleteAllowed: boolean;
    readonly isProfileIndividualProcessorsAllowed: boolean;
    readonly isSubspaceIndividualProcessorsAllowed: boolean;
    readonly isPublicationIndividualProcessorsAllowed: boolean;
    readonly reserved1: number;
    readonly reserved2: number;
    readonly reserved3: number;
    readonly reserved4: number;
    readonly reserved5: web3.PublicKey;
    readonly reserved6: web3.PublicKey;
    readonly creationYear: beet.bignum;
    readonly creationMonth: beet.bignum;
    readonly appDomainName: string;
    readonly metadataUri: beet.COption<string>;
    readonly registeringProcessor: beet.COption<web3.PublicKey>;
    readonly connectingProcessor: beet.COption<web3.PublicKey>;
    readonly publishingProcessor: beet.COption<web3.PublicKey>;
    readonly collectingProcessor: beet.COption<web3.PublicKey>;
    readonly referencingProcessor: beet.COption<web3.PublicKey>;
    readonly createdAt: beet.bignum;
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
        authority: string;
        isProfileDeleteAllowed: boolean;
        isSubspaceDeleteAllowed: boolean;
        isPublicationDeleteAllowed: boolean;
        isProfileIndividualProcessorsAllowed: boolean;
        isSubspaceIndividualProcessorsAllowed: boolean;
        isPublicationIndividualProcessorsAllowed: boolean;
        reserved1: number;
        reserved2: number;
        reserved3: number;
        reserved4: number;
        reserved5: string;
        reserved6: string;
        creationYear: number | {
            toNumber: () => number;
        };
        creationMonth: number | {
            toNumber: () => number;
        };
        appDomainName: string;
        metadataUri: beet.COption<string>;
        registeringProcessor: beet.COption<web3.PublicKey>;
        connectingProcessor: beet.COption<web3.PublicKey>;
        publishingProcessor: beet.COption<web3.PublicKey>;
        collectingProcessor: beet.COption<web3.PublicKey>;
        referencingProcessor: beet.COption<web3.PublicKey>;
        createdAt: number | {
            toNumber: () => number;
        };
    };
}
export declare const appBeet: beet.FixableBeetStruct<App, AppArgs & {
    accountDiscriminator: number[];
}>;
