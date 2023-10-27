/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

/**
 * @category Instructions
 * @category DeleteSubspaceManager
 * @category generated
 */
export const deleteSubspaceManagerStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'DeleteSubspaceManagerInstructionArgs',
);
/**
 * Accounts required by the _deleteSubspaceManager_ instruction
 *
 * @property [] app
 * @property [] subspace
 * @property [] profile
 * @property [_writable_] manager
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category DeleteSubspaceManager
 * @category generated
 */
export type DeleteSubspaceManagerInstructionAccounts = {
  app: web3.PublicKey;
  subspace: web3.PublicKey;
  profile: web3.PublicKey;
  manager: web3.PublicKey;
  authority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
};

export const deleteSubspaceManagerInstructionDiscriminator = [
  27, 138, 191, 140, 198, 112, 200, 146,
];

/**
 * Creates a _DeleteSubspaceManager_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category DeleteSubspaceManager
 * @category generated
 */
export function createDeleteSubspaceManagerInstruction(
  accounts: DeleteSubspaceManagerInstructionAccounts,
  programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq'),
) {
  const [data] = deleteSubspaceManagerStruct.serialize({
    instructionDiscriminator: deleteSubspaceManagerInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.app,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.subspace,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.profile,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.manager,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}