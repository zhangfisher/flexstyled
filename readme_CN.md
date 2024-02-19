# StyledFc

一个简单的运行时`css-in-js`库，用于封装`react`组件

- 零依赖
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

`styledfc`支持使用`css`变量。
我们可以在根样式声明中使用`css`变量，然后在组件中使用`setVar`函数来动态修改`css`变量。

```tsx

export const Card = styled<CardProps>((props,{className,getStyle,ref,setVar})=>{
    const { title,children,footer} =props
    return (
      <div ref={ref} className={className} style={getStyle()}>
        <div className="title">            
            {title}<button onClick={()=>setVar("----primary-color",'red')}>
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
- 为了修改`css`变量，需要在参数中引入`ref`，让根元素指向`ref`,然后使用`setVar`函数来修改`css`变量。

### 小结

- 默认只需要在组件引用`className`即可。
- 如果需要动态修改`css`变量，需要引入`ref`，并且将`ref`传递给根元素，然后使用`setVar`函数来修改`css`变量。
- 如果需要使用`props`动态`css`属性，需要使用`getStyle`函数来获取动态css样式并注入到根元素中。

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