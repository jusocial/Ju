import * as beet from '@metaplex-foundation/beet';
export declare enum ReactionTargetType {
    Profile = 0,
    Publication = 1
}
export declare const reactionTargetTypeBeet: beet.FixedSizeBeet<ReactionTargetType, ReactionTargetType>;
