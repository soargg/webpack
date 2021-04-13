"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const path = require("path");
// import fs = require('fs');
const parser_1 = require("./parser");
class Compiler {
    constructor(config) {
        const { entry, output } = config;
        this.entry = path.join(this.env_path, entry);
        this.output = path.join(this.env_path, output);
        ;
        this.modules = [];
    }
    get env_path() { return process.cwd(); }
    run() {
        const dependencyGraph = this.build(this.entry);
        console.log(dependencyGraph);
    }
    generate() {
    }
    build(filename) {
        const ast = parser_1.getAst(filename);
        const dependecies = parser_1.getDependecies(ast, filename);
        const code = parser_1.getCode(ast);
        this.modules.push({
            filename,
            dependecies,
            code
        });
        // 判断有依赖对象,递归解析所有依赖项
        if (dependecies) {
            for (const dependency in dependecies) {
                this.build(dependecies[dependency]);
            }
        }
        // 生成依赖关系图
        const dependencyGraph = this.modules.reduce((graph, item) => ({
            ...graph,
            // 使用文件路径作为每个模块的唯一标识符,保存对应模块的依赖对象和文件内容
            [item.filename]: {
                dependecies: item.dependecies,
                code: item.code
            }
        }), {});
        return dependencyGraph;
    }
}
exports.Compiler = Compiler;
