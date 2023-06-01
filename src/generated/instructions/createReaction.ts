/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import { ReactionType, reactionTypeBeet } from '../types/ReactionType'

/**
 * @category Instructions
 * @category CreateReaction
 * @category generated
 */
export type CreateReactionInstructionArgs = {
  reactionType: ReactionType
}
/**
 * @category Instructions
 * @category CreateReaction
 * @category generated
 */
export const createReactionStruct = new beet.BeetArgsStruct<
  CreateReactionInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['reactionType', reactionTypeBeet],
  ],
  'CreateReactionInstructionArgs'
)
/**
 * Accounts required by the _createReaction_ instruction
 *
 * @property [] app
 * @property [] target
 * @property [] initializerProfile
 * @property [_writable_] reaction
 * @property [_writable_, **signer**] authority
 * @category Instructions
 * @category CreateReaction
 * @category generated
 */
export type CreateReactionInstructionAccounts = {
  app: web3.PublicKey
  target: web3.PublicKey
  initializerProfile: web3.PublicKey
  reaction: web3.PublicKey
  authority: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const createReactionInstructionDiscriminator = [
  130, 167, 113, 146, 55, 159, 61, 144,
]

/**
 * Creates a _CreateReaction_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateReaction
 * @category generated
 */
export function createCreateReactionInstruction(
  accounts: CreateReactionInstructionAccounts,
  args: CreateReactionInstructionArgs,
  programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')
) {
  const [data] = createReactionStruct.serialize({
    instructionDiscriminator: createReactionInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.app,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.target,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.initializerProfile,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.reaction,
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
  ]

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