

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


 