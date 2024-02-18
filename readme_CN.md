# StyledFc

一个简单的css-in-js库，用于封装`react`组件

- 非常小，仅仅1.5kb.
- 运行时生成css
- 支持css变量
- 支持类似less的嵌套css样式
- 支持typescript

## 安装

```bash
pnpm add styledfc
# or
npm install styledfc
# or
yarn add styledfc
```

## 用法

```tsx
import { styled } from "styledfc"
import { getRandColor } from "./utils"

export type  CardProps = React.PropsWithChildren<{
    title:string
    footer:string
  }>

export const Card = styled<CardProps>((props,{ref,setVar,className,styleId,vars})=>{
    const { title } =props
    return (
      <div ref={ref} > 
        <div className="title">            
            <span>{title}</span>
            <span className="tools"><button onClick={()=>setVar('--title-color',getRandColor())}>Change</button></span>
        </div>
        <div className="content">{props.children}</div>
        <div className="footer">{props.footer}</div>
      </div>
    )
  },{
    position:"relative",
    display:"block",
    width:"100%",
    fontSize:"16px",
    border:"1px solid #ccc",
    textAlign:"left",
    borderRadius:"4px",
    "--title-color":"blue",
    "&:hover":{
        border:"1px solid #1698e4",
    },
    "& > .title":{
      padding:"8px",
      background:"#eee",
      fontSize:"18px",
      fontWeight:"bold",
      borderBottom:"1px solid #ccc",
      display:"flex",
      flexDirection:"row",
      "& :first-child" : {
        flex:1,        
        color:"var(--title-color)",
      },
      "& > .tools":{
        "& > button":{
            padding:"4px",
            background:"#ebebeb",
            color:"#666",
            border:"1px solid #555",
            borderRadius:"4px",
            cursor:"pointer",
            "&:hover":{
                background:"#64a7ff",
                color:"white"
            }
        }   
       }
    },
    "& > .content":{
        minHeight:"100px",
        padding:"8px",
        boxSizing:"border-box"
    },
    "& > .footer":{
        padding:"8px",
        background:"var(--title-color)",
        borderTop:"1px solid #ccc",
        textAlign:"right"
    }
  })

```
 
- 以下代码将会自动生成样式表插入到当前文档的头部`head`,`stylesheet id`是自动生成的，也可以通过`styleId`选项指定。
- 自动生成`css`类名，如果要指定类名，可以通过`className`选项指定。类名将被添加到`ref`指定的`dom`元素上。
- 支持`css`变量，可以使用`setVar`方法在组件上更新`css`变量的值。
- 支持嵌套`css`，可以使用`&`引用父`css`类。
- 默认情况下，组件使用`ref`引用`dom`元素，例如`<div ref={ref}>`。
- `vars`可以用来访问`css`变量，例如`vars['--title-color']`。 

## API

```tsx
export interface StyledOptions{
    // 生成的样式表id，如果没有指定则自动生成
    styleId?:string                          
    // 生成的css类名，如果没有指定则自动生成
    className?:string                       
}
export type StyledComponentParams ={
    // 生成的css类名
    className:string
    // 生成的样式表id
    styleId:string
    // css变量
    vars:Record<string,string | number>
    // 更新css变量
    setVar:(name:string,value:string | number)=>void
    // 用来引用组件的dom元素的ref
    ref:React.RefObject<any>
}

export type WithStyledComponent<Props> = (props:React.PropsWithChildren<Props>,params:StyledComponentParams)=>React.ReactElement

styled<Props>(FC: WithStyledComponent<Props>,styles:CSSObject,options?:StyledOptions)

```