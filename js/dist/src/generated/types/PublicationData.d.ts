import * as beet from '@metaplex-foundation/beet';
import { ContentType } from './ContentType';
export type PublicationData = {
    isEncrypted: boolean;
    metadataUri: string;
    isMirror: boolean;
    isReply: boolean;
    contentType: ContentType;
    tag: beet.COption<string>;
};
export declare const publicationDataBeet: beet.FixableBeetArgsStruct<PublicationData>;
