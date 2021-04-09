"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCode = exports.getDependecies = exports.getAst = void 0;
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
// 生成抽象语法树
function getAst(path) {
    const content = fs.readFileSync(path, 'utf-8');
    return parser.parse(content, { sourceType: 'module' });
}
exports.getAst = getAst;
// 生成依赖树
function getDependecies(ast, filename) {
    const dirname = path.dirname(filename);
    const dependecies = {};
    traverse(ast, {
        ImportDeclaration(action) {
            const value = action.node.source.value;
            const filepath = path.join(dirname, value);
            dependecies[value] = filepath;
        }
    });
    return dependecies;
}
exports.getDependecies = getDependecies;
// 转译成code
function getCode(ast) {
    return generate(ast).code;
}
exports.getCode = getCode;
