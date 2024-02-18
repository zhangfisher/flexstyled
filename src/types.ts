import type { CSSProperties } from "react";

// 定义合法的 CSS 选择器类型  
export type CSSSelector = `:${string}` | `&${string}` | `>${string}` | `:${string}` | `~${string}` | `[${string}]`  | `.${string}` 
export type CSSVar = `--${string}`;


export type CSSObject = CSSProperties & {
    [selector: CSSSelector]: CSSObject     
} & {
    [varName: CSSVar]: string | number
}