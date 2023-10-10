/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
export type LocationCoordinates = {
  latitude: beet.bignum;
  longitude: beet.bignum;
};

/**
 * @category userTypes
 * @category generated
 */
export const locationCoordinatesBeet = new beet.BeetArgsStruct<LocationCoordinates>(
  [
    ['latitude', beet.u64],
    ['longitude', beet.u64],
  ],
  'LocationCoordinates',
);
