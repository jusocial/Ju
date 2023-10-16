import * as beet from '@metaplex-foundation/beet';
import { Gender } from './Gender';
import { LocationCoordinates } from './LocationCoordinates';
export type ProfileData = {
    alias: beet.COption<string>;
    metadataUri: beet.COption<string>;
    statusText: string;
    gender: beet.COption<Gender>;
    firstName: string;
    lastName: string;
    birthDate: beet.bignum;
    countryCode: number;
    regionCode: number;
    cityCode: number;
    currentLocation: beet.COption<LocationCoordinates>;
};
export declare const profileDataBeet: beet.FixableBeetArgsStruct<ProfileData>;
