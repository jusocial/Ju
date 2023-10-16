/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Gender } from '../types/Gender';
import { LocationCoordinates } from '../types/LocationCoordinates';
export type ProfileArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    exchangeKey: web3.PublicKey;
    isVerified: boolean;
    countryCode: number;
    regionCode: number;
    cityCode: number;
    firstName: number[];
    lastName: number[];
    birthDate: beet.bignum;
    searchable10Years: beet.bignum;
    searchable5Years: beet.bignum;
    searchableWeek: beet.bignum;
    searchableDay: beet.bignum;
    gender: beet.COption<Gender>;
    alias: beet.COption<string>;
    statusText: string;
    metadataUri: beet.COption<string>;
    currentLocation: beet.COption<LocationCoordinates>;
    connectingProcessor: beet.COption<web3.PublicKey>;
    createdAt: beet.bignum;
    modifiedAt: beet.COption<beet.bignum>;
    reserved1: number[];
    reserved2: number[];
    reserved3: number[];
};
export declare const profileDiscriminator: number[];
export declare class Profile implements ProfileArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly exchangeKey: web3.PublicKey;
    readonly isVerified: boolean;
    readonly countryCode: number;
    readonly regionCode: number;
    readonly cityCode: number;
    readonly firstName: number[];
    readonly lastName: number[];
    readonly birthDate: beet.bignum;
    readonly searchable10Years: beet.bignum;
    readonly searchable5Years: beet.bignum;
    readonly searchableWeek: beet.bignum;
    readonly searchableDay: beet.bignum;
    readonly gender: beet.COption<Gender>;
    readonly alias: beet.COption<string>;
    readonly statusText: string;
    readonly metadataUri: beet.COption<string>;
    readonly currentLocation: beet.COption<LocationCoordinates>;
    readonly connectingProcessor: beet.COption<web3.PublicKey>;
    readonly createdAt: beet.bignum;
    readonly modifiedAt: beet.COption<beet.bignum>;
    readonly reserved1: number[];
    readonly reserved2: number[];
    readonly reserved3: number[];
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
        exchangeKey: string;
        isVerified: boolean;
        countryCode: number;
        regionCode: number;
        cityCode: number;
        firstName: number[];
        lastName: number[];
        birthDate: number | {
            toNumber: () => number;
        };
        searchable10Years: number | {
            toNumber: () => number;
        };
        searchable5Years: number | {
            toNumber: () => number;
        };
        searchableWeek: number | {
            toNumber: () => number;
        };
        searchableDay: number | {
            toNumber: () => number;
        };
        gender: beet.COption<Gender>;
        alias: beet.COption<string>;
        statusText: string;
        metadataUri: beet.COption<string>;
        currentLocation: beet.COption<LocationCoordinates>;
        connectingProcessor: beet.COption<web3.PublicKey>;
        createdAt: number | {
            toNumber: () => number;
        };
        modifiedAt: beet.COption<beet.bignum>;
        reserved1: number[];
        reserved2: number[];
        reserved3: number[];
    };
}
export declare const profileBeet: beet.FixableBeetStruct<Profile, ProfileArgs & {
    accountDiscriminator: number[];
}>;
