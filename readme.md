# StyledFc

StyledFc is a simple css-in-js library for react component


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

export type  CardProps = React.PropsWithChildren<{
    title:string
    footer:string
  }>

export const Card = styled<CardProps>((props,className)=>{
    const { title } =props
    return (
      <div className={className}>
        <div className="title">{title}</div>
        <div className="content">{props.children}</div>
        <div className="footer">{props.footer}</div>
      </div>
    )
  },{
    position:"relative",
    display:"block",
    width:"100%",
    fontSize:"border-box",
    border:"1px solid #ccc",
    textAlign:"left",
    borderRadius:"4px",
    "&:hover":{
        border:"1px solid #1698e4",
    },
    "& > .title":{
      padding:"8px",
      background:"#eee",
      fontSize:"18px",
      fontWeight:"bold"
    },
    "& > .content":{
        minHeight:"100px",
        padding:"8px",
        boxSizing:"border-box"
    },
    "& > .footer":{
        padding:"8px",
        background:"#eee",
        borderTop:"1px solid #ccc",
        textAlign:"right"
    }
  })

```
 
## API

```tsx
export interface StyledOptions{
    styleId?:string                          // 样式表的ID
    className?:string                        // 生成的样式类名，如果没有指定则自动生成
}

styled<Props>(FC: WithStyledComponent<Props>,styles:CSSObject,options?:StyledOptions)

```