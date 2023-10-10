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
 * @category DeleteDeveloper
 * @category generated
 */
export const deleteDeveloperStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'DeleteDeveloperInstructionArgs',
);
/**
 * Accounts required by the _deleteDeveloper_ instruction
 *
 * @property [_writable_] developer
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category DeleteDeveloper
 * @category generated
 */
export type DeleteDeveloperInstructionAccounts = {
  developer: web3.PublicKey;
  authority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
};

export const deleteDeveloperInstructionDiscriminator = [11, 248, 52, 0, 76, 132, 176, 39];

/**
 * Creates a _DeleteDeveloper_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category DeleteDeveloper
 * @category generated
 */
export function createDeleteDeveloperInstruction(
  accounts: DeleteDeveloperInstructionAccounts,
  programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq'),
) {
  const [data] = deleteDeveloperStruct.serialize({
    instructionDiscriminator: deleteDeveloperInstructionDiscriminator,
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
