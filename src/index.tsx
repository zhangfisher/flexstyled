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

import { CSSObject } from "./types"
import { createStyles } from "./parse"
import { insertStylesheet } from "./utils"
import { useCallback, useEffect,useRef } from "react"


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
    return Math.random().toString(36).substring(2, 10)   
} 
export type StyledComponentParams ={
    className:string
    styleId:string
    vars:Record<string,string | number>
    setVar:(name:string,value:string | number)=>void
    ref:React.RefObject<any>
}

export type WithStyledComponent<Props> = (props:React.PropsWithChildren<Props>,params:StyledComponentParams)=>React.ReactElement

export function styled<Props>(FC: WithStyledComponent<Props>,styles:CSSObject,options?:StyledOptions){
    const opts = Object.assign({
        className:'c'+Math.random().toString(36).substring(2, 10) , 
        styleId:generateStyleId()
    },options) as Required<StyledOptions>

    // 1. 创建样式字符串
    const style = createStyles(styles,{className:opts.className,styleId:opts.styleId})
    // 2. 生成样式插入到页面中
    insertStylesheet(style.css,opts.styleId)

    // 3. 返回组件
    return (props:React.PropsWithChildren<Props>)=>{
        const styleParams:StyledComponentParams = {
            className:opts.className,
            styleId:opts.styleId,
            vars:style.vars,
            ref:useRef<any>(null),
            setVar:()=>{}
        } 
        styleParams.setVar=useCallback((name,value)=>{
            if(styleParams.ref.current){
                styleParams.ref.current.style.setProperty(name,value.toString())
            }else{
                console.warn("[stylefc] use of setVar failed, ref is not available.")
            }
        },[])
        useEffect(()=>{
            if(styleParams.ref.current){
                const classList = styleParams.ref.current.classList
                if(!classList.contains(styleParams.className)) classList.add(styleParams.className)
            }
        },[])
        return FC(props,styleParams)
    }
}



export { insertStylesheet } from "./utils"