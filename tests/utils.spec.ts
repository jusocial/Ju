import * as anchor from '@project-serum/anchor';
import {PublicKey, LAMPORTS_PER_SOL} from '@solana/web3.js';

const provider = anchor.getProvider();

export async function airdrop(key: PublicKey) {
    const airdropSig = await provider.connection.requestAirdrop(key, 1 * LAMPORTS_PER_SOL);
    return provider.connection.confirmTransaction(airdropSig);
}

export function birthDate(year: number, month: number, day: number) {
    const birthDate = new Date(year, month, day);
    const unixTimestamp = Math.floor(birthDate.getTime() / 1000).toString();
    return new anchor.BN(unixTimestamp);
}