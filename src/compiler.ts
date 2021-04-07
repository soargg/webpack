type CompilerConfig = {
    entry: string;
    output: string;
}

export class Compiler {
    entry: string;

    output: string;

    modules: any[];

    constructor(config: CompilerConfig) {
        const { entry,  output } = config;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }

    run() {

    }

    generate() {
        
    }
}