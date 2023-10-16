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
 * Arguments used to create {@link ExternalProcessorPDA}
 * @category Accounts
 * @category generated
 */
export type ExternalProcessorPDAArgs = {
  processorType: ProcessorType;
  isApproved: boolean;
  processorName: string;
  authority: web3.PublicKey;
  developerWallet: beet.COption<web3.PublicKey>;
  programAddress: web3.PublicKey;
};

export const externalProcessorPDADiscriminator = [204, 224, 184, 182, 78, 32, 108, 104];
/**
 * Holds the data for the {@link ExternalProcessorPDA} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class ExternalProcessorPDA implements ExternalProcessorPDAArgs {
  private constructor(
    readonly processorType: ProcessorType,
    readonly isApproved: boolean,
    readonly processorName: string,
    readonly authority: web3.PublicKey,
    readonly developerWallet: beet.COption<web3.PublicKey>,
    readonly programAddress: web3.PublicKey,
  ) {}

  /**
   * Creates a {@link ExternalProcessorPDA} instance from the provided args.
   */
  static fromArgs(args: ExternalProcessorPDAArgs) {
    return new ExternalProcessorPDA(
      args.processorType,
      args.isApproved,
      args.processorName,
      args.authority,
      args.developerWallet,
      args.programAddress,
    );
  }

  /**
   * Deserializes the {@link ExternalProcessorPDA} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0,
  ): [ExternalProcessorPDA, number] {
    return ExternalProcessorPDA.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link ExternalProcessorPDA} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig,
  ): Promise<ExternalProcessorPDA> {
    const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
    if (accountInfo == null) {
      throw new Error(`Unable to find ExternalProcessorPDA account at ${address}`);
    }
    return ExternalProcessorPDA.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq'),
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, externalProcessorPDABeet);
  }

  /**
   * Deserializes the {@link ExternalProcessorPDA} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [ExternalProcessorPDA, number] {
    return externalProcessorPDABeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link ExternalProcessorPDA} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return externalProcessorPDABeet.serialize({
      accountDiscriminator: externalProcessorPDADiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link ExternalProcessorPDA} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: ExternalProcessorPDAArgs) {
    const instance = ExternalProcessorPDA.fromArgs(args);
    return externalProcessorPDABeet.toFixedFromValue({
      accountDiscriminator: externalProcessorPDADiscriminator,
      ...instance,
    }).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link ExternalProcessorPDA} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: ExternalProcessorPDAArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      ExternalProcessorPDA.byteSize(args),
      commitment,
    );
  }

  /**
   * Returns a readable version of {@link ExternalProcessorPDA} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      processorType: 'ProcessorType.' + ProcessorType[this.processorType],
      isApproved: this.isApproved,
      processorName: this.processorName,
      authority: this.authority.toBase58(),
      developerWallet: this.developerWallet,
      programAddress: this.programAddress.toBase58(),
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const externalProcessorPDABeet = new beet.FixableBeetStruct<
  ExternalProcessorPDA,
  ExternalProcessorPDAArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['processorType', processorTypeBeet],
    ['isApproved', beet.bool],
    ['processorName', beet.utf8String],
    ['authority', beetSolana.publicKey],
    ['developerWallet', beet.coption(beetSolana.publicKey)],
    ['programAddress', beetSolana.publicKey],
  ],
  ExternalProcessorPDA.fromArgs,
  'ExternalProcessorPDA',
);
