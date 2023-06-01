/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import { PublicationData, publicationDataBeet } from '../types/PublicationData'

/**
 * @category Instructions
 * @category UpdatePublication
 * @category generated
 */
export type UpdatePublicationInstructionArgs = {
  data: PublicationData
}
/**
 * @category Instructions
 * @category UpdatePublication
 * @category generated
 */
export const updatePublicationStruct = new beet.FixableBeetArgsStruct<
  UpdatePublicationInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['data', publicationDataBeet],
  ],
  'UpdatePublicationInstructionArgs'
)
/**
 * Accounts required by the _updatePublication_ instruction
 *
 * @property [] app
 * @property [] profile
 * @property [_writable_] publication
 * @property [] collectingProcessorPda (optional)
 * @property [] referencingProcessorPda (optional)
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category UpdatePublication
 * @category generated
 */
export type UpdatePublicationInstructionAccounts = {
  app: web3.PublicKey
  profile: web3.PublicKey
  publication: web3.PublicKey
  collectingProcessorPda?: web3.PublicKey
  referencingProcessorPda?: web3.PublicKey
  authority: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const updatePublicationInstructionDiscriminator = [
  102, 180, 167, 15, 175, 135, 120, 221,
]

/**
 * Creates a _UpdatePublication_ instruction.
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
 * @category UpdatePublication
 * @category generated
 */
export function createUpdatePublicationInstruction(
  accounts: UpdatePublicationInstructionAccounts,
  args: UpdatePublicationInstructionArgs,
  programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')
) {
  const [data] = updatePublicationStruct.serialize({
    instructionDiscriminator: updatePublicationInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.app,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.profile,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.publication,
      isWritable: true,
      isSigner: false,
    },
  ]

  if (accounts.collectingProcessorPda != null) {
    keys.push({
      pubkey: accounts.collectingProcessorPda,
      isWritable: false,
      isSigner: false,
    })
  }
  if (accounts.referencingProcessorPda != null) {
    if (accounts.collectingProcessorPda == null) {
      throw new Error(
        "When providing 'referencingProcessorPda' then 'accounts.collectingProcessorPda' need(s) to be provided as well."
      )
    }
    keys.push({
      pubkey: accounts.referencingProcessorPda,
      isWritable: false,
      isSigner: false,
    })
  }
  keys.push({
    pubkey: accounts.authority,
    isWritable: true,
    isSigner: true,
  })
  keys.push({
    pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
    isWritable: false,
    isSigner: false,
  })

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}