import * as beet from '@metaplex-foundation/beet';
export declare enum SubspacePublishingPermissionLevel {
    All = 0,
    AllMembers = 1,
    ApprovedMembers = 2,
    Admins = 3,
    Owner = 4
}
export declare const subspacePublishingPermissionLevelBeet: beet.FixedSizeBeet<SubspacePublishingPermissionLevel, SubspacePublishingPermissionLevel>;
