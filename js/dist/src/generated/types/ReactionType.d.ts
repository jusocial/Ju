import * as beet from '@metaplex-foundation/beet';
export declare enum ReactionType {
    UpVote = 0,
    DownVote = 1,
    CustomVote = 2
}
export declare const reactionTypeBeet: beet.FixedSizeBeet<ReactionType, ReactionType>;
