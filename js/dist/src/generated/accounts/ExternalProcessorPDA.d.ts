/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ProcessorType } from '../types/ProcessorType';
export type ExternalProcessorPDAArgs = {
    processorType: ProcessorType;
    isApproved: boolean;
    authority: web3.PublicKey;
    programAddress: web3.PublicKey;
    developerWallet: beet.COption<web3.PublicKey>;
    processorName: string;
    metadataUri: beet.COption<string>;
    createdAt: beet.bignum;
};
export declare const externalProcessorPDADiscriminator: number[];
export declare class ExternalProcessorPDA implements ExternalProcessorPDAArgs {
    readonly processorType: ProcessorType;
    readonly isApproved: boolean;
    readonly authority: web3.PublicKey;
    readonly programAddress: web3.PublicKey;
    readonly developerWallet: beet.COption<web3.PublicKey>;
    readonly processorName: string;
    readonly metadataUri: beet.COption<string>;
    readonly createdAt: beet.bignum;
    private constructor();
    static fromArgs(args: ExternalProcessorPDAArgs): ExternalProcessorPDA;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [ExternalProcessorPDA, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey, commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig): Promise<ExternalProcessorPDA>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<ExternalProcessorPDAArgs & {
        accountDiscriminator: number[];
    }>;
    static deserialize(buf: Buffer, offset?: number): [ExternalProcessorPDA, number];
    serialize(): [Buffer, number];
    static byteSize(args: ExternalProcessorPDAArgs): number;
    static getMinimumBalanceForRentExemption(args: ExternalProcessorPDAArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        processorType: string;
        isApproved: boolean;
        authority: string;
        programAddress: string;
        developerWallet: beet.COption<web3.PublicKey>;
        processorName: string;
        metadataUri: beet.COption<string>;
        createdAt: number | {
            toNumber: () => number;
        };
    };
}
export declare const externalProcessorPDABeet: beet.FixableBeetStruct<ExternalProcessorPDA, ExternalProcessorPDAArgs & {
    accountDiscriminator: number[];
}>;
