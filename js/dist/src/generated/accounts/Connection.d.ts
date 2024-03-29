/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ConnectionTargetType } from '../types/ConnectionTargetType';
export type ConnectionArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    connectionTargetType: ConnectionTargetType;
    initializer: web3.PublicKey;
    target: web3.PublicKey;
    isApproved: boolean;
    createdAt: beet.bignum;
    creationWeek: beet.bignum;
    creation3Day: beet.bignum;
    creationDay: beet.bignum;
    modifiedAt: beet.COption<beet.bignum>;
};
export declare const connectionDiscriminator: number[];
export declare class Connection implements ConnectionArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly connectionTargetType: ConnectionTargetType;
    readonly initializer: web3.PublicKey;
    readonly target: web3.PublicKey;
    readonly isApproved: boolean;
    readonly createdAt: beet.bignum;
    readonly creationWeek: beet.bignum;
    readonly creation3Day: beet.bignum;
    readonly creationDay: beet.bignum;
    readonly modifiedAt: beet.COption<beet.bignum>;
    private constructor();
    static fromArgs(args: ConnectionArgs): Connection;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Connection, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Connection>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<ConnectionArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Connection, number];
    serialize(): [Buffer, number];
    static byteSize(args: ConnectionArgs): number;
    static getMinimumBalanceForRentExemption(args: ConnectionArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        app: string;
        authority: string;
        connectionTargetType: string;
        initializer: string;
        target: string;
        isApproved: boolean;
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
        modifiedAt: beet.COption<beet.bignum>;
    };
}
export declare const connectionBeet: beet.FixableBeetStruct<Connection, ConnectionArgs & {
    accountDiscriminator: number[];
}>;
