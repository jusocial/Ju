/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import * as beet from '@metaplex-foundation/beet';
import { ManagementRoleType } from '../types/ManagementRoleType';
export type SubspaceManagerArgs = {
    app: web3.PublicKey;
    authority: web3.PublicKey;
    role: ManagementRoleType;
};
export declare const subspaceManagerDiscriminator: number[];
export declare class SubspaceManager implements SubspaceManagerArgs {
    readonly app: web3.PublicKey;
    readonly authority: web3.PublicKey;
    readonly role: ManagementRoleType;
    private constructor();
    static fromArgs(args: SubspaceManagerArgs): SubspaceManager;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [SubspaceManager, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<SubspaceManager>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        app: any;
        authority: any;
        accountDiscriminator: any;
        role: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [SubspaceManager, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        app: string;
        authority: string;
        role: string;
    };
}
export declare const subspaceManagerBeet: beet.BeetStruct<SubspaceManager, SubspaceManagerArgs & {
    accountDiscriminator: number[];
}>;
