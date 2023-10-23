/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { ConnectionTargetType, connectionTargetTypeBeet } from '../types/ConnectionTargetType';

/**
 * Arguments used to create {@link Connection}
 * @category Accounts
 * @category generated
 */
export type ConnectionArgs = {
  app: web3.PublicKey;
  authority: web3.PublicKey;
  connectionTargetType: ConnectionTargetType;
  initializer: web3.PublicKey;
  target: web3.PublicKey;
  isApproved: boolean;
  createdAt: beet.bignum;
  creationWeek: beet.bignum;
  creation3Day: beet.bignum;
  creationDay: beet.bignum;
  modifiedAt: beet.COption<beet.bignum>;
};

export const connectionDiscriminator = [209, 186, 115, 58, 36, 236, 179, 10];
/**
 * Holds the data for the {@link Connection} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Connection implements ConnectionArgs {
  private constructor(
    readonly app: web3.PublicKey,
    readonly authority: web3.PublicKey,
    readonly connectionTargetType: ConnectionTargetType,
    readonly initializer: web3.PublicKey,
    readonly target: web3.PublicKey,
    readonly isApproved: boolean,
    readonly createdAt: beet.bignum,
    readonly creationWeek: beet.bignum,
    readonly creation3Day: beet.bignum,
    readonly creationDay: beet.bignum,
    readonly modifiedAt: beet.COption<beet.bignum>,
  ) {}

  /**
   * Creates a {@link Connection} instance from the provided args.
   */
  static fromArgs(args: ConnectionArgs) {
    return new Connection(
      args.app,
      args.authority,
      args.connectionTargetType,
      args.initializer,
      args.target,
      args.isApproved,
      args.createdAt,
      args.creationWeek,
      args.creation3Day,
      args.creationDay,
      args.modifiedAt,
    );
  }

  /**
   * Deserializes the {@link Connection} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset = 0): [Connection, number] {
    return Connection.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Connection} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig,
  ): Promise<Connection> {
    const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
    if (accountInfo == null) {
      throw new Error(`Unable to find Connection account at ${address}`);
    }
    return Connection.fromAccountInfo(accountInfo, 0)[0];
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
    return beetSolana.GpaBuilder.fromStruct(programId, connectionBeet);
  }

  /**
   * Deserializes the {@link Connection} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Connection, number] {
    return connectionBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link Connection} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return connectionBeet.serialize({
      accountDiscriminator: connectionDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Connection} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: ConnectionArgs) {
    const instance = Connection.fromArgs(args);
    return connectionBeet.toFixedFromValue({
      accountDiscriminator: connectionDiscriminator,
      ...instance,
    }).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Connection} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: ConnectionArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(Connection.byteSize(args), commitment);
  }

  /**
   * Returns a readable version of {@link Connection} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      app: this.app.toBase58(),
      authority: this.authority.toBase58(),
      connectionTargetType:
        'ConnectionTargetType.' + ConnectionTargetType[this.connectionTargetType],
      initializer: this.initializer.toBase58(),
      target: this.target.toBase58(),
      isApproved: this.isApproved,
      createdAt: (() => {
        const x = <{ toNumber: () => number }>this.createdAt;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      creationWeek: (() => {
        const x = <{ toNumber: () => number }>this.creationWeek;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      creation3Day: (() => {
        const x = <{ toNumber: () => number }>this.creation3Day;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      creationDay: (() => {
        const x = <{ toNumber: () => number }>this.creationDay;
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      modifiedAt: this.modifiedAt,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const connectionBeet = new beet.FixableBeetStruct<
  Connection,
  ConnectionArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['connectionTargetType', connectionTargetTypeBeet],
    ['initializer', beetSolana.publicKey],
    ['target', beetSolana.publicKey],
    ['isApproved', beet.bool],
    ['createdAt', beet.i64],
    ['creationWeek', beet.i64],
    ['creation3Day', beet.i64],
    ['creationDay', beet.i64],
    ['modifiedAt', beet.coption(beet.i64)],
  ],
  Connection.fromArgs,
  'Connection',
);
