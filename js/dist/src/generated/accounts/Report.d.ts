/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ReportTargetType } from '../types/ReportTargetType';
import { ReportType } from '../types/ReportType';
export type ReportArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    targetType: ReportTargetType;
    target: web3.PublicKey;
    initializer: web3.PublicKey;
    reportType: ReportType;
    createdAt: beet.bignum;
    creationWeek: beet.bignum;
    creation3Day: beet.bignum;
    creationDay: beet.bignum;
    notification: beet.COption<string>;
};
export declare const reportDiscriminator: number[];
export declare class Report implements ReportArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly targetType: ReportTargetType;
    readonly target: web3.PublicKey;
    readonly initializer: web3.PublicKey;
    readonly reportType: ReportType;
    readonly createdAt: beet.bignum;
    readonly creationWeek: beet.bignum;
    readonly creation3Day: beet.bignum;
    readonly creationDay: beet.bignum;
    readonly notification: beet.COption<string>;
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
        targetType: string;
        target: string;
        initializer: string;
        reportType: string;
        createdAt: number | {
            toNumber: () => number;
        };
        creationWeek: number | {
            toNumber: () => number;
        };
        creation3Day: number | {
            toNumber: () => number;
        };
        creationDay: number | {
            toNumber: () => number;
        };
        notification: beet.COption<string>;
    };
}
export declare const reportBeet: beet.FixableBeetStruct<Report, ReportArgs & {
    accountDiscriminator: number[];
}>;
