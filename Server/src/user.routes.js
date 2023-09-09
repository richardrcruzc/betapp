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
exports.userRouter = void 0;
var express = require("express");
var mongodb = require("mongodb");
var database_1 = require("./database");
exports.userRouter = express.Router();
exports.userRouter.use(express.json());
exports.userRouter.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ((_a = database_1.collections.users) === null || _a === void 0 ? void 0 : _a.find({}).toArray())];
            case 1:
                users = _b.sent();
                res.status(200).send(users);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(500).send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, user, error_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb.ObjectId(id) };
                return [4 /*yield*/, ((_b = database_1.collections.users) === null || _b === void 0 ? void 0 : _b.findOne(query))];
            case 1:
                user = _d.sent();
                if (user) {
                    res.status(200).send(user);
                }
                else {
                    res.status(404).send("Failed to find an user: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _d.sent();
                res.status(404).send("Failed to find an user: ID ".concat((_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.get("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loginModel, query, user, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                loginModel = req.body;
                query = { email: loginModel.email };
                return [4 /*yield*/, ((_a = database_1.collections.users) === null || _a === void 0 ? void 0 : _a.findOne(query))];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(200).send(user);
                }
                else {
                    res.status(404).send("Failed to find an user ".concat(loginModel.email));
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res.status(404).send("Failed to find an user");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, result, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                user = req.body;
                return [4 /*yield*/, ((_a = database_1.collections.users) === null || _a === void 0 ? void 0 : _a.insertOne(user))];
            case 1:
                result = _b.sent();
                if (result === null || result === void 0 ? void 0 : result.acknowledged) {
                    res.status(201).send("Created a new user: ID ".concat(result.insertedId, "."));
                }
                else {
                    res.status(500).send("Failed to create a new user.");
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error(error_4);
                res.status(400).send(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, query, result, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                user = req.body;
                query = { _id: new mongodb.ObjectId(id) };
                return [4 /*yield*/, ((_b = database_1.collections.users) === null || _b === void 0 ? void 0 : _b.updateOne(query, {
                        $set: user
                    }))];
            case 1:
                result = _c.sent();
                if (result && result.matchedCount) {
                    res.status(200).send("Updated an user: ID ".concat(id, "."));
                }
                else if (!(result === null || result === void 0 ? void 0 : result.matchedCount)) {
                    res.status(404).send("Failed to find an user: ID ".concat(id));
                }
                else {
                    res.status(304).send("Failed to update an user: ID ".concat(id));
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
exports.userRouter["delete"]("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, query, result, error_6;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                query = { _id: new mongodb.ObjectId(id) };
                return [4 /*yield*/, ((_b = database_1.collections.users) === null || _b === void 0 ? void 0 : _b.deleteOne(query))];
            case 1:
                result = _c.sent();
                if (result && result.deletedCount) {
                    res.status(202).send("Removed an user: ID ".concat(id));
                }
                else if (!result) {
                    res.status(400).send("Failed to remove an user: ID ".concat(id));
                }
                else if (!result.deletedCount) {
                    res.status(404).send("Failed to find an user: ID ".concat(id));
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _c.sent();
                console.error(error_6);
                res.status(400).send(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
