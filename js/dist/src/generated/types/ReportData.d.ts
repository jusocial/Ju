import * as beet from '@metaplex-foundation/beet';
import { ReportType } from './ReportType';
export type ReportData = {
    reportType: ReportType;
    notificationString: beet.COption<string>;
};
export declare const reportDataBeet: beet.FixableBeetArgsStruct<ReportData>;
