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

export type WithStyledComponent<Props> = (props:React.PropsWithChildren<Props>,className:string)=>React.ReactElement

export function styled<Props>(FC: WithStyledComponent<Props>,styles:CSSObject,options?:StyledOptions){
    const opts = Object.assign({
        className:'c'+Math.random().toString(36).substring(2, 10) , 
        styleId:generateStyleId()
    },options) as Required<StyledOptions>

    // 1. 创建样式字符串
    const [className,cssString] = createStyles(styles,{className:opts.className})
    // 2. 生成样式插入到页面中
    insertStylesheet(cssString,opts.styleId)

    // 3. 返回组件
    return (props:React.PropsWithChildren<Props>)=>{
        return FC(props,className)
    }
}



export { insertStylesheet } from "./utils"