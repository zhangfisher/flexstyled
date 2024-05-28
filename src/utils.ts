import { ComputedStyles, Dict } from "./types" 

export type InsertStylesheetOptions ={
    mode?:'append'|'prepend'|'replace',
    // 插入代码时的回调函数，如果返回false则不插入
    onInsert?:(el:HTMLElement)=>boolean
}


/**
 * 在HTML文档头部插入CSS样式,如果已经存在则更新
 * 
 * @param css - CSS样式
 * @param id - 样式ID
 * 
 * 
 */
export function insertStylesheet(css:string,id:string,options?:InsertStylesheetOptions){
    const { mode='replace',onInsert } = Object.assign({},options)
    let style = document.getElementById(id)
    if(!style){
        style = document.createElement("style")
        style.id = id
        document.head.appendChild(style)
    }    
    if(!onInsert || (typeof(onInsert)=="function" && onInsert(style))){
        if(mode==='replace'){
            style.innerHTML = css
        }else if(mode==='prepend'){
            style.innerHTML = css + style.innerHTML
        }else{
            style.innerHTML = style.innerHTML + css
        }
    }
}

export function removeStylesheet(id:string){
    const style = document.getElementById(id)
    if(style){
        document.head.removeChild(style)
    }
}

export function isPlainObject(obj:any){
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = Object.getPrototypeOf(obj);
    if (proto === null) return true;
    var baseProto = proto;
    while (Object.getPrototypeOf(baseProto) !== null) {
        baseProto = Object.getPrototypeOf(baseProto);
    }
    return proto === baseProto;
}

 /**
 * 生成一个样式表id
 * 
 * @param styles 
 */
export function generateStyleId():string{
    return 's'+Math.random().toString(36).substring(2, 8)   
} 

/**
 * 生成一个随机的样式类名
 * 
 * @returns 
 */
export function generateClassName():string{
    return 'c'+Math.random().toString(36).substring(2, 8)  
} 

export function getComputedStyles(computedStyles:ComputedStyles[],props:any,vars:Dict){
    const result:ComputedStyles = {}
    computedStyles.forEach((styles)=>{
        for(const [varName,fn] of Object.entries(styles || {})){
            result[varName] = fn(props,vars)
        }
    })
    return result
}

 

export function joinClassNames(...classNames:(string|undefined)[]):string{
    return classNames.join(" ").trim()
}



 
/**
 * 
 * 将一个CSS样式对象转换为CSS变量声明字符器
 * 
 * 如  parseRuleObject({
 *       border:"1px",
 *       paddingLeft:"2px",
 *       color:(props)=>props.textColor,
 *       --v-x:"1em"
 *   })
 * 
 * 转换为:
 * 
 {
    css:"border:1px;\npadding-left:2px;color:var(--p-xxxxxx);\n",
    computedVars:{
        "--p-xxxxxx":(props)=>props.textColor,
    },
    vars:{--v-x:"1em"},


})
 * 

 * 
 * @param styles 
 * @returns 
 */
// export function parseRuleObject(styles:CSSProperties){
//     const rules:string[] = []
//     Object.entries(styles).forEach(([key,value])=>{
//         if(typeof(rules)==='function'){
//             let varName = parentRule+"-"+ruleName
//             if(varName.startsWith(className)) varName = varName.substring(className.length)
//             varName = `--p-${shortHash(varName)}`                
//             rule += `${toCssStyleName(ruleName)}: var(${varName});\n`            
//             computedVars.push( `${varName}: unset;\n`)
//             computedStyles[varName] = value                     // 保存动态样式函数      
//         }else{
//             rules.push(`${toCssStyleName(key)}: ${value};`)
//         }
//         rules.push(`${toCssStyleName(key)}: ${value};`)
//     })
//     return {css:`{\n${rules.join("\n")}\n}`,computedStyles: styles}
// }


export function toCssRuleName(camelCase:string){
    return camelCase.replace(/([a-z])([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase())
}

/**
 * 将一个驼峰命名转换为CSS变量命名样式，如borderRadius => --border-radius
 * 
 * 如果指定了 prefix，则会被移除
 * 
 * @param camelCase 
 * @returns 
 */
export function toCssVarName(camelCase:string,prefix?:string){
    let r=  `--${camelCase.replace(/([a-z])([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase())}`
    if(prefix && prefix.trim()!==''){
        r = r.replace("--",`--${prefix.toLowerCase()}-`)
    }
    return r
}
  
/**
 *  从 CSS 变量名转换为驼峰命名，比如--border-radius => borderRadius
 * 
 *  CSS 变量名形式一般是
 *   --custom-property-name
 * 需要转换为驼峰命名 customPropertyName
 * 
 * @param cssVarName 
 * @param prefix  如果指定前缀，是移除
 * @returns 
 */
export function fromCssVarName(cssVarName:string,prefix?:string){ 
    if(prefix && prefix.length>0){
        cssVarName = cssVarName.replace(`--${prefix}-`,"--")
    }
    return  cssVarName.replace(/^--([a-z])([A-Z]?)/g, (match, p1, p2) => p1.toLowerCase()+ p2.toLowerCase())
        .replace(/-([a-z])([A-Z]?)/g, (match, p1, p2) => p1.toUpperCase() + p2)
    

}


