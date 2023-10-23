"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportBeet = exports.Report = exports.reportDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const ReportTargetType_1 = require("../types/ReportTargetType");
const ReportType_1 = require("../types/ReportType");
exports.reportDiscriminator = [232, 246, 229, 227, 242, 105, 190, 2];
class Report {
    constructor(app, authority, targetType, target, initializer, reportType, createdAt, creationWeek, creation3Day, creationDay, notification) {
        this.app = app;
        this.authority = authority;
        this.targetType = targetType;
        this.target = target;
        this.initializer = initializer;
        this.reportType = reportType;
        this.createdAt = createdAt;
        this.creationWeek = creationWeek;
        this.creation3Day = creation3Day;
        this.creationDay = creationDay;
        this.notification = notification;
    }
    static fromArgs(args) {
        return new Report(args.app, args.authority, args.targetType, args.target, args.initializer, args.reportType, args.createdAt, args.creationWeek, args.creation3Day, args.creationDay, args.notification);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Report.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Report account at ${address}`);
        }
        return Report.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.reportBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.reportBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.reportBeet.serialize({
            accountDiscriminator: exports.reportDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Report.fromArgs(args);
        return exports.reportBeet.toFixedFromValue({
            accountDiscriminator: exports.reportDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Report.byteSize(args), commitment);
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            authority: this.authority.toBase58(),
            targetType: 'ReportTargetType.' + ReportTargetType_1.ReportTargetType[this.targetType],
            target: this.target.toBase58(),
            initializer: this.initializer.toBase58(),
            reportType: 'ReportType.' + ReportType_1.ReportType[this.reportType],
            createdAt: (() => {
                const x = this.createdAt;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            creationWeek: (() => {
                const x = this.creationWeek;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            creation3Day: (() => {
                const x = this.creation3Day;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            creationDay: (() => {
                const x = this.creationDay;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            notification: this.notification,
        };
    }
}
exports.Report = Report;
exports.reportBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['targetType', ReportTargetType_1.reportTargetTypeBeet],
    ['target', beetSolana.publicKey],
    ['initializer', beetSolana.publicKey],
    ['reportType', ReportType_1.reportTypeBeet],
    ['createdAt', beet.i64],
    ['creationWeek', beet.i64],
    ['creation3Day', beet.i64],
    ['creationDay', beet.i64],
    ['notification', beet.coption(beet.utf8String)],
], Report.fromArgs, 'Report');
//# sourceMappingURL=Report.js.map