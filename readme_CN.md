# StyledFc

一个简单的运行时`css-in-js`库，用于封装`react`组件

- 零依赖
- 非常小，< 3kb.
- 运行时生成css
- 支持css变量
- 支持类似less的嵌套css样式
- 支持props动态css
- 支持三种使用方式
- 支持typescript

[演示](https://codesandbox.io/p/sandbox/styledfc-demo-x7w94w?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clstzj2mg0006356lkdcmsv3s%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clstzj2mg0002356lq7y9whne%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clstzj2mg0003356lip4fhd1w%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clstzj2mg0005356l6vsjkkfr%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clstzj2mg0002356lq7y9whne%2522%253A%257B%2522id%2522%253A%2522clstzj2mg0002356lq7y9whne%2522%252C%2522tabs%2522%253A%255B%255D%257D%252C%2522clstzj2mg0005356l6vsjkkfr%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clstzj2mg0004356l6rts8s1f%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clstzj2mg0005356l6vsjkkfr%2522%252C%2522activeTabId%2522%253A%2522clstzj2mg0004356l6rts8s1f%2522%257D%252C%2522clstzj2mg0003356lip4fhd1w%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clstzj2mg0003356lip4fhd1w%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## 安装

```bash
pnpm add styledfc
# or
npm install styledfc
# or
yarn add styledfc
```

## 用法

拟开发一个`Card`组件，组件有一个`title`属性，用于显示标题，一个`footer`属性，用于显示底部内容，`children`属性作为卡片的内容区。

### 基本用法

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
  },{ // 组件样式
    position:"relative",
    width:"100%",
    border:"1px solid #ccc",
    borderRadius:"4px" 
  })

```
  
- 以上代码将创建一个`Card`组件，为样式生成一个样式类（名称是随机生成的）并插入到`head`标签中。
- 然后将`className`属性传递给组件，组件将使用这个类名来应用样式。

实际上，你可以在`head`发现一个类似这样的`CSS`样式，其中的`类名`和`style.id`均是自动生成的。也可以通过`options`参数来指定`styleId`和`className`。

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

### 嵌套样式

接下来我们来为`Card`组件的`title`和`footer`添加样式.

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
    )},{ // 组件样式
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

- 以上我们为`title`和`footer`添加了样式。
- 使用`&`符号来表示当前父类元素，使用的方式与`less`和`sass`等嵌套CSS的语法类似。

在`head`生成的样式如下：

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

### 动态样式

`styledfc`支持使用`props`来动态设置样式。

我们想让卡片`content`的背景颜色可以通过`props.bgColor`属性来指定。

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
    )},{ // 组件样式
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

- 为了支持动态属性，我们需要使用`getStyle`函数来获取动态样式，然后注入到组件的根元素中。
- `getStyle`函数返回一个`css`样式对象，可以直接传递给`style`属性。
- 任意`css`属性均可以使用`(props)=>{....}`来动态生成CSS属性值。

### CSS变量

`styledfc`支持使用`css`变量。可以在`getStyle`函数中传入更新后的`css`变量。

```tsx

export const Card = styled<CardProps>((props,{className,getStyle})=>{
    const { title,children,footer} =props
    const [primaryColor,setPrimaryColor] = React.useState("blue")
    return (
      <div className={className} style={getStyle({"--primary-color":primaryColor})}>
        <div className="title">            
            {title}<button onClick={()=>setPrimaryColor('red')}>
        </div>
        <div className="content">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )},{ // 组件样式
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

- 以上我们在根样式中声明了一个`--primary-color`的`css`变量。
- 然后我们在`title`样式中使用了`--primary-color`变量。
- `getStyle`函数支持传入更新`css`变量。

## 创建样式

`styled`函数也可以只用来创建样式并插入到`HEAD`。

```tsx
// card.style.ts

import { styled } from "styledfc"

// 创建样式并插入到head
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

也可以使用 `cardStyle.props`简化参数传递，如下:

```tsx
 
export default (props:CardProps)=>{
    return (
      <div {...cardStyle.props()}>
          ...
      </div>
    )
  }

// 当样式中包含css变量或者需要额外的样式时，可以使用如下方式传入

<div {...cardStyle.props({"--title-color":titleColor})}/>

// 如果使用了动态样式，则需要传入props参数
<div {...cardStyle.props({"--title-color":titleColor},{props})}/>
// 也可以传入额外的样式类名

<div {...cardStyle.props({"--title-color":titleColor},{props,className:"xxxxx xxxx"})}/>

```



- 注意，如果使用到`props`动态样式，则`getStyle`需要传入`props`参数。

## Hook

`styledfc`还提供了一个`useStyle`钩子，用于在函数组件中使用。

同样功能的`Card`组件可以使用`useStyle`钩子来实现。

```tsx
import { useStyle } from "styledfc"
export const Card2:React.FC<React.PropsWithChildren<CardProps>> = ((props:CardProps)=>{
    const { title } = props
    const [titleColor,setTitleColor] = useState("blue")
    const {className,getStyle } =  useStyle({
        // 此处是组件样式
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

- `useStyle`钩子返回`className`和`getStyle`,用来注入样式类名和动态样式。
- `getStyle`函数支持传入更新`css`变量。如果使用到`props`动态样式，则需要传入`props`参数。
- `useStyle`钩子支持传入`options`参数来配置`styleId`和`className`。
- `useStyle`与`styled`函数功能一样，唯一的区别是`useStyle`在`head`注入的样式表在组件卸载时会自动移除。

### 创建样式组件

从`1.1.0`版本开始，`styledfc`支持创建样式组件。

```tsx

import { styled } from "styledfc"

const MyButton = styled.div({
    color:"red",
    "&:hover":{
        color:"blue"
    }
})

// 其他如styled.span,styled.button等任意有效的HTML tag

```

## 配置

`styledfc`支持以下`options`参数来配置。

```tsx
// styled(<React.FC>,<styles>,<options>)
export interface StyledOptions{
    // 样式表的ID,没有指定则会自动生成
    styleId?:string                          
    // 生成的样式类名，如果没有指定则自动生成 
    className?:string                        
}
```


## 性能

由于`css-in-js`的限制，可能会存在性能问题，一个推荐的性能优化方式是：在应用的启动阶段，将所有的样式一次性创建并插入到`head`中，然后在组件中来引用样式。

```tsx
// styles.tsx
import { styled } from "styledfc"
export style1 = styled({...})
export style2 = styled({...})
export style3 = styled({...})
```

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
    // 获取动态css样式，当使用props动态css时需要使用getStyle注入css样式对象，例如style={getStyle()}
    getStyle : ()=>Record<string,string | number>
}

export type StyledComponent<Props> = (props:React.PropsWithChildren<Props>,params:StyledComponentParams)=>React.ReactElement

//
styled<Props>(FC: StyledComponent<Props>,styles:CSSObject,options?:StyledOptions)
styled<Props>(styles:CSSObject,options?:StyledOptions)

```