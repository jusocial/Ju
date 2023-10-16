/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import * as beet from '@metaplex-foundation/beet';
export type DeveloperWhitelistProofArgs = {
    authority: web3.PublicKey;
    developer: web3.PublicKey;
};
export declare const developerWhitelistProofDiscriminator: number[];
export declare class DeveloperWhitelistProof implements DeveloperWhitelistProofArgs {
    readonly authority: web3.PublicKey;
    readonly developer: web3.PublicKey;
    private constructor();
    static fromArgs(args: DeveloperWhitelistProofArgs): DeveloperWhitelistProof;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [DeveloperWhitelistProof, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<DeveloperWhitelistProof>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        authority: any;
        accountDiscriminator: any;
        developer: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [DeveloperWhitelistProof, number];
    serialize(): [Buffer, number];
    static get byteSize(): number;
    static getMinimumBalanceForRentExemption(connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    static hasCorrectByteSize(buf: Buffer, offset?: number): boolean;
    pretty(): {
        authority: string;
        developer: string;
    };
}
export declare const developerWhitelistProofBeet: beet.BeetStruct<DeveloperWhitelistProof, DeveloperWhitelistProofArgs & {
    accountDiscriminator: number[];
}>;
