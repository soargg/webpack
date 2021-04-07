import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/index.ts',

    output: {
      file: './lib/webpack.js',
      format: 'cjs'
    },

    plugins: [
        typescript({
          useTsconfigDeclarationDir: true
        }),
        resolve(),
        commonjs()
    ]
};