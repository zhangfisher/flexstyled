# StyledFc

StyledFc is a simple runtime `css-in-js` library for react component

[中文](./readme_CN.md)

- zero dependencies.
- very small, < 3kb.
- runtime css generation.
- support css variables.
- support nested css.
- support props dynamic css.
- typescript support.

[Open demo on CodeSandbox](https://codesandbox.io/p/sandbox/styledfc-demo-x7w94w?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clstzj2mg0006356lkdcmsv3s%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clstzj2mg0002356lq7y9whne%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clstzj2mg0003356lip4fhd1w%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clstzj2mg0005356l6vsjkkfr%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clstzj2mg0002356lq7y9whne%2522%253A%257B%2522id%2522%253A%2522clstzj2mg0002356lq7y9whne%2522%252C%2522tabs%2522%253A%255B%255D%257D%252C%2522clstzj2mg0005356l6vsjkkfr%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clstzj2mg0004356l6rts8s1f%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clstzj2mg0005356l6vsjkkfr%2522%252C%2522activeTabId%2522%253A%2522clstzj2mg0004356l6rts8s1f%2522%257D%252C%2522clstzj2mg0003356lip4fhd1w%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clstzj2mg0003356lip4fhd1w%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## Installation

```bash
pnpm add styledfc
# or
npm install styledfc
# or
yarn add styledfc
```

## Usage

We plan to develop a `Card` component, which has a `title` attribute for displaying titles, a `footer`' attribute for displaying bottom content, and a `children` attribute as the content area of the card.


### Basic Usage
 

```tsx
import { styled } from "styledfc" 

export type  CardProps = React.PropsWithChildren<{
    title:string 
    footer?:string
  }>

export const Card = styled<CardProps>((props,{className})=>{
    const { title,children,footer} =props
    return (
      <div  className={className}>
        <div className="title">            
            {title}
        </div>
        <div className="content">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )
  },{  
    position:"relative",
    width:"100%",
    border:"1px solid #ccc",
    borderRadius:"4px" 
  })

```
  
-The above code will create a `Card` component, generate a style class (with a randomly generated name) for the style, and insert it into the `head` tag.
-Then pass the `className` prop to the component, which will use this class name to apply the style.

You can find a CSS style similar to this in the `head`, where the `className` and `style.id` are both automatically generated. You can also specify `styleId` and `className` through the `options` parameter.

```html
<style id="6rxqfu">
.sw6y3s4{
    position:relative;
    width:100%;
    border:1px solid #ccc;
    border-radius:4px;
}
</style>
```

### Nested Style 

Next, let's add styles to the `title` and `footer` of the `Card` component


```tsx
export const Card = styled<CardProps>((props,{className})=>{
    const { title,children,footer} =props
    return (
      <div  className={className}>
        <div className="title">            
            {title}
        </div>
        <div className="content">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )},{  
      position:"relative",
      width:"100%",
      border:"1px solid #ccc",
      borderRadius:"4px",
      "& > .title":{
        fontSize:"20px",
        fontWeight:"bold",
      },
      "& > .footer":{
        borderTop:"1px solid #ccc",
        padding:"8px",
        textAlign:"right"
      }
  })
```

-We have added styles to the `title` and `footer` above.
-Use the `&` symbol to represent the current parent element, similar to the syntax of nested CSS such as `less` and `sass`.


The style generated in `head` is as follows:

```html
<style id="6rxqfu">
.sw6y3s4{
    position:relative;
    width:100%;
    border:1px solid #ccc;
    border-radius:4px;
}
.sw6y3s4 > .title{
    font-size:20px;
    font-weight:bold;
}
.sw6y3s4 > .footer{
    border-top:1px solid #ccc;
    padding:8px;
    text-align:right;
}
</style>
```

### Dynamic Style

`styledfc` supports using `props` to dynamically set styles.

For example, we want the background color of the `content` card to be specified by the `props.bgColor` attribute.


```tsx

export const Card = styled<CardProps>((props,{className,getStyle})=>{
    const { title,children,footer} =props
    return (
      <div  className={className} style={getStyle()}>
        <div className="title">            
            {title}
        </div>
        <div className="content">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )},{ 
      position:"relative",
      width:"100%",
      border:"1px solid #ccc",
      borderRadius:"4px",
      "& > .title":{
        fontSize:"20px",
        fontWeight:"bold",
      },
      "& > .footer":{
        borderTop:"1px solid #ccc",
        padding:"8px",
        textAlign:"right"
      },
      "& > .content":{
        padding:"8px",
        backgroundColor:(props)=>props.bgColor
      }
  })
```

- The above code uses `props.bgColor` to dynamically set the background color of the `content` card.
- In order to support dynamic properties, we need to use the `getStyle` function to get the dynamic style and inject it into the root element of the component.
- The `getStyle` function returns a `css` style object that can be passed directly to the `style` attribute.
- Any `css` property can use `(props)=>{....}` to dynamically generate CSS property values.

### CSS Variables

`styledfc` supports using `css` variables.

We can use `css` variables in the root style declaration, and then use the `setVar` function to dynamically modify the `css` variable in the component.


```tsx

export const Card = styled<CardProps>((props,{className,getStyle})=>{
    const { title,children,footer} =props
    const [primaryColor,setPrimaryColor] = React.useState("blue")
    return (
      <div className={className} style={getStyle({"--primary-color":primaryColor})}>
        </div>
        <div className="content">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )},{ 
      position:"relative",
      width:"100%",
      border:"1px solid #ccc",
      borderRadius:"4px",
      "--primary-color":"blue",
      "& > .title":{
        fontSize:"20px",
        fontWeight:"bold",
        color:"var(--primary-color)"
      },
      "& > .footer":{
        borderTop:"1px solid #ccc",
        padding:"8px",
        textAlign:"right"
      },
      "& > .content":{
        padding:"8px",
        backgroundColor:(props)=>props.bgColor
      }
  })
```


- The above code uses `css` variables.
- We declare a `--primary-color` `css` variable in the root style.
- Then we use the `--primary-color` variable in the `title` style.
- In order to modify the `css` variable, we need to introduce `ref` and pass `ref` to the root element, and then use the `setVar` function to modify the `css` variable.

### Summary

`styledfc` is a very simple `css-in-js` library that can help you quickly encapsulate `react` components and support `css` variables and dynamic `css` properties.

- By default, you only need to reference `className` in the component.
- If you need to dynamically modify `css` variables, you need to introduce `ref`, pass `ref` to the root element, and then use the `setVar` function to modify `css` variables.
- If you need to use `props` dynamic `css` properties, you need to use the `getStyle` function to get the dynamic css style and inject it into the root element.


## creteStyle

`styled` function can also be used to create styles only and insert into head.

```tsx
// card.style.ts

import { styled } from "styledfc"

// create style and insert into head
export default styled({ // 组件样式
      position:"relative",
      width:"100%",
      border:"1px solid #ccc",
      borderRadius:"4px",
      "--primary-color":"blue",
      "& > .title":{
        fontSize:"20px",
        fontWeight:"bold",
        color:"var(--primary-color)"
      },
      "& > .footer":{
        borderTop:"1px solid #ccc",
        padding:"8px",
        textAlign:"right"
      },
      "& > .content":{
        padding:"8px",
        backgroundColor:(props)=>props.bgColor
      }
  })

// card.tsx
import cardStyle from "./card.style"

export default (props:CardProps)=>{
    return (
      <div className={cardStyle.className} style={cardStyle.getStyle({"--title-color":titleColor},props)}>
        <div className="title">            
            {props.title}
        </div>
        <div className="content">{props.children}</div>
        <div className="footer">{props.footer}</div>
      </div>
    )
  }
```


## Hook

`styledfc` also provides a hook `useStyled` to help you quickly encapsulate `react` components.

 
```tsx
import { useStyle } from "styledfc"
export const Card2:React.FC<React.PropsWithChildren<CardProps>> = ((props:CardProps)=>{
    const { title } = props
    const [titleColor,setTitleColor] = useState("blue")
    const {className,getStyle } =  useStyle({
        // style 
    })
    return (
      <div className={className} style={getStyle({"--title-color":titleColor},props)}>
        <div className="title">            
            <span>{title}</span>
            <span className="tools"><button onClick={()=>setTitleColor(getRandColor())}>Change</button></span>
        </div>
        <div className="content">          
            {props.children}
        </div>
        <div className="footer">{props.footer}</div>
      </div>
    )
  })
```

- The `useStyle` hook returns `className` and `getStyle`, which are used to inject style class names and dynamic styles.
- The `getStyle` function returns a `css` style object that can be passed directly to the `style` attribute.
- The `useStyle` hook supports passing `options` parameters to configure `styleId` and `className`.
- The `useStyle` hook is the same as the `styled` function, the only difference is that the `style` sheet injected into the `head` will be automatically removed when the component is uninstalled.

## Options


```tsx

// styled(<React.FC>,<styles>,<options>)

export interface StyledOptions{
    // The ID of the style sheet, if not specified, will be automatically generated
    styleId?:string                          
    // The generated class name, if not specified, will be automatically generated
    className?:string                        
}


```


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
    vars:Record<string,string | number> 
    // get the css style object，only use when use props dynamic css
    getStyle : ()=>Record<string,string | number>
}

export type StyledComponent<Props> = (props:React.PropsWithChildren<Props>,params:StyledComponentParams)=>React.ReactElement

styled<Props>(FC: StyledComponent<Props>,styles:CSSObject,options?:StyledOptions)

```