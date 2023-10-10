import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export type CollectPublicationInstructionArgs = {
    externalProcessingData: beet.COption<string>;
};
export declare const collectPublicationStruct: beet.FixableBeetArgsStruct<CollectPublicationInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export type CollectPublicationInstructionAccounts = {
    app: web3.PublicKey;
    initializer: web3.PublicKey;
    target: web3.PublicKey;
    collectionItem: web3.PublicKey;
    authority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const collectPublicationInstructionDiscriminator: number[];
export declare function createCollectPublicationInstruction(accounts: CollectPublicationInstructionAccounts, args: CollectPublicationInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
