
 

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


import type { CSSProperties, ReactElement } from "react";

// 定义合法的 CSS 选择器类型  
export type CSSSelector = `${'&' | ':' | '>' | '~' | '+' | '.' | '^' | '#' | '*'}${string}` | `[${string}]`  
export type CSSVar = `--${string}`;

export type ComputedStyledAttr<P=any> = (props:P)=> string | number



export type CSSRuleObject<P=any> ={
    [selector in CSSSelector]: CSSRuleObject<P> 
} & {
    [varName: CSSVar]: string | number 
} &   {
    [attrName in keyof CSSProperties]: CSSProperties[attrName] | ComputedStyledAttr<P> 
}  
 
 