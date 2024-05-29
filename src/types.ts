export interface StyledOptions{
    id?          : string  | null                 // 样式表的ID
    className?  : string                          // 生成的样式类名，如果没有指定则自动生成 
    asRoot?     : boolean                         // 使用CSS变量
    varPrefix?  : string                          // 为所有css变量指定一个前缀，如varPrefix="v",则--primary-color --v-primary-color
    inject?     : boolean                         // 是否立即注入样式
    tag?        : string                          // 指定一个标签，将被追加到生成的类名，如tag="column",则生成的类名为"column-xxxxx"，当指定类名时，tag无效
}

export type StyledResult = { className:string,style:CSSProperties}

export type ComputedStyleDefine<Props=any>  = (props:Props,vars?:Dict)=>any
export type ComputedStyles  = Record<string,ComputedStyleDefine>



 
export interface IStyledObject<Styles extends CSSRuleObject =  CSSRuleObject  >{
    css           : string
    id            : string
    className     : string    
    vars          : CSSVars<Styles>
    computedStyles: ComputedStyles
    getStyle      : (css?:CSSRuleObject,props?:any)=>CSSProperties
    getProps      : (params?:{style?:CSSRuleObject,props?:any,className?:string})=>StyledResult
}

export type StyledObject<Styles extends CSSRuleObject =  CSSRuleObject >= IStyledObject<Styles>

// 传递给组件时，不需要额外传递props，并且getStyle的签名也需要做相应调整
export type ComponentStyledObject = Omit<StyledObject,'props' | 'getStyle'> & {
    getStyle : (css?:CSSRuleObject)=>CSSProperties
    getProps :(params?:{style?:CSSRuleObject,className?:string})=>StyledResult
}


export type StyledComponentProps<Props> = Props & {
    id       : string
    className: string    
}

export type StyledComponent<Props> = (props:Props,params:ComponentStyledObject)=>ReactElement<Props> 


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
 
