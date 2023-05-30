/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ReportType } from '../types/ReportType';
export type ReportArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    initializerProfile: web3.PublicKey;
    target: web3.PublicKey;
    reportType: ReportType;
    notification: beet.COption<string>;
    createdAt: beet.bignum;
};
export declare const reportDiscriminator: number[];
export declare class Report implements ReportArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly initializerProfile: web3.PublicKey;
    readonly target: web3.PublicKey;
    readonly reportType: ReportType;
    readonly notification: beet.COption<string>;
    readonly createdAt: beet.bignum;
    private constructor();
    static fromArgs(args: ReportArgs): Report;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Report, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Report>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<ReportArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Report, number];
    serialize(): [Buffer, number];
    static byteSize(args: ReportArgs): number;
    static getMinimumBalanceForRentExemption(args: ReportArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        app: string;
        authority: string;
        initializerProfile: string;
        target: string;
        reportType: string;
        notification: beet.COption<string>;
        createdAt: number | {
            toNumber: () => number;
        };
    };
}
export declare const reportBeet: beet.FixableBeetStruct<Report, ReportArgs & {
    accountDiscriminator: number[];
}>;
