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
exports.oddRouter = void 0;
var express = require("express");
var mongodb = require("mongodb");
var database_1 = require("./database");
exports.oddRouter = express.Router();
exports.oddRouter.use(express.json());
exports.oddRouter.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var odds, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ((_a = database_1.collections.odds) === null || _a === void 0 ? void 0 : _a.find({}).toArray())];
            case 1:
                odds = _b.sent();
                res.status(200).send(odds);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(500).send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.oddRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, odd, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = req.params.id;
                query = { _id: new mongodb.ObjectId(id) };
                return [4 /*yield*/, ((_a = database_1.collections.odds) === null || _a === void 0 ? void 0 : _a.findOne(query))];
            case 1:
                odd = _c.sent();
                if (odd) {
                    res.status(200).send(odd);
                }
                else {
                    res.status(404).send("Failed to find an odd: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                res.status(404).send("Failed to find an odd: ID ".concat((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.oddRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var odd, result, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                odd = req.body;
                return [4 /*yield*/, ((_a = database_1.collections.odds) === null || _a === void 0 ? void 0 : _a.insertOne(odd))];
            case 1:
                result = _b.sent();
                if (result === null || result === void 0 ? void 0 : result.acknowledged) {
                    res.status(201).send("Created a new odd: ID ".concat(result === null || result === void 0 ? void 0 : result.insertedId, "."));
                }
                else {
                    res.status(500).send("Failed to create a new odd.");
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(400).send(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.oddRouter.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, odd, query, result, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                odd = req.body;
                query = { _id: new mongodb.ObjectId(id) };
                return [4 /*yield*/, ((_b = database_1.collections.odds) === null || _b === void 0 ? void 0 : _b.updateOne(query, {
                        $set: odd
                    }))];
            case 1:
                result = _c.sent();
                if (result && result.matchedCount) {
                    res.status(200).send("Updated an odd: ID ".concat(id, "."));
                }
                else if (!(result === null || result === void 0 ? void 0 : result.matchedCount)) {
                    res.status(404).send("Failed to find an odd: ID ".concat(id));
                }
                else {
                    res.status(304).send("Failed to update an odd: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _c.sent();
                console.error(error_4);
                res.status(400).send(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.oddRouter["delete"]("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, result, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb.ObjectId(id) };
                return [4 /*yield*/, ((_b = database_1.collections.odds) === null || _b === void 0 ? void 0 : _b.deleteOne(query))];
            case 1:
                result = _c.sent();
                if (result && result.deletedCount) {
                    res.status(202).send("Removed an odd: ID ".concat(id));
                }
                else if (!result) {
                    res.status(400).send("Failed to remove an odd: ID ".concat(id));
                }
                else if (!result.deletedCount) {
                    res.status(404).send("Failed to find an odd: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _c.sent();
                console.error(error_5);
                res.status(400).send(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
