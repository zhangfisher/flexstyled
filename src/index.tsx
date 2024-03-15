/**

    为React.Fc组件添加CSS样式

    import { styled } from "styledfc"

    为函数组件添加样式

    styled((props,className)=>{
        return <div className={className}></div>
    },{
        color:"red",
        backgroundColor:"blue"
        ":hover":{

        }
        "& div":{
        }
    })

    对一个已有的组件添加样式

    const MyComponent = (props)=>{
        return <div></div>
    }

    const StyledMyComponent = styled((props,className)=>{
        return <MyComponent {...props} className={className}></MyComponent>
    },{
        // styles
    })





 
useInsertionEffect
 * 
 */

import { CSSRuleObject } from './types';
import { createStyles } from "./parse"
import { generateClassName, generateStyleId, getComputedStyles, insertStylesheet, isPlainObject } from "./utils"
import type { CSSProperties,ReactElement } from "react"
 
 

export interface StyledOptions{
    styleId?:string                          // 样式表的ID
    className?:string                        // 生成的样式类名，如果没有指定则自动生成 
}



export type StyledComponentParams<RefType=any> ={
    className: string
    styleId  : string
    vars     : Record<string,string | number> 
    getStyle : (css?:CSSRuleObject,props?:any)=>CSSProperties
}

export type StyledComponentProps<Props> = Props & {
    className: string
    styleId  : string
}
export type StyledComponent<Props> = (props:Props,params:StyledComponentParams)=>ReactElement


export function styled<Props=any>(styles:CSSRuleObject<Props>,options?:StyledOptions):StyledComponentParams
export function styled<Props=any>(FC: StyledComponent<Props>,styles:CSSRuleObject<Props>,options?:StyledOptions):(props:Props)=>ReactElement
export function styled<Props=any>(FC: any,styles:any,options?:StyledOptions):any{
    let component:StyledComponent<Props> | undefined=undefined,styleData:CSSRuleObject<Props>
    let opts:Required<StyledOptions> = {
        className:generateClassName(), 
        styleId:generateStyleId()
    }
    // 参数处理
    if(arguments.length==0){
        throw new Error("params error")
    }else{
        if(isPlainObject(arguments[0])){
            styleData = arguments[0]
            Object.assign(opts,arguments[1])
        }else{
            component = arguments[0]
            styleData = arguments[1]
            Object.assign(opts,arguments[2])        
        }        
    } 

    // 1. 创建样式字符串
    const style = createStyles(styleData,{className:opts.className,styleId:opts.styleId})
    // 2. 生成样式插入到页面中
    insertStylesheet(style.css,opts.styleId) 

    if(component==undefined){
        //返回参数
        return {
            className: style.className,
            styleId  : opts.styleId,
            vars     : style.vars,  
            getStyle : (css?:CSSRuleObject,props?:any)=>Object.assign({},getComputedStyles(style.computedStyles,props),css) as CSSProperties
        }
    }else{
        //返回组件
        return (props:Props)=>{
            const params:StyledComponentParams = {
                className: style.className,
                styleId  : style.styleId,
                vars     : style.vars,  
                getStyle : (css)=>{
                    return Object.assign({},getComputedStyles(style.computedStyles,props),css) as CSSProperties
                }
            }  
            return FC(props,params)
        }
    } 
    
}


export { insertStylesheet } from "./utils"
export * from "./types"
export { useStyle } from "./hooks"