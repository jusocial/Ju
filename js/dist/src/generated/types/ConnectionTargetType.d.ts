import * as beet from '@metaplex-foundation/beet';
export declare enum ConnectionTargetType {
    Profile = 0,
    Subspace = 1
}
export declare const connectionTargetTypeBeet: beet.FixedSizeBeet<ConnectionTargetType, ConnectionTargetType>;
