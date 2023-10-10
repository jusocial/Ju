import * as beet from '@metaplex-foundation/beet';
export type LocationCoordinates = {
    latitude: beet.bignum;
    longitude: beet.bignum;
};
export declare const locationCoordinatesBeet: beet.BeetArgsStruct<LocationCoordinates>;
