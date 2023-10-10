import * as beet from '@metaplex-foundation/beet';
export type SubspaceData = {
    alias: beet.COption<string>;
    name: beet.COption<string>;
    metadataUri: beet.COption<string>;
};
export declare const subspaceDataBeet: beet.FixableBeetArgsStruct<SubspaceData>;
