import * as beet from '@metaplex-foundation/beet';
import { SubspacePublishingPermissionLevel } from './SubspacePublishingPermissionLevel';
export type SubspaceData = {
    alias: beet.COption<string>;
    name: string;
    publishingPermission: SubspacePublishingPermissionLevel;
    metadataUri: beet.COption<string>;
};
export declare const subspaceDataBeet: beet.FixableBeetArgsStruct<SubspaceData>;
