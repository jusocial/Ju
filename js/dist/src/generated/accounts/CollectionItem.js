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
exports.collectionItemBeet = exports.CollectionItem = exports.collectionItemDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
exports.collectionItemDiscriminator = [225, 72, 84, 206, 193, 134, 215, 4];
class CollectionItem {
    constructor(app, initializer, target, authority, createdAt, creationWeek, creation3Day, creationDay) {
        this.app = app;
        this.initializer = initializer;
        this.target = target;
        this.authority = authority;
        this.createdAt = createdAt;
        this.creationWeek = creationWeek;
        this.creation3Day = creation3Day;
        this.creationDay = creationDay;
    }
    static fromArgs(args) {
        return new CollectionItem(args.app, args.initializer, args.target, args.authority, args.createdAt, args.creationWeek, args.creation3Day, args.creationDay);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return CollectionItem.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find CollectionItem account at ${address}`);
        }
        return CollectionItem.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.collectionItemBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.collectionItemBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.collectionItemBeet.serialize({
            accountDiscriminator: exports.collectionItemDiscriminator,
            ...this,
        });
    }
    static get byteSize() {
        return exports.collectionItemBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(CollectionItem.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === CollectionItem.byteSize;
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            initializer: this.initializer.toBase58(),
            target: this.target.toBase58(),
            authority: this.authority.toBase58(),
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
        };
    }
}
exports.CollectionItem = CollectionItem;
exports.collectionItemBeet = new beet.BeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['initializer', beetSolana.publicKey],
    ['target', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['createdAt', beet.i64],
    ['creationWeek', beet.i64],
    ['creation3Day', beet.i64],
    ['creationDay', beet.i64],
], CollectionItem.fromArgs, 'CollectionItem');
//# sourceMappingURL=CollectionItem.js.map