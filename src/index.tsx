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

import { CSSObject } from './types';
import { createStyles } from "./parse"
import { insertStylesheet } from "./utils"
import { RefObject, useCallback, useEffect,useInsertionEffect,useRef } from "react"
import React from "react"


export interface StyledOptions{
    styleId?:string                          // 样式表的ID
    className?:string                        // 生成的样式类名，如果没有指定则自动生成 
}

/**
 * 生成一个样式表id
 * 
 * @param styles 
 */
function generateStyleId():string{
    return Math.random().toString(36).substring(2, 8)   
} 


export type StyledComponentParams<RefType=any> ={
    className: string
    styleId  : string
    vars     : Record<string,string | number>
    setVar   : (name:string,value:string | number)=>void
    ref      : React.RefObject<RefType>
    getStyle : ()=>Record<string,string | number>
}
export type StyledComponentProps<Props> = Props & {
    setVar:(name:string,value:string | number)=>void
    className: string
    styleId  : string
}
export type StyledComponent<Props> = (props:Props,params:StyledComponentParams)=>React.ReactElement


function getComputedStyles(styles:Record<string,Function>,props:any){
    const computedStyles:Record<string,string | number> = {}
    for(const [varName,fn] of Object.entries(styles)){
        computedStyles[varName] = fn(props)
    }
    return computedStyles
}


export function styled<Props=any,RefType=any>(FC: StyledComponent<Props>,styles:CSSObject<Props>,options?:StyledOptions){
    const opts = Object.assign({
        className:'s'+Math.random().toString(36).substring(2, 8) , 
        styleId:generateStyleId()
    },options) as Required<StyledOptions>

    // 1. 创建样式字符串
    const style = createStyles(styles,{className:opts.className,styleId:opts.styleId})
    // 2. 生成样式插入到页面中
    insertStylesheet(style.css,opts.styleId)

    // 4. 返回组件
    return (props:Props)=>{
        const styleParams:StyledComponentParams = {
            className: opts.className,
            styleId  : opts.styleId,
            vars     : style.vars,
            ref      : useRef<RefType>(null),
            setVar   : ()=>{},
            getStyle : ()=>getComputedStyles(style.computedStyles,props)
        } 
        
        styleParams.setVar=useCallback((name,value)=>{
            if(styleParams.ref.current){
                styleParams.ref.current.style.setProperty(name,value.toString())
            }else{
                console.warn("[stylefc] use of setVar failed, ref is not available.")
            }
        },[])
        return FC(props,styleParams)
    }
}


export { insertStylesheet } from "./utils"