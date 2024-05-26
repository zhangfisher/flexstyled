// /**
//  * 
//  * WyW-in-JS 
//  * 
//  * 
//  * 
//  */

import { CSSRuleObject } from "./types"

// // import { UnpluginFactory,createUnplugin } from 'unplugin'

// // export interface Options {
// //   // define your plugin options here
// // }

// // export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
// //   name: 'unplugin-flexstyled', 
// //   enforce: 'post',
// //   transformInclude(id) {
// //     const extRegex = /(\.(ts|js|tsx|jsx))(?!=\?)$/
// //     return id.endsWith('.ts') || id.endsWith('.tsx')
// //   },
// //   // just like rollup transform
// //   transform(code) {
// //     return code 
// //   },
// //   // more hooks coming
// //   vite:{
// //     configResolved(resolvedConfig:any) { 
// //         console.log(resolvedConfig)
// //       }
// //   }
// // })

// // export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

// // export default unplugin

// // export const vitePlugin    = unplugin.vite
// // export const rollupPlugin  = unplugin.rollup
// // export const webpackPlugin = unplugin.webpack
// // export const rspackPlugin  = unplugin.rspack
// // export const esbuildPlugin = unplugin.esbuild
// // export const farmPlugin    = unplugin.farm

// import wyw from '@wyw-in-js/vite';
// import { TaggedTemplateProcessor, validateParams } from '@wyw-in-js/processor-utils';
// import type { Expression, Params, TailProcessorParams } from '@wyw-in-js/processor-utils'; 
 
// export default class FlexStyledProcessor extends TaggedTemplateProcessor {
//   constructor(params: Params, ...args: TailProcessorParams) {
//     validateParams(params, ['callee', '*', '...'], TaggedTemplateProcessor.SKIP);
//     super(params, ...args);
//   }
 
//   public override get asSelector(): string {
//     return `.${this.className}`;
//   } 
// }

// function styled<T extends CSSRuleObject>(styles:T){
//   return {
//     vars: Object.keys(styles) as unknown as keyof T
//   }
// }

// const light = styled({
//   "--primaryColor":'red',
//   "--secondaryColor":'blue',
//   "--backgroundColor":'white',
//   "--color":'black',
//   "--borderRadius":'4px'
// })