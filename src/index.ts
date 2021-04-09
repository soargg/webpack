
import path = require('path');
import { CompilerConfig, Compiler } from './compiler';

const config: CompilerConfig = require(path.join(process.cwd(), './webpackconfig.js'));

new Compiler(config).run();

