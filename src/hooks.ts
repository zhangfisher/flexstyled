import { useCallback,  useRef, useState,useInsertionEffect } from "react";
import { parseObjectStyles } from "./parse";
import { insertStylesheet, removeStylesheet } from "./utils";
import type { CSSRuleObject, StyledObject } from "./types";
import { createStyled, type StyledOptions } from ".";


/**
 * 
 * 在组件中使用
 * 
 * - 当组件第一次加载时注入css样式，在组件卸载时移除
 * 
 * 
 * @param name 
 * @param value 
 */
export function useStyled<Props=any>(styles: CSSRuleObject<Props> | (()=>CSSRuleObject<Props>),options?:StyledOptions):StyledObject {
    const firstRef = useRef<boolean>(false);
    const computedStyles = useRef<any>(null);

    const [styledObj] = useState(()=>{
        const findStyles = typeof(styles)=='function' ? styles() : styles
        return createStyled(findStyles,options)
    });
    const updateStyle = useCallback(()=>{
        // 1. 创建样式字符串
        const style = parseObjectStyles(typeof(styles)=='function' ? styles() : styles,{className:styledObj.className,id:styledObj.id})
        computedStyles.current = style.computedStyles
        // 2. 生成样式插入到页面中
        insertStylesheet(style.css,styledObj.id)
    },[styles])


    if (firstRef.current === false) {        
        updateStyle()
        firstRef.current =true 
    }
    
    useInsertionEffect(() => {   
        return ()=>{
            firstRef.current =false 
            removeStylesheet(styledObj.id)
        }
    }, []);
    return styledObj
}