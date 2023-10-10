import * as beet from '@metaplex-foundation/beet';
export declare enum ManagementRoleType {
    Admin = 0,
    Publisher = 1
}
export declare const managementRoleTypeBeet: beet.FixedSizeBeet<ManagementRoleType, ManagementRoleType>;
