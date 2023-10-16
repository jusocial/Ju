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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountProviders = void 0;
__exportStar(require("./Alias"), exports);
__exportStar(require("./App"), exports);
__exportStar(require("./CollectionItem"), exports);
__exportStar(require("./Connection"), exports);
__exportStar(require("./DeveloperWhitelistProof"), exports);
__exportStar(require("./ExternalProcessorPDA"), exports);
__exportStar(require("./Profile"), exports);
__exportStar(require("./Publication"), exports);
__exportStar(require("./Reaction"), exports);
__exportStar(require("./Report"), exports);
__exportStar(require("./Subspace"), exports);
__exportStar(require("./SubspaceManager"), exports);
const DeveloperWhitelistProof_1 = require("./DeveloperWhitelistProof");
const ExternalProcessorPDA_1 = require("./ExternalProcessorPDA");
const App_1 = require("./App");
const Profile_1 = require("./Profile");
const Subspace_1 = require("./Subspace");
const SubspaceManager_1 = require("./SubspaceManager");
const Publication_1 = require("./Publication");
const Connection_1 = require("./Connection");
const CollectionItem_1 = require("./CollectionItem");
const Alias_1 = require("./Alias");
const Reaction_1 = require("./Reaction");
const Report_1 = require("./Report");
exports.accountProviders = {
    DeveloperWhitelistProof: DeveloperWhitelistProof_1.DeveloperWhitelistProof,
    ExternalProcessorPDA: ExternalProcessorPDA_1.ExternalProcessorPDA,
    App: App_1.App,
    Profile: Profile_1.Profile,
    Subspace: Subspace_1.Subspace,
    SubspaceManager: SubspaceManager_1.SubspaceManager,
    Publication: Publication_1.Publication,
    Connection: Connection_1.Connection,
    CollectionItem: CollectionItem_1.CollectionItem,
    Alias: Alias_1.Alias,
    Reaction: Reaction_1.Reaction,
    Report: Report_1.Report,
};
//# sourceMappingURL=index.js.map