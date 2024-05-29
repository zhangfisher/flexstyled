import { useCallback,  useRef, useState,useInsertionEffect, useLayoutEffect, useEffect, EffectCallback, useMemo } from "react";
import { generateStyleId, insertStylesheet, removeStylesheet } from "./utils";
import type { CSSRuleObject, StyledObject } from "./types";
import { createStyled, type StyledOptions } from ".";



export function useOnMount(effect: EffectCallback) {
    const initialized = useRef(false)
  
    useEffect(() => {
      if (!initialized.current) {
        initialized.current = true
        effect()
      }
    }, [])
  }


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
    const styleId = useRef<string>(''); 
    const styledObj = useMemo(()=>{    
        const styleData = typeof(styles)=='function' ? styles() : styles
        if(styleId.current=='') styleId.current = generateStyleId()
        const opts = Object.assign({ inject:false, id: styleId.current }, options) as unknown  as StyledOptions        
        return createStyled(styleData,opts)
    },[])

     const injectStyle = useCallback(()=>{    
        insertStylesheet(styledObj!.css,styledObj!.id)
    },[])
    
    useInsertionEffect (() => {    
        injectStyle()   
        return ()=>{  
            removeStylesheet(styledObj!.id)       
        }
    }, []);
    return styledObj!
}