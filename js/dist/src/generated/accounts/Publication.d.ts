/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ContentType } from '../types/ContentType';
export type PublicationArgs = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    authority: web3.PublicKey;
    isEncrypted: boolean;
    isMirror: boolean;
    isReply: boolean;
    contentType: ContentType;
    tag: number[];
    searchable3Day: beet.bignum;
    searchableDay: beet.bignum;
    targetPublication: web3.PublicKey;
    subspace: web3.PublicKey;
    uuid: string;
    metadataUri: string;
    collectingProcessor: beet.COption<web3.PublicKey>;
    referencingProcessor: beet.COption<web3.PublicKey>;
    createdAt: beet.bignum;
    modifiedAt: beet.COption<beet.bignum>;
};
export declare const publicationDiscriminator: number[];
export declare class Publication implements PublicationArgs {
    readonly app: web3.PublicKey;
    readonly profile: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly isEncrypted: boolean;
    readonly isMirror: boolean;
    readonly isReply: boolean;
    readonly contentType: ContentType;
    readonly tag: number[];
    readonly searchable3Day: beet.bignum;
    readonly searchableDay: beet.bignum;
    readonly targetPublication: web3.PublicKey;
    readonly subspace: web3.PublicKey;
    readonly uuid: string;
    readonly metadataUri: string;
    readonly collectingProcessor: beet.COption<web3.PublicKey>;
    readonly referencingProcessor: beet.COption<web3.PublicKey>;
    readonly createdAt: beet.bignum;
    readonly modifiedAt: beet.COption<beet.bignum>;
    private constructor();
    static fromArgs(args: PublicationArgs): Publication;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Publication, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Publication>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<PublicationArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Publication, number];
    serialize(): [Buffer, number];
    static byteSize(args: PublicationArgs): number;
    static getMinimumBalanceForRentExemption(args: PublicationArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        app: string;
        profile: string;
        authority: string;
        isEncrypted: boolean;
        isMirror: boolean;
        isReply: boolean;
        contentType: string;
        tag: number[];
        searchable3Day: number | {
            toNumber: () => number;
        };
        searchableDay: number | {
            toNumber: () => number;
        };
        targetPublication: string;
        subspace: string;
        uuid: string;
        metadataUri: string;
        collectingProcessor: beet.COption<web3.PublicKey>;
        referencingProcessor: beet.COption<web3.PublicKey>;
        createdAt: number | {
            toNumber: () => number;
        };
        modifiedAt: beet.COption<beet.bignum>;
    };
}
export declare const publicationBeet: beet.FixableBeetStruct<Publication, PublicationArgs & {
    accountDiscriminator: number[];
}>;
