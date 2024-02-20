import type { CSSProperties } from "react";

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
 
 