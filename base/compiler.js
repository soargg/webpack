"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const path = require("path");
const fs = require("fs");
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
        const ast = parser_1.getAst(this.entry);
        const dependecies = parser_1.getDependecies(ast, this.entry);
        const code = parser_1.getCode(ast);
        fs.writeFileSync(this.output, code);
        console.log(dependecies);
    }
    generate() {
    }
}
exports.Compiler = Compiler;
