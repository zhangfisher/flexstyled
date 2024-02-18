# StyledFc

StyledFc is a simple css-in-js library for react component

[中文](./readme_CN.md)

- very small, only 1.5kb.
- support css variables.
- support nested css.
- typescript support.

## Installation

```bash
pnpm add styledfc
# or
npm install styledfc
# or
yarn add styledfc
```

## Usage

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
 
- generate css stylesheet and class append to the head of the document. stylesheet id is generated automatically, if you want to specify the id, you can pass it as `styleId` option.
- generate css class name, if you want to specify the class name, you can pass it as `className` option. `className` will be added to the `dom` element referenced by `ref`.
- support css variables, you can use `setVar` method to update the css variable value on the component.
- support nested css, you can use `&` to reference the parent css class.
- default, the component use `ref` to reference the dom element, eg. `<div ref={ref}>`.
- you can use `vars` to access the css variables, eg. `vars['--title-color']`.
 

## API

```tsx
export interface StyledOptions{
    // stylesheet id, if not provided, it will be generated automatically
    styleId?:string                          
    // generated className, if not provided, it will be generated automatically
    className?:string                       
}
export type StyledComponentParams ={
    // generated css class name
    className:string
    // generated css style id
    styleId:string
    // css variables
    vars:Record<string,string | number>
    // update css variable value on the component
    setVar:(name:string,value:string | number)=>void
    // ref of the component
    ref:React.RefObject<any>
}

export type WithStyledComponent<Props> = (props:React.PropsWithChildren<Props>,params:StyledComponentParams)=>React.ReactElement

styled<Props>(FC: WithStyledComponent<Props>,styles:CSSObject,options?:StyledOptions)

```