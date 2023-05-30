import * as beet from '@metaplex-foundation/beet';
export declare enum ContentType {
    Article = 0,
    Image = 1,
    Video = 2,
    ShortVideo = 3,
    Audio = 4,
    Text = 5,
    Link = 6
}
export declare const contentTypeBeet: beet.FixedSizeBeet<ContentType, ContentType>;
