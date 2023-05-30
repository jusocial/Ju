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
exports.reactionTypeBeet = exports.ReactionType = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
var ReactionType;
(function (ReactionType) {
    ReactionType[ReactionType["UpVote"] = 0] = "UpVote";
    ReactionType[ReactionType["DownVote"] = 1] = "DownVote";
    ReactionType[ReactionType["CustomVote"] = 2] = "CustomVote";
})(ReactionType = exports.ReactionType || (exports.ReactionType = {}));
exports.reactionTypeBeet = beet.fixedScalarEnum(ReactionType);
//# sourceMappingURL=ReactionType.js.map