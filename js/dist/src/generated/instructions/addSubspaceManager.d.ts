import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { SubspaceManagementRoleType } from '../types/SubspaceManagementRoleType';
export type AddSubspaceManagerInstructionArgs = {
    managerRole: SubspaceManagementRoleType;
};
export declare const addSubspaceManagerStruct: beet.BeetArgsStruct<AddSubspaceManagerInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type AddSubspaceManagerInstructionAccounts = {
    app: web3.PublicKey;
    subspace: web3.PublicKey;
    profile: web3.PublicKey;
    connectionProof: web3.PublicKey;
    manager: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const addSubspaceManagerInstructionDiscriminator: number[];
export declare function createAddSubspaceManagerInstruction(accounts: AddSubspaceManagerInstructionAccounts, args: AddSubspaceManagerInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
