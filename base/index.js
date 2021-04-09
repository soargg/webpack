"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const compiler_1 = require("./compiler");
const config = require(path.join(process.cwd(), './webpackconfig.js'));
new compiler_1.Compiler(config).run();
