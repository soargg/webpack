import fs = require('fs');
import path = require('path');
import parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

import type { File } from '@babel/types';

// 生成抽象语法树
export function getAst (path: string) {
    const content = fs.readFileSync(path, 'utf-8');
    return parser.parse(content, { sourceType: 'module' })
}

// 生成依赖树
export function getDependecies(ast: File, filename: string) {
    const dirname = path.dirname(filename);
    const dependecies: {[key: string]: string} = {};

    traverse(ast, {
        ImportDeclaration(action) {
            const value = action.node.source.value;
            const filepath = path.join(dirname, value);
            dependecies[value] = filepath;
        }
    });

    return dependecies;
}

// 转译成code
export function getCode(ast: File): string {
    return generate(ast).code;
}
