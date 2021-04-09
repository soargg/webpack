import path = require('path');
import fs = require('fs');
import { getAst, getDependecies, getCode } from './parser';

export type CompilerConfig = {
    entry: string;
    output: string;
}

export class Compiler {
    private get env_path() {return process.cwd()}

    entry: string;

    output: string;

    modules: any[];

    constructor(config: CompilerConfig) {
        const { entry,  output } = config;
        this.entry = path.join(this.env_path, entry);
        this.output = path.join(this.env_path, output);;
        this.modules = [];
    }

    run() {
        const ast = getAst(this.entry);
        const dependecies = getDependecies(ast, this.entry);
        const code = getCode(ast);

        fs.writeFileSync(this.output, code);

        console.log(dependecies);
    }

    generate() {
        
    }
}