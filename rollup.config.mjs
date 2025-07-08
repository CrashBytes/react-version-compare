import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
);

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        preferBuiltins: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      }),
      commonjs(),
      postcss({
        extract: 'styles.css',
        minimize: true,
      }),
      typescript({ tsconfig: './tsconfig.json', declaration: false }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
      }),
    ],
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      postcss({
        extract: false,
        inject: false,
      }),
      dts(),
    ],
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
    ],
  },
];