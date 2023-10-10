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
exports.reportTypeBeet = exports.ReportType = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
var ReportType;
(function (ReportType) {
    ReportType[ReportType["Scam"] = 0] = "Scam";
    ReportType[ReportType["Phishing"] = 1] = "Phishing";
    ReportType[ReportType["Abuse"] = 2] = "Abuse";
    ReportType[ReportType["Spam"] = 3] = "Spam";
    ReportType[ReportType["HateSpeech"] = 4] = "HateSpeech";
    ReportType[ReportType["Harassment"] = 5] = "Harassment";
    ReportType[ReportType["Misinformation"] = 6] = "Misinformation";
    ReportType[ReportType["Violence"] = 7] = "Violence";
    ReportType[ReportType["Threats"] = 8] = "Threats";
    ReportType[ReportType["Copyright"] = 9] = "Copyright";
    ReportType[ReportType["Adult"] = 10] = "Adult";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
exports.reportTypeBeet = beet.fixedScalarEnum(ReportType);
//# sourceMappingURL=ReportType.js.map