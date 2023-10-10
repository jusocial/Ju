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
exports.appDataBeet = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
exports.appDataBeet = new beet.FixableBeetArgsStruct([
    ['metadataUri', beet.coption(beet.utf8String)],
    ['profileFirstNameRequired', beet.bool],
    ['profileLastNameRequired', beet.bool],
    ['profileBirthdateRequired', beet.bool],
    ['profileCountryRequired', beet.bool],
    ['profileCityRequired', beet.bool],
    ['profileMetadataUriRequired', beet.bool],
    ['subspaceNameRequired', beet.bool],
    ['subspaceMetadataUriRequired', beet.bool],
    ['profileDeleteAllowed', beet.bool],
    ['subspaceDeleteAllowed', beet.bool],
    ['publicationDeleteAllowed', beet.bool],
    ['profileIndividualProcessorsAllowed', beet.bool],
    ['subspaceIndividualProcessorsAllowed', beet.bool],
    ['publicationIndividualProcessorsAllowed', beet.bool],
], 'AppData');
//# sourceMappingURL=AppData.js.map