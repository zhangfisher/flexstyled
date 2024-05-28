/**
 * 

 * 
 * 
 * 
 * myStyle = styled({},[keyframes])
 * 
 * <div style={myStyle.getStyle({},props)}>
 * 
 * 
 */

import { parseObjectStyles } from './parse';
import { CSSKeyframes, ComputedStyles } from './types';
import { insertStylesheet } from './utils';
import { test } from 'vitest';

export type KeyframesObject = {
    __keyframes__ : true
    name:string
    computedStyles : ComputedStyles
}


 
/**
 * @example
 * 
 * const keyframes = keyframes("xxxx",{
 *      from: {
 *          opacity: 0
 *      },
 *      to : {
 *          opacity: (props)=>props.someProp
 *      }  
 * });
 * 
 * 
 * @param name 
 * @param keyframes 
 */
export function parseKeyframes(name:string,keyframes: CSSKeyframes){
     
    return parseObjectStyles({
        [`@keyframes ${name}`]:keyframes
    } as any,{
        className:''
    })
    

}

/**
 * 声明一个CSS关键帧
 * 
 * @example
 * 
 *       const myKeyframes = keyframes("xxxx",{
 *          from: {
 *              opacity: 0
 *          },
 *          to : {
 *              opacity: (props)=>props.someProp
 *          }  
 *       })
 *   
 *  styled({
 *      width:100,...,
 *      
 *  },[
 *      myKeyframes
 *  ])
 * 
 * 
 * 
 * 
 * @param name 
 * @param keyframes 
 */
export function keyframes(name:string,keyframes: CSSKeyframes){
    const result = parseKeyframes(name,keyframes) 
    insertStylesheet(result.css,'flexstyled-keyframes',{
        mode:'append',
        onInsert: (el)=>{
            const reg = new RegExp(`@keyframes\s*${name}\s*`)
            return reg.test(el.innerHTML)
        }
    })
    return result  
}