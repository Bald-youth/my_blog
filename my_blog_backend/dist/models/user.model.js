"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// user.model.ts
var mongoose_1 = require("mongoose");
// 定义用户模型
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // 其他用户相关的属性
});
var UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
