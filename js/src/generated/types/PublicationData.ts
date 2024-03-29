/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import { ContentType, contentTypeBeet } from './ContentType';
export type PublicationData = {
  isEncrypted: boolean;
  metadataUri: string;
  isMirror: boolean;
  isReply: boolean;
  contentType: ContentType;
  tag: string;
};

/**
 * @category userTypes
 * @category generated
 */
export const publicationDataBeet = new beet.FixableBeetArgsStruct<PublicationData>(
  [
    ['isEncrypted', beet.bool],
    ['metadataUri', beet.utf8String],
    ['isMirror', beet.bool],
    ['isReply', beet.bool],
    ['contentType', contentTypeBeet],
    ['tag', beet.utf8String],
  ],
  'PublicationData',
);
