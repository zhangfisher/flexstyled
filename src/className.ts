/**
 * 
 * 用法与 styled 一致
 * 
 * const myclass = className({
 
 * },{})
 * 
 * <div className={ myclass(class1,class2,...) } />
 * 
 * 
 * 
 * 不支持动态样式和CSS变量
 * 
 * @param args 
 * 
 */

import { createStyled } from "./styled";
import { CSSRuleObject, StyledObject, StyledOptions } from "./types";
import { isStyledObject } from "./utils";

export type StyledClassName = (...args:(string | undefined)[])=>string

export function className(styles:CSSRuleObject,options?:StyledOptions): StyledClassName
export function className(styles:CSSRuleObject,combindStyles?:(StyledObject | StyledClassName)[],options?:StyledOptions):StyledClassName
export function className(){
    const styles = arguments[0]
    const combindStyles = arguments.length > 1 &&  Array.isArray(arguments[1]) ? arguments[1] : []
    const options = arguments.length > 1 ? (
        typeof(arguments[1])=='object' ?  arguments[1] : Object.assign({},arguments[2])
    ) : {}
    const combindClasss = (combindStyles || []).map(item=>{
        try{
           return typeof item === "function" ? item() : (isStyledObject(item) ? item.className : '')
        }catch{
            return ''
        }
    }).join(" ")
    const styleObject = createStyled(styles,options)
    return (...args:string[])=>{
        return [styleObject.className,combindClasss,...args].join(" ")
    }
}
 
