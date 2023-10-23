import * as beet from '@metaplex-foundation/beet';
export declare enum Gender {
    NotSpecified = 0,
    Male = 1,
    Female = 2,
    OtherOrPreferNotToSay = 3
}
export declare const genderBeet: beet.FixedSizeBeet<Gender, Gender>;
