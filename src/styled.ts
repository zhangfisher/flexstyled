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


    styled.div

 
useInsertionEffect

 myStyle = styled({},{classNames})

 <MyComponent className={myStyle.className} style={myStyle.getStyle()}></MyComponent>
 <MyComponent {...myStyle.props({额外的样式或CSS变量},{props,className:"额外的类名"})} ></MyComponent>

 * 
 */

import { CSSRuleObject, StyledComponent, StyledComponentParams, StyledOptions } from './types';
import { createStyles } from "./parse"
import { generateClassName, generateStyleId, getComputedStyles, insertStylesheet, isPlainObject } from "./utils"
import type { CSSProperties,ReactElement } from "react"
 

export function createStyled<Props=any>(styles:CSSRuleObject<Props>,options?:StyledOptions):StyledComponentParams
export function createStyled<Props=any>(FC: StyledComponent<Props>,styles:CSSRuleObject<Props>,options?:StyledOptions):(props:Props)=>ReactElement
export function createStyled<Props=any>(FC: any,styles:any,options?:StyledOptions):any{
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
    const style = createStyles(styleData,opts)

    // 2. 生成样式插入到页面中
    insertStylesheet(style.css,opts.styleId) 

    if(component==undefined){
        const getStyle = (css?:CSSRuleObject,props?:any)=>Object.assign({},getComputedStyles(style.computedStyles,props),css) as CSSProperties
        //返回参数
        return {
            className: style.className,
            styleId  : opts.styleId,
            vars     : style.vars,  
            getStyle,
            props:(css,options) =>{
                return {
                    className: options?.className  + ' ' + style.className,
                    style:getStyle(css,options?.props)
                }
            }
        } as StyledComponentParams
    }else{
        //返回组件
        return (props:Props)=>{
            const getStyle = (css?:CSSRuleObject)=>{
                return Object.assign({},getComputedStyles(style.computedStyles,props),css) as CSSProperties
            }
            const params:StyledComponentParams = {
                className: style.className,
                styleId  : style.styleId,
                vars     : style.vars,  
                getStyle, 
                props:(css,options) =>{
                    return {
                        className: options?.className + ' '+ style.className,
                        style:getStyle(css)
                    }
                }
            }  as StyledComponentParams
            return FC(props,params)
        }
    } 
    
}

 