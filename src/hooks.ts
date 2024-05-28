import { useCallback,  useRef, useState,useInsertionEffect, useLayoutEffect, useEffect } from "react";
import { generateStyleId, insertStylesheet, removeStylesheet } from "./utils";
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
export function useStyled<Props=any>(styles: CSSRuleObject<Props> | (()=>CSSRuleObject<Props>),options?:Omit<StyledOptions,'id'>):StyledObject {
    const firstRef = useRef<boolean>(false); 
    const styleId = useRef<string>(''); 
    const createStyle = useCallback(()=>{    
        const styleData = typeof(styles)=='function' ? styles() : styles
        if(styleId.current=='') styleId.current = generateStyleId()
        const opts = Object.assign({ inject:false, id: styleId.current }, options) as unknown  as StyledOptions        
        return createStyled(styleData,opts)
    },[])

    const [ styledObj ,setStyledObj] = useState<StyledObject>(createStyle())
    const injectStyle = useCallback(()=>{    
        insertStylesheet(styledObj!.css,styledObj!.id)
    },[])
    
    if(!firstRef.current) {        
        setStyledObj(createStyle())
        injectStyle()
        firstRef.current = true
    }
    
    useInsertionEffect (() => {    
        injectStyle()   
        return ()=>{  
            removeStylesheet(styledObj!.id)       
        }
    }, []);
    return styledObj!
}