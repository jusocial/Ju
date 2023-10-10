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
exports.profileBeet = exports.Profile = exports.profileDiscriminator = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const LocationCoordinates_1 = require("../types/LocationCoordinates");
exports.profileDiscriminator = [184, 101, 165, 188, 95, 63, 127, 188];
class Profile {
    constructor(app, authority, alias, metadataUri, statusText, verified, firstName, lastName, birthDate, countryCode, cityCode, currentLocation, connectingProcessor, createdAt, modifiedAt) {
        this.app = app;
        this.authority = authority;
        this.alias = alias;
        this.metadataUri = metadataUri;
        this.statusText = statusText;
        this.verified = verified;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.countryCode = countryCode;
        this.cityCode = cityCode;
        this.currentLocation = currentLocation;
        this.connectingProcessor = connectingProcessor;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
    static fromArgs(args) {
        return new Profile(args.app, args.authority, args.alias, args.metadataUri, args.statusText, args.verified, args.firstName, args.lastName, args.birthDate, args.countryCode, args.cityCode, args.currentLocation, args.connectingProcessor, args.createdAt, args.modifiedAt);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return Profile.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address, commitmentOrConfig) {
        const accountInfo = await connection.getAccountInfo(address, commitmentOrConfig);
        if (accountInfo == null) {
            throw new Error(`Unable to find Profile account at ${address}`);
        }
        return Profile.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('964vWgVEK9X8ZwZB2HyshFVmHUWbcYpRTnVYz2o3F2Xq')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.profileBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.profileBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.profileBeet.serialize({
            accountDiscriminator: exports.profileDiscriminator,
            ...this,
        });
    }
    static byteSize(args) {
        const instance = Profile.fromArgs(args);
        return exports.profileBeet.toFixedFromValue({
            accountDiscriminator: exports.profileDiscriminator,
            ...instance,
        }).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(Profile.byteSize(args), commitment);
    }
    pretty() {
        return {
            app: this.app.toBase58(),
            authority: this.authority.toBase58(),
            alias: this.alias,
            metadataUri: this.metadataUri,
            statusText: this.statusText,
            verified: this.verified,
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            countryCode: this.countryCode,
            cityCode: this.cityCode,
            currentLocation: this.currentLocation,
            connectingProcessor: this.connectingProcessor,
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
            modifiedAt: this.modifiedAt,
        };
    }
}
exports.Profile = Profile;
exports.profileBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['alias', beet.coption(beet.utf8String)],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['statusText', beet.coption(beet.utf8String)],
    ['verified', beet.bool],
    ['firstName', beet.coption(beet.utf8String)],
    ['lastName', beet.coption(beet.utf8String)],
    ['birthDate', beet.coption(beet.i64)],
    ['countryCode', beet.coption(beet.i16)],
    ['cityCode', beet.coption(beet.u16)],
    ['currentLocation', beet.coption(LocationCoordinates_1.locationCoordinatesBeet)],
    ['connectingProcessor', beet.coption(beetSolana.publicKey)],
    ['createdAt', beet.i64],
    ['modifiedAt', beet.coption(beet.i64)],
], Profile.fromArgs, 'Profile');
//# sourceMappingURL=Profile.js.map