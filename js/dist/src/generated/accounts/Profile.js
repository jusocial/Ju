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
const Gender_1 = require("../types/Gender");
const LocationCoordinates_1 = require("../types/LocationCoordinates");
exports.profileDiscriminator = [184, 101, 165, 188, 95, 63, 127, 188];
class Profile {
    constructor(app, authority, exchangeKey, isVerified, countryCode, regionCode, cityCode, firstName, lastName, birthDate, searchable10Years, searchable5Years, searchableWeek, searchableDay, gender, alias, statusText, metadataUri, currentLocation, connectingProcessor, createdAt, modifiedAt, reserved1, reserved2, reserved3) {
        this.app = app;
        this.authority = authority;
        this.exchangeKey = exchangeKey;
        this.isVerified = isVerified;
        this.countryCode = countryCode;
        this.regionCode = regionCode;
        this.cityCode = cityCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.searchable10Years = searchable10Years;
        this.searchable5Years = searchable5Years;
        this.searchableWeek = searchableWeek;
        this.searchableDay = searchableDay;
        this.gender = gender;
        this.alias = alias;
        this.statusText = statusText;
        this.metadataUri = metadataUri;
        this.currentLocation = currentLocation;
        this.connectingProcessor = connectingProcessor;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.reserved1 = reserved1;
        this.reserved2 = reserved2;
        this.reserved3 = reserved3;
    }
    static fromArgs(args) {
        return new Profile(args.app, args.authority, args.exchangeKey, args.isVerified, args.countryCode, args.regionCode, args.cityCode, args.firstName, args.lastName, args.birthDate, args.searchable10Years, args.searchable5Years, args.searchableWeek, args.searchableDay, args.gender, args.alias, args.statusText, args.metadataUri, args.currentLocation, args.connectingProcessor, args.createdAt, args.modifiedAt, args.reserved1, args.reserved2, args.reserved3);
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
            exchangeKey: this.exchangeKey.toBase58(),
            isVerified: this.isVerified,
            countryCode: this.countryCode,
            regionCode: this.regionCode,
            cityCode: this.cityCode,
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: (() => {
                const x = this.birthDate;
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
            searchable10Years: (() => {
                const x = this.searchable10Years;
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
            searchable5Years: (() => {
                const x = this.searchable5Years;
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
            searchableWeek: (() => {
                const x = this.searchableWeek;
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
            searchableDay: (() => {
                const x = this.searchableDay;
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
            gender: this.gender,
            alias: this.alias,
            statusText: this.statusText,
            metadataUri: this.metadataUri,
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
            reserved1: this.reserved1,
            reserved2: this.reserved2,
            reserved3: this.reserved3,
        };
    }
}
exports.Profile = Profile;
exports.profileBeet = new beet.FixableBeetStruct([
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['app', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['exchangeKey', beetSolana.publicKey],
    ['isVerified', beet.bool],
    ['countryCode', beet.u16],
    ['regionCode', beet.u16],
    ['cityCode', beet.u16],
    ['firstName', beet.uniformFixedSizeArray(beet.u8, 20)],
    ['lastName', beet.uniformFixedSizeArray(beet.u8, 30)],
    ['birthDate', beet.i64],
    ['searchable10Years', beet.i64],
    ['searchable5Years', beet.i64],
    ['searchableWeek', beet.i64],
    ['searchableDay', beet.i64],
    ['gender', beet.coption(Gender_1.genderBeet)],
    ['alias', beet.coption(beet.utf8String)],
    ['statusText', beet.utf8String],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['currentLocation', beet.coption(LocationCoordinates_1.locationCoordinatesBeet)],
    ['connectingProcessor', beet.coption(beetSolana.publicKey)],
    ['createdAt', beet.i64],
    ['modifiedAt', beet.coption(beet.i64)],
    ['reserved1', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['reserved2', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['reserved3', beet.uniformFixedSizeArray(beet.u8, 32)],
], Profile.fromArgs, 'Profile');
//# sourceMappingURL=Profile.js.map