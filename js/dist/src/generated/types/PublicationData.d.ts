import * as beet from '@metaplex-foundation/beet';
import { ContentType } from './ContentType';
export type PublicationData = {
    uuid: string;
    metadataUri: string;
    isMirror: boolean;
    isReply: boolean;
    contentType: ContentType;
};
export declare const publicationDataBeet: beet.FixableBeetArgsStruct<PublicationData>;
