"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.connectToDatabase = exports.collections = void 0;
var mongodb = require("mongodb");
exports.collections = {};
function connectToDatabase(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, usersCollection, oddsCollections, betsCollections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mongodb.MongoClient(uri);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db("sportBettingDB");
                    return [4 /*yield*/, applySchemaValidation(db)];
                case 2:
                    _a.sent();
                    usersCollection = db.collection("users");
                    exports.collections.users = usersCollection;
                    oddsCollections = db.collection("odds");
                    exports.collections.odds = oddsCollections;
                    betsCollections = db.collection("bets");
                    exports.collections.bets = betsCollections;
                    return [2 /*return*/];
            }
        });
    });
}
exports.connectToDatabase = connectToDatabase;
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our User model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
function applySchemaValidation(db) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonSchemaBet, jsonSchemaOdd, jsonSchemaUser;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonSchemaBet = {
                        $jsonSchema: {
                            bsonType: "object",
                            required: ["UserId", "EventId", "OddId", "Amount"],
                            additionalProperties: false,
                            properties: {
                                _id: {},
                                UserId: {
                                    bsonType: "string",
                                    description: "'UserId' is required and is a string"
                                },
                                EventId: {
                                    bsonType: "string",
                                    description: "'EventId' is required and is a string",
                                    minLength: 5
                                },
                                OddId: {
                                    bsonType: "string",
                                    description: "'OddId' is required and is a string",
                                    minLength: 5
                                },
                                Amount: {
                                    bsonType: "string",
                                    description: "'Amount' is required and is a decimal",
                                    minLength: 5
                                }
                            }
                        }
                    };
                    jsonSchemaOdd = {
                        $jsonSchema: {
                            bsonType: "object",
                            required: ["EventId", "DTM", "Odds"],
                            additionalProperties: false,
                            properties: {
                                _id: {},
                                EventId: {
                                    bsonType: "string",
                                    description: "'EventId' is required and is a string"
                                },
                                DTM: {
                                    bsonType: "string",
                                    description: "'DTM' is required and is a string",
                                    minLength: 5
                                },
                                Odds: {
                                    bsonType: "string",
                                    description: "'Odds' is required and is a string",
                                    minLength: 5
                                }
                            }
                        }
                    };
                    jsonSchemaUser = {
                        $jsonSchema: {
                            bsonType: "object",
                            required: ["FirstName", "LastName", "Email"],
                            additionalProperties: false,
                            properties: {
                                _id: {},
                                FirstName: {
                                    bsonType: "string",
                                    description: "'FirstName' is required and is a string"
                                },
                                LastName: {
                                    bsonType: "string",
                                    description: "'LastName' is required and is a string",
                                    minLength: 5
                                },
                                Email: {
                                    bsonType: "string",
                                    description: "'Email' is required and is a string",
                                    minLength: 5
                                }
                            }
                        }
                    };
                    // Try applying the modification to the collection, if the collection doesn't exist, create it
                    return [4 /*yield*/, db
                            .command({
                            collMod: "users",
                            validator: jsonSchemaUser
                        })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(error.codeName === "NamespaceNotFound")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, db.createCollection("users", { validator: jsonSchemaUser })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    // Try applying the modification to the collection, if the collection doesn't exist, create it
                    _a.sent();
                    return [4 /*yield*/, db
                            .command({
                            collMod: "odds",
                            validator: jsonSchemaOdd
                        })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(error.codeName === "NamespaceNotFound")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, db.createCollection("odds", { validator: jsonSchemaOdd })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db
                            .command({
                            collMod: "bets",
                            validator: jsonSchemaBet
                        })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(error.codeName === "NamespaceNotFound")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, db.createCollection("bets", { validator: jsonSchemaBet })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
