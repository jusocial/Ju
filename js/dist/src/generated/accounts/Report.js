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
const ReportType_1 = require("../types/ReportType");
exports.reportDiscriminator = [232, 246, 229, 227, 242, 105, 190, 2];
class Report {
    constructor(app, authority, initializerProfile, target, reportType, notification, createdAt) {
        this.app = app;
        this.authority = authority;
        this.initializerProfile = initializerProfile;
        this.target = target;
        this.reportType = reportType;
        this.notification = notification;
        this.createdAt = createdAt;
    }
    static fromArgs(args) {
        return new Report(args.app, args.authority, args.initializerProfile, args.target, args.reportType, args.notification, args.createdAt);
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
            initializerProfile: this.initializerProfile.toBase58(),
            target: this.target.toBase58(),
            reportType: 'ReportType.' + ReportType_1.ReportType[this.reportType],
            notification: this.notification,
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
        };
    }
}
exports.Report = Report;
exports.reportBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['initializerProfile', beetSolana.publicKey],
    ['target', beetSolana.publicKey],
    ['reportType', ReportType_1.reportTypeBeet],
    ['notification', beet.coption(beet.utf8String)],
    ['createdAt', beet.i64],
], Report.fromArgs, 'Report');
//# sourceMappingURL=Report.js.map