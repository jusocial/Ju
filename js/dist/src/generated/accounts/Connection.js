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
exports.connectionBeet = exports.Connection = exports.connectionDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const ConnectionTargetType_1 = require("../types/ConnectionTargetType");
exports.connectionDiscriminator = [209, 186, 115, 58, 36, 236, 179, 10];
class Connection {
    constructor(app, authority, connectionTargetType, initializer, target, isApproved, createdAt, creationWeek, creation3Day, creationDay, modifiedAt) {
        this.app = app;
        this.authority = authority;
        this.connectionTargetType = connectionTargetType;
        this.initializer = initializer;
        this.target = target;
        this.isApproved = isApproved;
        this.createdAt = createdAt;
        this.creationWeek = creationWeek;
        this.creation3Day = creation3Day;
        this.creationDay = creationDay;
        this.modifiedAt = modifiedAt;
    }
    static fromArgs(args) {
        return new Connection(args.app, args.authority, args.connectionTargetType, args.initializer, args.target, args.isApproved, args.createdAt, args.creationWeek, args.creation3Day, args.creationDay, args.modifiedAt);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Connection.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Connection account at ${address}`);
        }
        return Connection.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.connectionBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.connectionBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.connectionBeet.serialize({
            accountDiscriminator: exports.connectionDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Connection.fromArgs(args);
        return exports.connectionBeet.toFixedFromValue({
            accountDiscriminator: exports.connectionDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Connection.byteSize(args), commitment);
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            authority: this.authority.toBase58(),
            connectionTargetType: 'ConnectionTargetType.' + ConnectionTargetType_1.ConnectionTargetType[this.connectionTargetType],
            initializer: this.initializer.toBase58(),
            target: this.target.toBase58(),
            isApproved: this.isApproved,
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
            modifiedAt: this.modifiedAt,
        };
    }
}
exports.Connection = Connection;
exports.connectionBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['connectionTargetType', ConnectionTargetType_1.connectionTargetTypeBeet],
    ['initializer', beetSolana.publicKey],
    ['target', beetSolana.publicKey],
    ['isApproved', beet.bool],
    ['createdAt', beet.i64],
    ['creationWeek', beet.i64],
    ['creation3Day', beet.i64],
    ['creationDay', beet.i64],
    ['modifiedAt', beet.coption(beet.i64)],
], Connection.fromArgs, 'Connection');
//# sourceMappingURL=Connection.js.map