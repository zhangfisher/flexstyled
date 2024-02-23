import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  input: './src/index.ts',
  output: [
    { file: 'dist/es/index.js', format: 'es', sourcemap: true },
    { file: 'dist/es/index.min.js', format: 'es', plugins: [terser({})], sourcemap: true },
    { file: 'dist/umd/index.js', format: 'umd', name: 'styledfc', sourcemap: true },
    { file: 'dist/umd/index.min.js', format: 'umd', plugins: [terser()], name: 'styledfc', sourcemap: true },
    { file: 'dist/iife/index.js', format: 'iife', name: 'styledfc', sourcemap: true },
    { file: 'dist/iife/index.min.js', format: 'iife', plugins: [terser()], name: 'styledfc', sourcemap: true },
    { file: 'dist/cjs/index.js', format: 'cjs', sourcemap: true },
    { file: 'dist/cjs/index.min.js', format: 'cjs', plugins: [terser()], sourcemap: true },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
  }),
  ],
  external: ['react']
})
