/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beet from '@metaplex-foundation/beet'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import { ContentType, contentTypeBeet } from '../types/ContentType'

/**
 * Arguments used to create {@link Publication}
 * @category Accounts
 * @category generated
 */
export type PublicationArgs = {
  uuid: string
  app: web3.PublicKey
  profile: web3.PublicKey
  authority: web3.PublicKey
  metadataUri: string
  subspace: beet.COption<web3.PublicKey>
  isMirror: boolean
  isReply: boolean
  targetPublication: beet.COption<web3.PublicKey>
  contentType: ContentType
  collectingProcessor: beet.COption<web3.PublicKey>
  referencingProcessor: beet.COption<web3.PublicKey>
  createdAt: beet.bignum
  modifiedAt: beet.COption<beet.bignum>
}

export const publicationDiscriminator = [213, 137, 189, 150, 94, 132, 251, 247]
/**
 * Holds the data for the {@link Publication} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Publication implements PublicationArgs {
  private constructor(
    readonly uuid: string,
    readonly app: web3.PublicKey,
    readonly profile: web3.PublicKey,
    readonly authority: web3.PublicKey,
    readonly metadataUri: string,
    readonly subspace: beet.COption<web3.PublicKey>,
    readonly isMirror: boolean,
    readonly isReply: boolean,
    readonly targetPublication: beet.COption<web3.PublicKey>,
    readonly contentType: ContentType,
    readonly collectingProcessor: beet.COption<web3.PublicKey>,
    readonly referencingProcessor: beet.COption<web3.PublicKey>,
    readonly createdAt: beet.bignum,
    readonly modifiedAt: beet.COption<beet.bignum>
  ) {}

  /**
   * Creates a {@link Publication} instance from the provided args.
   */
  static fromArgs(args: PublicationArgs) {
    return new Publication(
      args.uuid,
      args.app,
      args.profile,
      args.authority,
      args.metadataUri,
      args.subspace,
      args.isMirror,
      args.isReply,
      args.targetPublication,
      args.contentType,
      args.collectingProcessor,
      args.referencingProcessor,
      args.createdAt,
      args.modifiedAt
    )
  }

  /**
   * Deserializes the {@link Publication} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [Publication, number] {
    return Publication.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Publication} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Publication> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find Publication account at ${address}`)
    }
    return Publication.fromAccountInfo(accountInfo, 0)[0]
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
    return beetSolana.GpaBuilder.fromStruct(programId, publicationBeet)
  }

  /**
   * Deserializes the {@link Publication} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Publication, number] {
    return publicationBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link Publication} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return publicationBeet.serialize({
      accountDiscriminator: publicationDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Publication} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: PublicationArgs) {
    const instance = Publication.fromArgs(args)
    return publicationBeet.toFixedFromValue({
      accountDiscriminator: publicationDiscriminator,
      ...instance,
    }).byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Publication} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: PublicationArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      Publication.byteSize(args),
      commitment
    )
  }

  /**
   * Returns a readable version of {@link Publication} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      uuid: this.uuid,
      app: this.app.toBase58(),
      profile: this.profile.toBase58(),
      authority: this.authority.toBase58(),
      metadataUri: this.metadataUri,
      subspace: this.subspace,
      isMirror: this.isMirror,
      isReply: this.isReply,
      targetPublication: this.targetPublication,
      contentType: 'ContentType.' + ContentType[this.contentType],
      collectingProcessor: this.collectingProcessor,
      referencingProcessor: this.referencingProcessor,
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
      modifiedAt: this.modifiedAt,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const publicationBeet = new beet.FixableBeetStruct<
  Publication,
  PublicationArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['uuid', beet.utf8String],
    ['app', beetSolana.publicKey],
    ['profile', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['metadataUri', beet.utf8String],
    ['subspace', beet.coption(beetSolana.publicKey)],
    ['isMirror', beet.bool],
    ['isReply', beet.bool],
    ['targetPublication', beet.coption(beetSolana.publicKey)],
    ['contentType', contentTypeBeet],
    ['collectingProcessor', beet.coption(beetSolana.publicKey)],
    ['referencingProcessor', beet.coption(beetSolana.publicKey)],
    ['createdAt', beet.i64],
    ['modifiedAt', beet.coption(beet.i64)],
  ],
  Publication.fromArgs,
  'Publication'
)
