import * as beet from '@metaplex-foundation/beet';
export type ReactionTypeRecord = {
    UpVote: void;
    DownVote: void;
    CustomVote: {
        code: number;
    };
};
export type ReactionType = beet.DataEnumKeyAsKind<ReactionTypeRecord>;
export declare const isReactionTypeUpVote: (x: ReactionType) => x is {
    __kind: "UpVote";
} & Omit<void, "void"> & {
    __kind: 'UpVote';
};
export declare const isReactionTypeDownVote: (x: ReactionType) => x is {
    __kind: "DownVote";
} & Omit<void, "void"> & {
    __kind: 'DownVote';
};
export declare const isReactionTypeCustomVote: (x: ReactionType) => x is {
    __kind: "CustomVote";
} & Omit<{
    code: number;
}, "void"> & {
    __kind: 'CustomVote';
};
export declare const reactionTypeBeet: beet.FixableBeet<ReactionType, ReactionType>;
