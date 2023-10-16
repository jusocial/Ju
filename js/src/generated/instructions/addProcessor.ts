/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ProcessorType, processorTypeBeet } from '../types/ProcessorType';

/**
 * @category Instructions
 * @category AddProcessor
 * @category generated
 */
export type AddProcessorInstructionArgs = {
  processorType: ProcessorType;
  processorName: string;
  programAddress: web3.PublicKey;
  developerWallet: beet.COption<web3.PublicKey>;
};
/**
 * @category Instructions
 * @category AddProcessor
 * @category generated
 */
export const addProcessorStruct = new beet.FixableBeetArgsStruct<
  AddProcessorInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['processorType', processorTypeBeet],
    ['processorName', beet.utf8String],
    ['programAddress', beetSolana.publicKey],
    ['developerWallet', beet.coption(beetSolana.publicKey)],
  ],
  'AddProcessorInstructionArgs',
);
/**
 * Accounts required by the _addProcessor_ instruction
 *
 * @property [_writable_] processorPda
 * @property [] developerWhitelistProof (optional)
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category AddProcessor
 * @category generated
 */
export type AddProcessorInstructionAccounts = {
  processorPda: web3.PublicKey;
  developerWhitelistProof?: web3.PublicKey;
  authority: web3.PublicKey;
  systemProgram?: web3.PublicKey;
};

export const addProcessorInstructionDiscriminator = [46, 244, 27, 237, 198, 63, 95, 106];

/**
 * Creates a _AddProcessor_ instruction.
 *
 * Optional accounts that are not provided will be omitted from the accounts
 * array passed with the instruction.
 * An optional account that is set cannot follow an optional account that is unset.
 * Otherwise an Error is raised.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AddProcessor
 * @category generated
 */
export function createAddProcessorInstruction(
  accounts: AddProcessorInstructionAccounts,
  args: AddProcessorInstructionArgs,
  programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq'),
) {
  const [data] = addProcessorStruct.serialize({
    instructionDiscriminator: addProcessorInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.processorPda,
      isWritable: true,
      isSigner: false,
    },
  ];

  if (accounts.developerWhitelistProof != null) {
    keys.push({
      pubkey: accounts.developerWhitelistProof,
      isWritable: false,
      isSigner: false,
    });
  }
  keys.push({
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true,
  });
  keys.push({
    pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false,
  });

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
