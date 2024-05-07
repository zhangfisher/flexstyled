/**
 * 
 * 解析样式对象
 * 
 * {
        color:"red",
        backgroundColor:"blue"
        ":hover":{

        }
        "&:hover",
        "&[]"
        "& div":{
        }
        "& > div":{
        }
    })
 
解析过程如下：

```
.awquz7er{
    color:"red",
    backgroundColor:"blue"
}

.awquz7er:hover{
    color:"blue"
}
.awquz7er div{
    color:"blue"
}
```


 * parseStyles({},className)
 * 
 * {
 *  "类":{},
 *  "类":{},
 *  "类":{},
 *  "类":{},
 *  "类":{},
 * }
 * 
 * 
 */

import { CSSRuleObject } from "./types"
import { shortHash } from "./hash"


export interface CreateStylesOptions{
    className?:string           // 生成的样式类名，如果没有指定则自动生成
    styleId:string
}
/**
 * 将驼峰命名转换为css样式命名
 * @param camelCaseString 
 * @returns 
 */
function toCssStyleName(camelCaseString: string): string {  
    return camelCaseString.replace(/([a-z])([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase());  
}  

export function createStyles(styles:CSSRuleObject,options?:CreateStylesOptions){
    const opts = Object.assign({},options) as Required<CreateStylesOptions> 
    const { className } = opts
    const rules:string[] = []
    const vars:Record<string,string | number> = {}
    const computedStyles:Record<string,Function> = {}
    const rooRules:string[] = []  // 动态样式变量均声明在根样式中

    const parseStyle = (styles:CSSRuleObject,parentRule:string)=>{
        let rule = ""
        let childRules:[string,CSSRuleObject][] = []
        for(const [ruleName,value] of Object.entries(styles)){
            if(typeof(value)=='object'){
                const pKey = ruleName.trim().startsWith("&") ? ruleName.substring(1) : ruleName
                childRules.push([`${parentRule}${pKey}`,value])
            }else if(typeof(value)=='function'){
                // 处理动态样式，即通过(props)=>{}的方式生成样式，这种样式需要在组件渲染时动态计算，因此将之生成对应的组件级别的css变量
                // 比如{border:(props)=>`1px solid ${props.borderColor}`}, 会生成一个名为--border的css变量
                
                // 为动态样式生成一个css变量
                let varName = parentRule+"-"+ruleName
                if(varName.startsWith(className)) varName = varName.substring(className.length)
                varName = `--p-${shortHash(varName)}`                
                rule += `${toCssStyleName(ruleName)}: var(${varName});\n`            
                rooRules.push( `${varName}: unset;\n`)
                // 保存动态样式函数
                computedStyles[varName] = value
            }else{
                rule += `${toCssStyleName(ruleName)}: ${value};\n`
                // CSS变量只能在根样式中定义
                if(ruleName.startsWith("--")){
                    vars[ruleName] = value
                }
            }            
        }
        if(rule.endsWith("\n")) rule = rule.substring(0,rule.length-1)
        rules.push(`\n.${parentRule}{\n${rules.length==0 ? rule+"\n__COMPUTED_VARS__" : rule}}`)
        // 递归解析子样式
        childRules.forEach(([rule,value])=>{
            parseStyle(value,rule)
        }) 
    }
    parseStyle(styles,className)    
    return {
        ...opts, 
        vars,
        computedStyles,
        css:rules.join("\n").replace('__COMPUTED_VARS__',rooRules.join("\n"))
    }
}

