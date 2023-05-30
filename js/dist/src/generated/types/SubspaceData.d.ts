import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type SubspaceData = {
    uuid: string;
    alias: beet.COption<string>;
    creator: web3.PublicKey;
    metadataUri: string;
};
export declare const subspaceDataBeet: beet.FixableBeetArgsStruct<SubspaceData>;
