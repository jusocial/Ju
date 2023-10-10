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
exports.profileDataBeet = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const LocationCoordinates_1 = require("./LocationCoordinates");
exports.profileDataBeet = new beet.FixableBeetArgsStruct([
    ['alias', beet.coption(beet.utf8String)],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['statusText', beet.coption(beet.utf8String)],
    ['firstName', beet.coption(beet.utf8String)],
    ['lastName', beet.coption(beet.utf8String)],
    ['birthDate', beet.coption(beet.i64)],
    ['countryCode', beet.coption(beet.i16)],
    ['cityCode', beet.coption(beet.u16)],
    ['currentLocation', beet.coption(LocationCoordinates_1.locationCoordinatesBeet)],
], 'ProfileData');
//# sourceMappingURL=ProfileData.js.map