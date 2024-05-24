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

 

 myStyle = styled({},{classNames})

 <MyComponent className={myStyle.className} style={myStyle.getStyle()}></MyComponent>
 <MyComponent {...myStyle.props({额外的样式或CSS变量},{props,className:"额外的类名"})} ></MyComponent>

 * 
 */

import { CSSRuleObject, ComponentStyledObject, StyledComponent, StyledObject, StyledOptions } from './types';
import { createStyles } from "./parse"
import { generateClassName, generateStyleId, getComputedStyles, insertStylesheet, isPlainObject, joinClassNames } from "./utils"
import type { CSSProperties,ReactElement } from "react"

export function createStyled<Props=any>(styles:CSSRuleObject<Props>,options?:StyledOptions):StyledObject
export function createStyled<Props=any>(styles:CSSRuleObject<Props>,mergeStyles:StyledObject[],options?:StyledOptions):StyledObject
export function createStyled<Props=any>(FC: StyledComponent<Props>,styles:CSSRuleObject<Props>,options?:StyledOptions):(props:Props)=>ReactElement
export function createStyled<Props=any>(FC: StyledComponent<Props>,styles:CSSRuleObject<Props>,mergeStyles:StyledObject[],options?:StyledOptions):(props:Props)=>ReactElement
export function createStyled<Props=any>():any{
    let FC:StyledComponent<Props> | undefined=undefined,styleData:CSSRuleObject<Props>
    let opts:Required<StyledOptions> = {
        className:generateClassName(), 
        styleId:generateStyleId()
    }    
    let mergeComputedStyles:StyledObject[] =  []          // 需要合并的样式对象
    // 参数处理
    if(arguments.length==0){   
        throw new Error("params error")
    }else{ 
        if(isPlainObject(arguments[0])){ 
            styleData = arguments[0]
            if(arguments.length>=2 && Array.isArray(arguments[1])){     // 有传入mergeStyles
                mergeComputedStyles = arguments[1]
                Object.assign(opts,arguments[2])
            }else{
                Object.assign(opts,arguments[1])
            }
        }else{ // 封装组件时            
            FC = arguments[0]
            styleData = arguments[1]
            if(arguments.length>=3 && Array.isArray(arguments[1])){
                mergeComputedStyles = arguments[2]
                Object.assign(opts,arguments[3])      
            }else{
                Object.assign(opts,arguments[2])      
            }
        }        
    } 

    // 1. 创建样式字符串
    const style = createStyles(styleData,opts)

    // 2. 生成样式插入到页面中
    insertStylesheet(style.css,opts.styleId) 

    // 3. 创建样式对象
    const createStyledObject = (fcProps?:any) =>{
        const computedStyles = [...mergeComputedStyles.map(s=>s.computedStyles), style.computedStyles]
        const getStyle =fcProps ?  (css?:CSSRuleObject)=>{
            return Object.assign({},getComputedStyles(computedStyles,fcProps),css) as CSSProperties
        } :
        (css?:CSSRuleObject,props?:any)=>{
            return Object.assign({},getComputedStyles(computedStyles,props),css) as CSSProperties
        }

        // 连接类名，使得合并进来的样式类可以应用到当前组件
        const className = joinClassNames(style.className,...mergeComputedStyles.map(s=>s.className))
        return {
            __flexstyled__:true,
            className, 
            styleId  : style.styleId,
            vars     : style.vars,  
            computedStyles : style.computedStyles,
            getStyle, 
            props:(params) =>{
                return {
                    className: joinClassNames(params?.className,className),
                    style:getStyle(params?.style,fcProps ? fcProps : params?.props)
                }
            }
        }  as StyledObject
    }

    if(FC==undefined){          // 只创建建样式对象
        return createStyledObject()
    }else{                      // 创建高阶样式组件        
        return (props:Props)=>{ 
            const params:ComponentStyledObject = createStyledObject(props)
            return FC!(props,params)
        }
    } 
    
}

 