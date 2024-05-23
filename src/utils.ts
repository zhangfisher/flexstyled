

/**
 * 在HTML文档头部插入CSS样式,如果已经存在则更新
 * 
 * @param css - CSS样式
 * @param id - 样式ID
 * 
 * 
 */
export function insertStylesheet(css:string,id:string){
    let style = document.getElementById(id)
    if(!style){
        style = document.createElement("style")
        style.id = id
        document.head.appendChild(style)
    }
    style.innerHTML = css
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

export function getComputedStyles(styles:Record<string,Function>,props:any){
    const computedStyles:Record<string,string | number> = {}
    for(const [varName,fn] of Object.entries(styles || {})){
        computedStyles[varName] = fn(props)
    }
    return computedStyles
}

 