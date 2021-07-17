"use strict";
/*
 * @Author: Cookie
 * @Date: 2021-07-03 21:57:20
 * @LastEditors: Cookie
 * @LastEditTime: 2021-07-17 17:06:54
 * @Description:
 */
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEslint = void 0;
var eslint_1 = require("eslint");
var util_1 = require("../util");
// 1. Create an instance.
var eslint = new eslint_1.ESLint({
    fix: true,
    extensions: [".js", ".ts"],
    useEslintrc: false,
    overrideConfig: {
        "env": {
            "browser": true,
            "es2021": true
        },
        "parser": require.resolve("@typescript-eslint/parser"),
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true
            },
            "ecmaVersion": 12,
            "sourceType": "module"
        },
        "plugins": [
            "react",
            "@typescript-eslint",
        ],
    },
    resolvePluginsRelativeTo: util_1.getDirPath('node_modules')
});
var getEslint = function (path) {
    if (path === void 0) { path = 'src'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var results, formatter, resultText, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    util_1.loggerTiming('Eslint 校验');
                    return [4 /*yield*/, eslint.lintFiles([util_1.getCwdPath() + "/" + path])];
                case 1:
                    results = _a.sent();
                    // 3. Modify the files with the fixed code.
                    return [4 /*yield*/, eslint_1.ESLint.outputFixes(results)];
                case 2:
                    // 3. Modify the files with the fixed code.
                    _a.sent();
                    return [4 /*yield*/, eslint.loadFormatter("stylish")];
                case 3:
                    formatter = _a.sent();
                    resultText = formatter.format(results);
                    // 5. Output it.
                    if (resultText) {
                        util_1.loggerError('请检查===》');
                        console.log(resultText);
                    }
                    else {
                        util_1.loggerSuccess('格式校对成功！');
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    process.exitCode = 1;
                    util_1.loggerError(error_1);
                    return [3 /*break*/, 6];
                case 5:
                    util_1.loggerTiming('Eslint 校验', false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.getEslint = getEslint;
