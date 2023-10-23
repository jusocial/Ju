/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Gender } from '../types/Gender';
export type ProfileArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    exchangeKey: web3.PublicKey;
    isVerified: boolean;
    gender: Gender;
    personalData1: number;
    personalData2: number;
    personalData3: number;
    personalData4: number;
    personalData5: number;
    personalData6: number;
    personalData7: number;
    personalData8: number;
    reserved1: number;
    reserved2: number;
    reserved3: number;
    reserved4: number;
    reserved5: beet.bignum;
    reserved6: beet.bignum;
    reserved7: number[];
    reserved8: number[];
    firstName: number[];
    lastName: number[];
    birthDate: beet.bignum;
    birthDate10Years: beet.bignum;
    birthDate5Years: beet.bignum;
    birthDateYear: beet.bignum;
    countryCode: number;
    regionCode: number;
    cityCode: number;
    creationYear: beet.bignum;
    creationMonth: beet.bignum;
    creationWeek: beet.bignum;
    creationDay: beet.bignum;
    alias: beet.COption<string>;
    metadataUri: beet.COption<string>;
    connectingProcessor: beet.COption<web3.PublicKey>;
    createdAt: beet.bignum;
    modifiedAt: beet.COption<beet.bignum>;
};
export declare const profileDiscriminator: number[];
export declare class Profile implements ProfileArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly exchangeKey: web3.PublicKey;
    readonly isVerified: boolean;
    readonly gender: Gender;
    readonly personalData1: number;
    readonly personalData2: number;
    readonly personalData3: number;
    readonly personalData4: number;
    readonly personalData5: number;
    readonly personalData6: number;
    readonly personalData7: number;
    readonly personalData8: number;
    readonly reserved1: number;
    readonly reserved2: number;
    readonly reserved3: number;
    readonly reserved4: number;
    readonly reserved5: beet.bignum;
    readonly reserved6: beet.bignum;
    readonly reserved7: number[];
    readonly reserved8: number[];
    readonly firstName: number[];
    readonly lastName: number[];
    readonly birthDate: beet.bignum;
    readonly birthDate10Years: beet.bignum;
    readonly birthDate5Years: beet.bignum;
    readonly birthDateYear: beet.bignum;
    readonly countryCode: number;
    readonly regionCode: number;
    readonly cityCode: number;
    readonly creationYear: beet.bignum;
    readonly creationMonth: beet.bignum;
    readonly creationWeek: beet.bignum;
    readonly creationDay: beet.bignum;
    readonly alias: beet.COption<string>;
    readonly metadataUri: beet.COption<string>;
    readonly connectingProcessor: beet.COption<web3.PublicKey>;
    readonly createdAt: beet.bignum;
    readonly modifiedAt: beet.COption<beet.bignum>;
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
        gender: string;
        personalData1: number;
        personalData2: number;
        personalData3: number;
        personalData4: number;
        personalData5: number;
        personalData6: number;
        personalData7: number;
        personalData8: number;
        reserved1: number;
        reserved2: number;
        reserved3: number;
        reserved4: number;
        reserved5: number | {
            toNumber: () => number;
        };
        reserved6: number | {
            toNumber: () => number;
        };
        reserved7: number[];
        reserved8: number[];
        firstName: number[];
        lastName: number[];
        birthDate: number | {
            toNumber: () => number;
        };
        birthDate10Years: number | {
            toNumber: () => number;
        };
        birthDate5Years: number | {
            toNumber: () => number;
        };
        birthDateYear: number | {
            toNumber: () => number;
        };
        countryCode: number;
        regionCode: number;
        cityCode: number;
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
        metadataUri: beet.COption<string>;
        connectingProcessor: beet.COption<web3.PublicKey>;
        createdAt: number | {
            toNumber: () => number;
        };
        modifiedAt: beet.COption<beet.bignum>;
    };
}
export declare const profileBeet: beet.FixableBeetStruct<Profile, ProfileArgs & {
    accountDiscriminator: number[];
}>;
