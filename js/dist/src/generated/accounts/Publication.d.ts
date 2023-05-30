/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ContentType } from '../types/ContentType';
export type PublicationArgs = {
    uuid: string;
    app: web3.PublicKey;
    profile: web3.PublicKey;
    authority: web3.PublicKey;
    metadataUri: string;
    subspace: beet.COption<web3.PublicKey>;
    isMirror: boolean;
    isReply: boolean;
    targetPublication: beet.COption<web3.PublicKey>;
    contentType: ContentType;
    collectingProcessor: beet.COption<web3.PublicKey>;
    referencingProcessor: beet.COption<web3.PublicKey>;
    createdAt: beet.bignum;
    modifiedAt: beet.COption<beet.bignum>;
};
export declare const publicationDiscriminator: number[];
export declare class Publication implements PublicationArgs {
    readonly uuid: string;
    readonly app: web3.PublicKey;
    readonly profile: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly metadataUri: string;
    readonly subspace: beet.COption<web3.PublicKey>;
    readonly isMirror: boolean;
    readonly isReply: boolean;
    readonly targetPublication: beet.COption<web3.PublicKey>;
    readonly contentType: ContentType;
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
        uuid: string;
        app: string;
        profile: string;
        authority: string;
        metadataUri: string;
        subspace: beet.COption<web3.PublicKey>;
        isMirror: boolean;
        isReply: boolean;
        targetPublication: beet.COption<web3.PublicKey>;
        contentType: string;
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
