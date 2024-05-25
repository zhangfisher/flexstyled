export interface StyledOptions{
    styleId?:string                          // 样式表的ID
    className?:string                        // 生成的样式类名，如果没有指定则自动生成 
}

export type StyledResult = { className:string,style:CSSProperties}

export type ComputedStyleDefine  = (props?:any)=>any
export type ComputedStyles  = Record<string,ComputedStyleDefine>

export type StyledObject={
    className: string
    styleId  : string
    vars     : Record<string,string | number>     
    computedStyles:ComputedStyles
    getStyle : (css?:CSSRuleObject,props?:any)=>CSSProperties
    props    : (params?:{style?:CSSRuleObject,props?:any,className?:string})=>StyledResult
}

// 当创建高阶样式组件时，不需要额外传递props
export type ComponentStyledObject = Omit<StyledObject,'props' | 'getStyle'> & {
    getStyle : (css?:CSSRuleObject)=>CSSProperties
    props    :(params?:{style?:CSSRuleObject,className?:string})=>StyledResult
}


export type StyledComponentProps<Props> = Props & {
    className: string
    styleId  : string
}

export type StyledComponent<Props> = (props:Props,params:ComponentStyledObject)=>ReactElement


import type { CSSProperties, ReactElement } from "react";

// 定义合法的 CSS 选择器类型  
export type CSSSelector = `${'@' | '&' | ':' | '>' | '~' | '+' | '.' | '^' | '#' | '*'}${string}` | `[${string}]`  
export type CSSVarName = `--${string}`;

export type ComputedStyledAttr<P=any> = (props:P)=> string | number



export type CSSRuleValue<P=any> = ComputedStyledAttr<P> | string | number

export type CSSRuleObject<P=any> ={
    [selector in CSSSelector]: CSSRuleObject<P>
} & {
    [varName: CSSVarName]: string | number 
} &   {
    [attrName in keyof CSSProperties]: CSSProperties[attrName] | ComputedStyledAttr<P> 
}  
 
 
/**
 * CSS动画Keyframes类型
 */
export type CSSKeyframes<P=any> = Record<`${number}%`,CSSRuleObject<P>> & {
    from?:CSSRuleObject<P>
    to?: CSSRuleObject<P>
}
   


/**
 * 
 * CSSKeyframes
 * 
 * 
 */


const k:CSSKeyframes ={    
    "50%":{
    },
    from:{

    }
}