import { defineConfig } from 'tsup'
// import copy from "esbuild-copy-files-plugin";
import {umdWrapper} from 'esbuild-plugin-umd-wrapper';

export default defineConfig([{
    entry: [
        'src/index.tsx'
    ],
    format: ['esm','cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake:true,  
    minify: true 
},{
    entry: [
        'src/index.tsx'
    ],
    outExtension: ({ format,options })=>{
        return {
          js: `.${format}.js`
        }
    },
    esbuildPlugins: [
        umdWrapper({
          libraryName: 'library-name',
        })
      ],
    //@ts-ignore
    format: ['iife', 'umd'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake:true,  
    minify: true ,
    globalName:'styledfc' 
}]
) 