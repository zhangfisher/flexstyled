# StyledFc

一个简单的`css-in-js`库，用于封装`react`组件

- 非常小，仅`2.26`kb.
- 运行时生成css
- 支持css变量
- 支持类似less的嵌套css样式
- 支持props动态css
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
    bgColor?:string
  }>

export const Card = styled<CardProps>((props,{ref,setVar,className,getStyle,vars})=>{
    const { title } =props
    return (
     // 如果没有使用props作为动态样式值，则不需要传入 style={getStyle()，只需要<div ref={ref} className={className}}>
     // 如果没有使用没有用到setVar动态修改css变量，则则不需要传入ref,只需要<div className={className}}>
      {/** 使用ref引用dom元素 */}
      <div ref={ref} className={className} style={getStyle()}>
        <div className="title">            
            <span>{title}</span>
            {/** 更新css变量值 */}
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
        boxSizing:"border-box",
        // 使用props.bgColor作为背景色
        background:(props:Required<CardProps>)=>props.bgColor || "white"
    },
    "& > .footer":{
        padding:"8px",
        background:"var(--title-color)",
        borderTop:"1px solid #ccc",
        textAlign:"right"
    }
  })

```
 
- 以上代码将会自动生成样式表插入到当前文档的头部`head`,`stylesheet id`是自动生成的，也可以通过`styleId`选项指定。
- 自动生成`css`类名，如果要指定类名，可以通过`className`选项指定。类名将被添加到`ref`指定的`dom`元素上。
- 支持`css`变量，可以使用`setVar`方法在组件上更新`css`变量的值。
- 支持嵌套`css`，可以使用`&`引用父`css`类。
- 默认情况下，组件使用`ref`引用`dom`元素，例如`<div ref={ref}>`。
- 如果没有使用`props`作为动态样式值，则不需要传入`style={getStyle()}`，只需要`<div ref={ref} className={className}}>`
- 如果没有使用没有用到`setVar`动态修改css变量，则不需要传入`ref`,只需要`<div className={className}}>`

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
    // 用来引用组件的dom元素的ref，仅当使用setVar动态修改css变量时需要引到dom元素
    ref:React.RefObject<any>
    // 获取动态css样式，当使用props动态css时需要使用getStyle注入css样式对象，例如style={getStyle()}
    getStyle : ()=>Record<string,string | number>
}

export type StyledComponent<Props> = (props:React.PropsWithChildren<Props>,params:StyledComponentParams)=>React.ReactElement

styled<Props>(FC: StyledComponent<Props>,styles:CSSObject,options?:StyledOptions)

```