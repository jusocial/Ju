/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
export type ProfileArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    alias: beet.COption<string>;
    metadataUri: string;
    statusText: beet.COption<string>;
    verified: boolean;
    connectingProcessor: beet.COption<web3.PublicKey>;
    createdAt: beet.bignum;
};
export declare const profileDiscriminator: number[];
export declare class Profile implements ProfileArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly alias: beet.COption<string>;
    readonly metadataUri: string;
    readonly statusText: beet.COption<string>;
    readonly verified: boolean;
    readonly connectingProcessor: beet.COption<web3.PublicKey>;
    readonly createdAt: beet.bignum;
    private constructor();
    static fromArgs(args: ProfileArgs): Profile;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Profile, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Profile>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<ProfileArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Profile, number];
    serialize(): [Buffer, number];
    static byteSize(args: ProfileArgs): number;
    static getMinimumBalanceForRentExemption(args: ProfileArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        app: string;
        authority: string;
        alias: beet.COption<string>;
        metadataUri: string;
        statusText: beet.COption<string>;
        verified: boolean;
        connectingProcessor: beet.COption<web3.PublicKey>;
        createdAt: number | {
            toNumber: () => number;
        };
    };
}
export declare const profileBeet: beet.FixableBeetStruct<Profile, ProfileArgs & {
    accountDiscriminator: number[];
}>;
