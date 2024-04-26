/**
 *  创建一个styled组件
 * 
 *   const MyComponent = styled.div({
 *      组件样式,支持伪类,子元素选择器等
 *   },options)
 * 
 *  <MyComponent>
 *          <span></span>  // 里面有元素可以生效
 *  </MyComponent>
 *   
 */


import { createStyled } from "./styled"
import { CSSRuleObject,StyledOptions } from './types';
import React from "react"
 

const VALID_HTML_TAGS = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'
];

export interface StyledComponentCreatorOptions extends StyledOptions{
}


export type StyledComponentCreator =<Props=any>(style:CSSRuleObject,options?:StyledComponentCreatorOptions)=> React.FC<React.PropsWithChildren<
Pick<React.HTMLAttributes<HTMLElement>,'className' | 'style'> & Props>> 

export type StyledFcObject = typeof createStyled & {
    [K in keyof HTMLElementTagNameMap]: StyledComponentCreator;
  };


export const styled = new Proxy<StyledFcObject>(createStyled  as StyledFcObject,{
    get(target: typeof createStyled, key: string | symbol, receiver: any){
        if(typeof(key) == 'string' && VALID_HTML_TAGS.includes(key)){
            return (style:CSSRuleObject,options?:StyledComponentCreatorOptions)=>{
                return createStyled((props,{className,getStyle})=>{
                    return React.createElement(key,{
                        ...props,
                        className,
                        style:getStyle()
                    },props.children)
                },style,options)
            }
        }else{
            return Reflect.get(target,key,receiver) 
        }
    }
})

 
