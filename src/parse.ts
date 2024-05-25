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
 *  "@media screen and (max-width: 600px)":{
 *      
 *   }
 * }
 * 
 * 
 */

import { CSSRuleObject, ComputedStyleDefine, ComputedStyles, StyledOptions } from "./types"
import { shortHash } from "./hash"
import { toCssStyleName } from "./utils"
 


/**
 * 判定一个css属性是否是条件规则，比如@media/@layer/@font/等
 * 
 * 
 * @param obj 
 * @param property 
 * @returns 
 */
function isIfRule(ruleName:string){
    return ruleName.startsWith("@")
}



export function parseStyles(styles:CSSRuleObject,options?:StyledOptions){
    const opts = Object.assign({},options) as Required<StyledOptions> 
    const { className } = opts
    const rules:string[] = []
    const vars:Record<string,string | number> = {}
    const computedStyles:ComputedStyles = {}                // 保存动态样式函数,如(props)=>{}
    const computedVars:string[] = []                        // 动态样式被转换为CSS变量的变量声明

    // asClass:  是否将对象解析为类样式
    //  parseStyle({border:1},"xxxx",false) ==> {border:1}
    //  parseStyle({border:1},"xxxx") ==> .xxxx .poiqmn{border:1}
    const parseStyle = (styles:CSSRuleObject,parentRule:string,asClass:boolean=true)=>{
        let rule = ""  
        let childRules:[string,CSSRuleObject][] = []
        for(const [ruleName,value] of Object.entries(styles)){
            if(typeof(value)=='object'){
                if(isIfRule(ruleName)){
                    rules.push(`${ruleName} {`)                
                    if(ruleName.startsWith("@keyframes")){
                        parseStyle(value,'',false)  
                    }else{
                        parseStyle(value,parentRule)  
                    }                    
                    rules.push("}")
                }else{
                    // 以&开头的规则，表示子元素所以需要添加父元素作为前缀                    
                    const pKey = ruleName.trim().startsWith("&") ? ruleName.substring(1) : ruleName
                    // 以@开头的规则，表示条件规则
                    childRules.push([`${parentRule}${pKey}`,value])
                }                
            }else if(typeof(value)=='function'){            // 动态样式函数,为动态样式生成一个css变量
                // 处理动态样式，即通过(props)=>{}的方式生成样式，这种样式需要在组件渲染时动态计算，因此将之生成对应的组件级别的css变量
                // 比如{border:(props)=>`1px solid ${props.borderColor}`}, 会生成一个名为随机的css变量                
                // 为动态样式生成一个css变量
                let varName = parentRule+"-"+ruleName
                if(varName.startsWith(className)) varName = varName.substring(className.length)
                varName = `--p-${shortHash(varName)}`                
                rule += `${toCssStyleName(ruleName)}: var(${varName});\n`            
                computedVars.push( `${varName}: unset;\n`)
                computedStyles[varName] = value                     // 保存动态样式函数                
            }else{
                rule += `  ${toCssStyleName(ruleName)}: ${value};\n`
                //注意： CSS变量只能在根样式中定义
                if(ruleName.startsWith("--")){
                    vars[ruleName] = value
                }
            }   
        }
        if(rule.endsWith("\n")) rule = rule.substring(0,rule.length-1)
        
        // 只在根元素中采集动态样式变量
        if(rule.length>0){
            if(asClass){
                rules.push(`\n.${parentRule} {\n${rules.length==0 ? rule+"\n__COMPUTED_VARS__" : rule}\n}`)
            }else{
                rules.push(`\n${parentRule} {\n${rules.length==0 ? rule+"\n__COMPUTED_VARS__" : rule}\n}`)
            }            
        }

        // 递归解析子样式
        childRules.forEach(([rule,value])=>{
            parseStyle(value,rule,asClass)
        }) 
    }

    parseStyle(styles,className)    

    return {
        ...opts, 
        vars,
        computedStyles,
        css:rules.join("\n").replace('__COMPUTED_VARS__',computedVars.join("\n"))
    }
}

