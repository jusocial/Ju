import * as beet from '@metaplex-foundation/beet';
import { LocationCoordinates } from './LocationCoordinates';
export type ProfileData = {
    alias: beet.COption<string>;
    metadataUri: beet.COption<string>;
    statusText: beet.COption<string>;
    firstName: beet.COption<string>;
    lastName: beet.COption<string>;
    birthDate: beet.COption<beet.bignum>;
    countryCode: beet.COption<number>;
    cityCode: beet.COption<number>;
    currentLocation: beet.COption<LocationCoordinates>;
};
export declare const profileDataBeet: beet.FixableBeetArgsStruct<ProfileData>;
