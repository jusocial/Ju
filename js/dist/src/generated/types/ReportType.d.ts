import * as beet from '@metaplex-foundation/beet';
export declare enum ReportType {
    Scam = 0,
    Phishing = 1,
    Abuse = 2,
    Spam = 3,
    HateSpeech = 4,
    Harassment = 5,
    Misinformation = 6,
    Violence = 7,
    Threats = 8,
    Copyright = 9,
    Adult = 10
}
export declare const reportTypeBeet: beet.FixedSizeBeet<ReportType, ReportType>;
