import { ComputedStyles } from "./types" 

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

export function getComputedStyles(computedStyles:ComputedStyles[],props:any){
    const result:ComputedStyles = {}
    computedStyles.forEach((styles)=>{
        for(const [varName,fn] of Object.entries(styles || {})){
            result[varName] = fn(props)
        }
    })
    return result
}

 

export function joinClassNames(...classNames:(string|undefined)[]):string{
    return classNames.join(" ").trim()
}


/**
* 将驼峰命名转换为css样式命名样式，如borderRadius => border-radius
* @param camelCaseString 
* @returns 
*/
export function toCssStyleName(camelCaseString: string): string {  
    return camelCaseString.replace(/([a-z])([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase());  
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