import type { CSSProperties } from "react";

// 定义合法的 CSS 选择器类型  
export type CSSSelector = `:${string}` | `&${string}` | `>${string}` | `:${string}` | `~${string}` | `[${string}]`  | `.${string}` 
export type CSSVar = `--${string}`;


export type CSSObject<P=any> = CSSProperties & {
    [selector: CSSSelector]: CSSObject<P>     
} & {
    [varName: CSSVar]: string | number 
} & {
    [key in keyof CSSProperties]: ComputedStyledProp<P>  
}


export type ComputedStyledProp<T=Record<string,any>> = (props:T)=>string | number