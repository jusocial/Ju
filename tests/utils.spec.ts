import * as anchor from '@project-serum/anchor';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const provider = anchor.getProvider();

export async function airdrop(key: PublicKey) {
    const airdropSig = await provider.connection.requestAirdrop(key, 1 * LAMPORTS_PER_SOL);
    return provider.connection.confirmTransaction(airdropSig);
}

export function birthDate(year: number, month: number, day: number) {
    let birthDate = new Date();
    birthDate.setUTCFullYear(year);
    birthDate.setUTCMonth(month);
    birthDate.setUTCDate(day);
    birthDate.setUTCHours(0);
    birthDate.setUTCMinutes(0);
    birthDate.setUTCSeconds(0);
    birthDate.setUTCMilliseconds(0);
    const unixTimestamp = Math.floor(birthDate.getTime() / 1000).toString();
    // console.log('unixTimestamp :>> ', unixTimestamp);
    return new anchor.BN(unixTimestamp);
}

export const toText = (bytes: number[]): string => {
    let result = '';
    for (let i = 0; i < bytes.length; ++i) {
        const byte = bytes[i];
        if (byte === 0) {
            continue; // TODO: Stop if a null byte is encountered ?
        }
        const text = byte.toString(16);
        result += (byte < 16 ? '%0' : '%') + text;
    }
    return decodeURIComponent(result);
};

export function ageToUnixTimestampYears(age: number, n: number): number {
    // Get the current year
    const currentYear: number = new Date().getFullYear();

    // Calculate the birth year
    const birthYear: number = currentYear - age;

    // Get the Unix timestamp for the start of the birth year (January 1)
    const birthTimestamp: number = new Date(`${birthYear}-01-01`).getTime() / 1000; // Convert to seconds

    // Extract the first n digits from the Unix timestamp
    const yearDigits: number = parseInt(Math.floor(birthTimestamp).toString().slice(0, n));

    return yearDigits;
}