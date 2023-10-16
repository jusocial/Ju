import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { SubspaceManagementRoleType } from '../types/SubspaceManagementRoleType';
export type UpdateSubspaceManagerInstructionArgs = {
    managerRole: SubspaceManagementRoleType;
};
export declare const updateSubspaceManagerStruct: beet.BeetArgsStruct<UpdateSubspaceManagerInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type UpdateSubspaceManagerInstructionAccounts = {
    app: web3.PublicKey;
    subspace: web3.PublicKey;
    profile: web3.PublicKey;
    connectionProof: web3.PublicKey;
    manager: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const updateSubspaceManagerInstructionDiscriminator: number[];
export declare function createUpdateSubspaceManagerInstruction(accounts: UpdateSubspaceManagerInstructionAccounts, args: UpdateSubspaceManagerInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
