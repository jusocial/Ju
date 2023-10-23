import * as beet from '@metaplex-foundation/beet';
export declare enum ContentType {
    NotSpecified = 0,
    Article = 1,
    Image = 2,
    Video = 3,
    ShortVideo = 4,
    Audio = 5,
    Text = 6,
    Document = 7,
    Link = 8,
    Poll = 9
}
export declare const contentTypeBeet: beet.FixedSizeBeet<ContentType, ContentType>;
