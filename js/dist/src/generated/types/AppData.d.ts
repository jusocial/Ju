import * as beet from '@metaplex-foundation/beet';
export type AppData = {
    metadataUri: beet.COption<string>;
    isProfileDeleteAllowed: boolean;
    isSubspaceDeleteAllowed: boolean;
    isPublicationDeleteAllowed: boolean;
    isProfileIndividualProcessorsAllowed: boolean;
    isSubspaceIndividualProcessorsAllowed: boolean;
    isPublicationIndividualProcessorsAllowed: boolean;
};
export declare const appDataBeet: beet.FixableBeetArgsStruct<AppData>;
