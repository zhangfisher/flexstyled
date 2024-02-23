import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { createStyles } from "./parse";
import { generateClassName, generateStyleId, getComputedStyles, insertStylesheet, removeStylesheet } from "./utils";
import type { CSSRuleObject } from "./types";
import type { StyledOptions } from ".";

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
export function useStyle<Props=any>(styles: CSSRuleObject<Props> | (()=>CSSRuleObject<Props>),options?:StyledOptions) {
    const firstRef = useRef<boolean>(false);
    const computedStyles = useRef<any>(null);

    const getStyle = useCallback((css:CSSRuleObject,props?:any)=>{
        return Object.assign({},getComputedStyles(computedStyles.current,props),css) as CSSProperties
    },[])

    const updateStyle = useCallback(()=>{
        // 1. 创建样式字符串
        const style = createStyles(typeof(styles)=='function' ? styles() : styles,{className:styleContext.className,styleId:styleContext.styleId})
        computedStyles.current = style.computedStyles
        // 2. 生成样式插入到页面中
        insertStylesheet(style.css,styleContext.styleId)
    },[styles])

    const [styleContext] = useState(()=>{
        const opts = Object.assign({
            className:generateClassName(), 
            styleId:generateStyleId()
        },options) as Required<StyledOptions>
        return {
            className:opts.className,
            styleId:opts.styleId,
            getStyle
        }
    });
    if (firstRef.current === false) {        
        updateStyle()
        firstRef.current =true 
    }
    useEffect(() => {        
        updateStyle()
        return ()=>{
            removeStylesheet(styleContext.styleId)
        }
    }, []);
    return styleContext
}
