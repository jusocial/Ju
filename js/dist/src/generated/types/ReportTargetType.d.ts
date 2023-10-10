import * as beet from '@metaplex-foundation/beet';
export declare enum ReportTargetType {
    Profile = 0,
    Subspace = 1,
    Publication = 2
}
export declare const reportTargetTypeBeet: beet.FixedSizeBeet<ReportTargetType, ReportTargetType>;
