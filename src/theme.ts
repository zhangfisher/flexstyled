import { styled } from '.';
import { CSSVariables, Dict  } from './types';
import { fromCssVarName, toCssVarName } from './utils';


/**
 * Create a theme
 * 

 * 
 * @param styles 
 */



export type Theme<T extends CSSVariables>  = T & {
    load(vars:Partial<T>):void
    update(vars:Partial<T>):void
    save(fn:(vars:T)=>void):void
    reset():void
} 

type ThemeContext<Options=ThemeOptions> = {
    vars : Map<string,number | string | undefined>          // CSS主题变量，采用驼峰命名形式，移除了前缀
} & Required<Options>

function loadTheme<Vars extends CSSVariables=CSSVariables>(this:ThemeContext,data:Vars){
    const { prefix:varPrefix} = this
    Object.entries(data).forEach( ([key,value])=>{
        if(value){
            this.vars.set(key,value)
            document.documentElement.style.setProperty(toCssVarName(key,varPrefix),String(value))
        }            
    })
}

function saveTheme(this:ThemeContext,fn:(vars:CSSVariables)=>void){
    const result:CSSVariables = {}
    const themeStyle = document.getElementById(this.id) as HTMLStyleElement
    const { prefix:varPrefix} = this
    // 解析提取themeStyle中:root下的所有css变量
    if(themeStyle && themeStyle.sheet){
        for (let i = 0; i < themeStyle.sheet.cssRules.length; i++) {
            const rule = themeStyle.sheet.cssRules[i] as CSSStyleRule
            if(rule.selectorText == ':root'){
                // 分别提取 :root 下的css变量到result
                const matched  = rule.style.cssText.match(/--[\w\-]+:\s*([^;]+)/g) || []
                matched.forEach( (item)=>{
                    const [key,value] = item.split(':')
                    if(key && value){
                        result[fromCssVarName(key.trim(),varPrefix)] = value.trim()
                    }
                })
            }
        }         
    }

    if(this.vars){
        this.vars.forEach((value,key)=>{
            if(value){
                result[fromCssVarName(String(key),varPrefix)] = value
            }
        })
    }
    fn(result)
}


function resetTheme(this:ThemeContext){
    const { prefix:varPrefix} = this
    this.vars.forEach( (value,key)=>{
        this.vars.set(String(key),undefined)
        document.documentElement.style.removeProperty(toCssVarName(String(key),varPrefix))
    })
}

export type ThemeOptions = {
    id?:string
    prefix ?: string                // 为css变量自动添加前缀
}

export function createTheme<T extends CSSVariables = CSSVariables>(define:T,options?:ThemeOptions){
    const context = Object.assign({
        vars : new Map<string,number | string | undefined>(Object.entries(define)) ,
        id:"flexstyled-theme-vars"
    },options) as Required<ThemeContext<ThemeOptions>>
    
    const { prefix:varPrefix} = context

    // 转换为 css 变量名形式
    const cssVars:Dict = {} 
    Object.entries(define).forEach( ([key,value])=>{
        cssVars[toCssVarName(key)] = value
    })     
    const style = styled(cssVars as any,{asRoot:true,id:context.id,varPrefix})        
 
    return new Proxy<Theme<T>>(style.vars as Theme<T>,{
        get(target: Theme<T>, key: string | symbol, receiver: any){
            if(key == 'load' || key == 'update'){
                return loadTheme.bind(context)
            }else if(key == 'save'){
                return saveTheme.bind(context)
            }else if(key == 'reset'){
                return resetTheme.bind(context)
            }else{
                return Reflect.get(target,key,receiver) 
            }
        },
        set(target: Theme<T>, key: string , value: any, receiver: any){
            if(context.vars.has(key)){
                context.vars.set(key,value)
                document.documentElement.style.setProperty(toCssVarName(key,varPrefix),value)
                return Reflect.set(target,key,value,receiver)
            }else{
                return false 
            }            
        }
    }) 
} 
 