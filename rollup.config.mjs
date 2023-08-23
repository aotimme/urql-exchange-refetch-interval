import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

const input = {
  index: 'src/index.ts',
  'refetch-inverval-exchange': 'src/refetch-interval-exchange.ts',
};

export default [{
  input,
  output: [{
    dir: './dist',
    entryFileNames: '[name].mjs',
    format: 'esm',
  }, {
    dir: './dist',
    entryFileNames: '[name].js',
    format: 'cjs',
  }],
  plugins: [resolve(), typescript()],
}, {
  input,
  output: {
    dir: './dist',
    entryFileNames: '[name].d.ts',
  },
  plugins: [resolve(), typescript(), dts()],
}];