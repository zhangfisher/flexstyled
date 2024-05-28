export interface StyledOptions{
    id?         : string                          // 样式表的ID
    className?  : string                          // 生成的样式类名，如果没有指定则自动生成 
    asRoot?     : boolean                         // 使用CSS变量
    varPrefix?  : string                          // 为所有css变量指定一个前缀，如varPrefix="v",则--primary-color --v-primary-color
}

export type StyledResult = { className:string,style:CSSProperties}

export type ComputedStyleDefine  = (props?:any,vars?:Dict)=>any
export type ComputedStyles  = Record<string,ComputedStyleDefine>



 
export interface IStyledObject<Vars extends Dict =  Dict >{
    id            : string
    className     : string    
    vars          : Vars    
    computedStyles: ComputedStyles
    getStyle      : (css?:CSSRuleObject,props?:any)=>CSSProperties
    props         : (params?:{style?:CSSRuleObject,props?:any,className?:string})=>StyledResult
}





export type StyledObject<Vars extends Dict =  Dict >= IStyledObject<Vars>

// 当创建高阶样式组件时，不需要额外传递props
export type ComponentStyledObject = Omit<StyledObject,'props' | 'getStyle'> & {
    getStyle : (css?:CSSRuleObject)=>CSSProperties
    props    :(params?:{style?:CSSRuleObject,className?:string})=>StyledResult
}


export type StyledComponentProps<Props> = Props & {
    className: string
    id       : string
}

export type StyledComponent<Props> = (props:Props,params:ComponentStyledObject)=>ReactElement


import type { CSSProperties, ReactElement } from "react";

// 定义合法的 CSS 选择器类型  
export type CSSSelector = `${'@' | '&' | ':' | '>' | '~' | '+' | '.' | '^' | '#' | '*'}${string}` | `[${string}]`  
export type CSSVarName = `--${string}`;

export type ComputedStyledAttr<Props=any> = (props:Props)=> string | number



export type CSSRuleValue<Props=any> = ComputedStyledAttr<Props> | string | number

export type CSSRuleObject<Props=any> ={
    [selector in CSSSelector]: CSSRuleObject<Props>
} & {
    [varName: CSSVarName]: string | number 
} &   {
    [attrName in keyof CSSProperties]: CSSProperties[attrName] | ComputedStyledAttr<Props> 
}  
 
 
/**
 * CSS动画Keyframes类型
 */
export type CSSKeyframes<Props=any> = Record<`${number}%`,CSSRuleObject<Props>> & {
    from?:CSSRuleObject<Props>
    to?: CSSRuleObject<Props>
}
   
export type Dict  = Record<string,any> 

/**
 * 将--primary-color形式的字符串转换为primaryColor字符串类型
 * 
 */

export type CamelCase<S extends string> = S extends `${infer L}-${infer R1}${infer R2}`
	? Uppercase<R1> extends Lowercase<R1>
		? `${Lowercase<L>}-${CamelCase<`${R1}${R2}`>}`
		: `${Lowercase<L>}${Uppercase<R1>}${CamelCase<R2>}`
	: Lowercase<S>;

export type CssVarToCamelCase<T extends string> = T extends `--${infer S}` ? `${CamelCase<S>}` : never

 

export type CSSVars<Rules extends CSSRuleObject = CSSRuleObject> = {
    [Key in keyof Rules as Key extends `--${string}` ? CssVarToCamelCase<Key> : never ]? : string | number
} 
 
 

export interface CSSVariables  {
    [key: string ]: string | number
}
 
