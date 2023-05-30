/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import * as beet from '@metaplex-foundation/beet';
export type AliasArgs = {
    app: web3.PublicKey;
    profile: web3.PublicKey;
    authority: web3.PublicKey;
    value: string;
};
export declare const aliasDiscriminator: number[];
export declare class Alias implements AliasArgs {
    readonly app: web3.PublicKey;
    readonly profile: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly value: string;
    private constructor();
    static fromArgs(args: AliasArgs): Alias;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Alias, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<Alias>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<AliasArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [Alias, number];
    serialize(): [Buffer, number];
    static byteSize(args: AliasArgs): number;
    static getMinimumBalanceForRentExemption(args: AliasArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        app: string;
        profile: string;
        authority: string;
        value: string;
    };
}
export declare const aliasBeet: beet.FixableBeetStruct<Alias, AliasArgs & {
    accountDiscriminator: number[];
}>;
