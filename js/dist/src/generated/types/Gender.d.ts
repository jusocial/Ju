import * as beet from '@metaplex-foundation/beet';
export declare enum Gender {
    Male = 0,
    Female = 1,
    OtherOrPreferNotToSay = 2
}
export declare const genderBeet: beet.FixedSizeBeet<Gender, Gender>;
