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

import { CSSObject } from "./types"


export interface CreateStylesOptions{
    className?:string           // 生成的样式类名，如果没有指定则自动生成
}
function toCssStyleName(camelCaseString: string): string {  
    return camelCaseString.replace(/([a-z])([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase());  
  }  
export function createStyles(styles:CSSObject,options?:CreateStylesOptions){
    const { className } = Object.assign({},options) as Required<CreateStylesOptions> 
    const rules:string[] = []
    const parseStyle = (styles:CSSObject,parentRule:string)=>{
        let rule = ""
        let childRules = []
        for(const [ruleName,value] of Object.entries(styles)){
            if(typeof(value)=='object'){
                const pKey = ruleName.trim().startsWith("&") ? ruleName.substring(1) : ruleName
                if(pKey.startsWith(":") || pKey.startsWith("[")){
                    childRules.push([`${parentRule}${pKey}`,value])
                }else{
                    childRules.push([`${parentRule} ${pKey}`,value])
                }
            }else{
                rule += `${toCssStyleName(ruleName)}: ${value};\n`
            }            
        }
        if(rule.endsWith("\n")) rule = rule.substring(0,rule.length-1)
        rules.push(`\n.${parentRule}{\n${rule}}`)
        // 递归解析子样式
        childRules.forEach(([rule,value])=>{
            parseStyle(value,rule)
        }) 
    }
    parseStyle(styles,className)
    return [className,rules.join("\n")]
}


console.log(createStyles({ 
    color:"red",
    backgroundColor:"blue",
    "--v1":"red",
    ":hover":{
        border: "1px solid red",
        color:"blue"
    },
    "&:hover":{
        outline:'none'
    },
    "&[data-loading=true]":{
        display:"flex"
    },
    "& div":{
        padding:2
    },
    "& > div":{
        padding:4,
        margin:"8px",
        ">h1":{
            color:"red"
        },
        ":hover":{
            outline: "1px solid red"
        }
    }
},{className:"myclass"})[1])


