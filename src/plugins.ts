import { UnpluginFactory,createUnplugin } from 'unplugin'

export interface Options {
  // define your plugin options here
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'unplugin-styledfc', 
  enforce: 'post',
  transformInclude(id) {
    const extRegex = /(\.(ts|js|tsx|jsx))(?!=\?)$/
    return id.endsWith('.ts') || id.endsWith('.tsx')
  },
  // just like rollup transform
  transform(code) {
    return code 
  },
  // more hooks coming
  vite:{
    configResolved(resolvedConfig:any) { 
        console.log(resolvedConfig)
      }
  }
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const rspackPlugin = unplugin.rspack
export const esbuildPlugin = unplugin.esbuild
export const farmPlugin = unplugin.farm