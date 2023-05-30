import * as beet from '@metaplex-foundation/beet';
export declare enum ReportType {
    Scam = 0,
    Abuse = 1
}
export declare const reportTypeBeet: beet.FixedSizeBeet<ReportType, ReportType>;
