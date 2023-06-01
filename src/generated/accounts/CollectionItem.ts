/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beet from '@metaplex-foundation/beet'
import * as beetSolana from '@metaplex-foundation/beet-solana'

/**
 * Arguments used to create {@link CollectionItem}
 * @category Accounts
 * @category generated
 */
export type CollectionItemArgs = {
  app: web3.PublicKey
  authority: web3.PublicKey
  target: web3.PublicKey
  createdAt: beet.bignum
}

export const collectionItemDiscriminator = [225, 72, 84, 206, 193, 134, 215, 4]
/**
 * Holds the data for the {@link CollectionItem} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class CollectionItem implements CollectionItemArgs {
  private constructor(
    readonly app: web3.PublicKey,
    readonly authority: web3.PublicKey,
    readonly target: web3.PublicKey,
    readonly createdAt: beet.bignum
  ) {}

  /**
   * Creates a {@link CollectionItem} instance from the provided args.
   */
  static fromArgs(args: CollectionItemArgs) {
    return new CollectionItem(
      args.app,
      args.authority,
      args.target,
      args.createdAt
    )
  }

  /**
   * Deserializes the {@link CollectionItem} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [CollectionItem, number] {
    return CollectionItem.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link CollectionItem} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<CollectionItem> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find CollectionItem account at ${address}`)
    }
    return CollectionItem.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      '964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, collectionItemBeet)
  }

  /**
   * Deserializes the {@link CollectionItem} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [CollectionItem, number] {
    return collectionItemBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link CollectionItem} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return collectionItemBeet.serialize({
      accountDiscriminator: collectionItemDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link CollectionItem}
   */
  static get byteSize() {
    return collectionItemBeet.byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link CollectionItem} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      CollectionItem.byteSize,
      commitment
    )
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link CollectionItem} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === CollectionItem.byteSize
  }

  /**
   * Returns a readable version of {@link CollectionItem} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      app: this.app.toBase58(),
      authority: this.authority.toBase58(),
      target: this.target.toBase58(),
      createdAt: (() => {
        const x = <{ toNumber: () => number }>this.createdAt
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber()
          } catch (_) {
            return x
          }
        }
        return x
      })(),
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const collectionItemBeet = new beet.BeetStruct<
  CollectionItem,
  CollectionItemArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['target', beetSolana.publicKey],
    ['createdAt', beet.i64],
  ],
  CollectionItem.fromArgs,
  'CollectionItem'
)