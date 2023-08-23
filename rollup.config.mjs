import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

const input = {
  index: 'src/index.ts',
  refetchInvervalExchange: 'src/refetchIntervalExchange.ts'
};

export default [{
  input,
  output: {
    dir: './dist',
    entryFileNames: '[name].js'
  },
  plugins: [resolve(), typescript()],
}, {
  input,
  output: {
    dir: './dist',
    entryFileNames: '[name].d.ts',
  },
  plugins: [resolve(), typescript(), dts()],
}];