/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import * as beet from '@metaplex-foundation/beet';
export type DeveloperWhitelistItemArgs = {
    authority: web3.PublicKey;
};
export declare const developerWhitelistItemDiscriminator: number[];
export declare class DeveloperWhitelistItem implements DeveloperWhitelistItemArgs {
    readonly authority: web3.PublicKey;
    private constructor();
    static fromArgs(args: DeveloperWhitelistItemArgs): DeveloperWhitelistItem;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [DeveloperWhitelistItem, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<DeveloperWhitelistItem>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        authority: any;
        accountDiscriminator: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [DeveloperWhitelistItem, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        authority: string;
    };
}
export declare const developerWhitelistItemBeet: beet.BeetStruct<DeveloperWhitelistItem, DeveloperWhitelistItemArgs & {
    accountDiscriminator: number[];
}>;
