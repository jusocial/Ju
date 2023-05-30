import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type ProfileData = {
    alias: beet.COption<string>;
    metadataUri: string;
    connectingProcessorToAssign: beet.COption<web3.PublicKey>;
};
export declare const profileDataBeet: beet.FixableBeetArgsStruct<ProfileData>;
