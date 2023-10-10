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
 * @category AddDeveloper
 * @category generated
 */
export const addDeveloperStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'AddDeveloperInstructionArgs',
);
/**
 * Accounts required by the _addDeveloper_ instruction
 *
 * @property [_writable_] developer
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category AddDeveloper
 * @category generated
 */
export type AddDeveloperInstructionAccounts = {
  developer: web3.PublicKey;
  authority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
};

export const addDeveloperInstructionDiscriminator = [145, 91, 232, 218, 116, 139, 165, 136];

/**
 * Creates a _AddDeveloper_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category AddDeveloper
 * @category generated
 */
export function createAddDeveloperInstruction(
  accounts: AddDeveloperInstructionAccounts,
  programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq'),
) {
  const [data] = addDeveloperStruct.serialize({
    instructionDiscriminator: addDeveloperInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.developer,
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