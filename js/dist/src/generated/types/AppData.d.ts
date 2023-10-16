import * as beet from '@metaplex-foundation/beet';
export type AppData = {
    metadataUri: beet.COption<string>;
    profileMetadataRequired: boolean;
    subspaceMetadataRequired: boolean;
    profileDeleteAllowed: boolean;
    subspaceDeleteAllowed: boolean;
    publicationDeleteAllowed: boolean;
    profileIndividualProcessorsAllowed: boolean;
    subspaceIndividualProcessorsAllowed: boolean;
    publicationIndividualProcessorsAllowed: boolean;
};
export declare const appDataBeet: beet.FixableBeetArgsStruct<AppData>;
