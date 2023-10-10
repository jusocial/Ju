import * as beet from '@metaplex-foundation/beet';
export type AppData = {
    metadataUri: beet.COption<string>;
    profileFirstNameRequired: boolean;
    profileLastNameRequired: boolean;
    profileBirthdateRequired: boolean;
    profileCountryRequired: boolean;
    profileCityRequired: boolean;
    profileMetadataUriRequired: boolean;
    subspaceNameRequired: boolean;
    subspaceMetadataUriRequired: boolean;
    profileDeleteAllowed: boolean;
    subspaceDeleteAllowed: boolean;
    publicationDeleteAllowed: boolean;
    profileIndividualProcessorsAllowed: boolean;
    subspaceIndividualProcessorsAllowed: boolean;
    publicationIndividualProcessorsAllowed: boolean;
};
export declare const appDataBeet: beet.FixableBeetArgsStruct<AppData>;
