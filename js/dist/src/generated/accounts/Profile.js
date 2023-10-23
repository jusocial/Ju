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
exports.profileDiscriminator = [184, 101, 165, 188, 95, 63, 127, 188];
class Profile {
    constructor(app, authority, exchangeKey, isVerified, gender, personalData1, personalData2, personalData3, personalData4, personalData5, personalData6, personalData7, personalData8, reserved1, reserved2, reserved3, reserved4, reserved5, reserved6, reserved7, reserved8, firstName, lastName, birthDate, birthDate10Years, birthDate5Years, birthDateYear, countryCode, regionCode, cityCode, creationYear, creationMonth, creationWeek, creationDay, alias, metadataUri, connectingProcessor, createdAt, modifiedAt) {
        this.app = app;
        this.authority = authority;
        this.exchangeKey = exchangeKey;
        this.isVerified = isVerified;
        this.gender = gender;
        this.personalData1 = personalData1;
        this.personalData2 = personalData2;
        this.personalData3 = personalData3;
        this.personalData4 = personalData4;
        this.personalData5 = personalData5;
        this.personalData6 = personalData6;
        this.personalData7 = personalData7;
        this.personalData8 = personalData8;
        this.reserved1 = reserved1;
        this.reserved2 = reserved2;
        this.reserved3 = reserved3;
        this.reserved4 = reserved4;
        this.reserved5 = reserved5;
        this.reserved6 = reserved6;
        this.reserved7 = reserved7;
        this.reserved8 = reserved8;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.birthDate10Years = birthDate10Years;
        this.birthDate5Years = birthDate5Years;
        this.birthDateYear = birthDateYear;
        this.countryCode = countryCode;
        this.regionCode = regionCode;
        this.cityCode = cityCode;
        this.creationYear = creationYear;
        this.creationMonth = creationMonth;
        this.creationWeek = creationWeek;
        this.creationDay = creationDay;
        this.alias = alias;
        this.metadataUri = metadataUri;
        this.connectingProcessor = connectingProcessor;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
    static fromArgs(args) {
        return new Profile(args.app, args.authority, args.exchangeKey, args.isVerified, args.gender, args.personalData1, args.personalData2, args.personalData3, args.personalData4, args.personalData5, args.personalData6, args.personalData7, args.personalData8, args.reserved1, args.reserved2, args.reserved3, args.reserved4, args.reserved5, args.reserved6, args.reserved7, args.reserved8, args.firstName, args.lastName, args.birthDate, args.birthDate10Years, args.birthDate5Years, args.birthDateYear, args.countryCode, args.regionCode, args.cityCode, args.creationYear, args.creationMonth, args.creationWeek, args.creationDay, args.alias, args.metadataUri, args.connectingProcessor, args.createdAt, args.modifiedAt);
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
            gender: 'Gender.' + Gender_1.Gender[this.gender],
            personalData1: this.personalData1,
            personalData2: this.personalData2,
            personalData3: this.personalData3,
            personalData4: this.personalData4,
            personalData5: this.personalData5,
            personalData6: this.personalData6,
            personalData7: this.personalData7,
            personalData8: this.personalData8,
            reserved1: this.reserved1,
            reserved2: this.reserved2,
            reserved3: this.reserved3,
            reserved4: this.reserved4,
            reserved5: (() => {
                const x = this.reserved5;
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
            reserved6: (() => {
                const x = this.reserved6;
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
            reserved7: this.reserved7,
            reserved8: this.reserved8,
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
            birthDate10Years: (() => {
                const x = this.birthDate10Years;
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
            birthDate5Years: (() => {
                const x = this.birthDate5Years;
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
            birthDateYear: (() => {
                const x = this.birthDateYear;
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
            countryCode: this.countryCode,
            regionCode: this.regionCode,
            cityCode: this.cityCode,
            creationYear: (() => {
                const x = this.creationYear;
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
            creationMonth: (() => {
                const x = this.creationMonth;
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
            alias: this.alias,
            metadataUri: this.metadataUri,
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
    ['exchangeKey', beetSolana.publicKey],
    ['isVerified', beet.bool],
    ['gender', Gender_1.genderBeet],
    ['personalData1', beet.u8],
    ['personalData2', beet.u8],
    ['personalData3', beet.u8],
    ['personalData4', beet.u8],
    ['personalData5', beet.u8],
    ['personalData6', beet.u8],
    ['personalData7', beet.u8],
    ['personalData8', beet.u8],
    ['reserved1', beet.i16],
    ['reserved2', beet.i16],
    ['reserved3', beet.i32],
    ['reserved4', beet.i32],
    ['reserved5', beet.i64],
    ['reserved6', beet.i64],
    ['reserved7', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['reserved8', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['firstName', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['lastName', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['birthDate', beet.i64],
    ['birthDate10Years', beet.i64],
    ['birthDate5Years', beet.i64],
    ['birthDateYear', beet.i64],
    ['countryCode', beet.u16],
    ['regionCode', beet.u16],
    ['cityCode', beet.u16],
    ['creationYear', beet.i64],
    ['creationMonth', beet.i64],
    ['creationWeek', beet.i64],
    ['creationDay', beet.i64],
    ['alias', beet.coption(beet.utf8String)],
    ['metadataUri', beet.coption(beet.utf8String)],
    ['connectingProcessor', beet.coption(beetSolana.publicKey)],
    ['createdAt', beet.i64],
    ['modifiedAt', beet.coption(beet.i64)],
], Profile.fromArgs, 'Profile');
//# sourceMappingURL=Profile.js.map