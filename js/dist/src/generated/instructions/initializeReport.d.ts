import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { ReportData } from '../types/ReportData';
export type InitializeReportInstructionArgs = {
    data: ReportData;
};
export declare const initializeReportStruct: beet.FixableBeetArgsStruct<InitializeReportInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type InitializeReportInstructionAccounts = {
    app: web3.PublicKey;
    initializer: web3.PublicKey;
    target: web3.PublicKey;
    report: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const initializeReportInstructionDiscriminator: number[];
export declare function createInitializeReportInstruction(accounts: InitializeReportInstructionAccounts, args: InitializeReportInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
