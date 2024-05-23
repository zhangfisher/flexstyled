# 快速开始

本节以开发一个`Card`组件为例说明使用方法：

- 组件有一个`title`属性，用于显示标题
- `footer`属性，用于显示底部内容
- `children`属性作为卡片的内容区。


## 第1步：创建样式组件

`flexstyled`提供`styled`高阶函数用来创建一个支持`CSS-IN-JS`样式的组件。


```tsx {20-23}
import { styled } from "flexstyled" 

export type  CardProps = React.PropsWithChildren<{
    title:string 
    footer?:string
  }>

export const Card = styled<CardProps>((props,{className})=>{
    const { title,children,footer} =props
    return (
      <div className={className}>
        <div>            
            {title}
        </div>
        <div>{children}</div>
        <div>{footer}</div>
      </div>
    )
  },{ 
    position:"relative",
    width:"100%",
    border:"1px solid #ccc",
    borderRadius:"4px" 
  })

```
  
- 以上代码将创建一个`Card`组件，为样式生成一个样式类（`类名称是随机生成的`）并插入到`head`标签中。
- 然后将`className`属性传递给组件，组件将使用这个类名来应用样式。

你可以在`head`发现一个类似这样的`CSS`样式，其中的`类名`和`style.id`均是自动生成的。

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

::: tip
**注**：`类名`和`style.id`也可以通过`options`参数来指定`styleId`和`className`。
:::

## 第2步：嵌套样式

接下来我们为`Card`组件的`header`、`body`和`footer`添加样式，并且使用`嵌套样式`。

```tsx 
export const Card = styled<CardProps>((props,{className})=>{
    const { title,children,footer} =props
    return (
      <div className={className}>
        <div className="header">             
            {title}
        </div>
        <div className="body">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )
  },{ 
    position:"relative",
    width:"100%",
    border:"1px solid #ccc",
    borderRadius:"4px",
    "& > .header":{                         // [!code ++]
        padding:"10px",                     // [!code ++]
        borderBottom:"1px solid #ccc"       // [!code ++]
    },                                      // [!code ++]
    "& > .body":{                           // [!code ++]
        padding:"10px",                     // [!code ++]
        backgroundColor:'#f9f9f9'           // [!code ++]
    },                                      // [!code ++]
    "& > .footer":{                         // [!code ++]
        padding:"10px",                     // [!code ++]
        borderTop:"1px solid #ccc"          // [!code ++]
    }                                       // [!code ++]
  })    
  ```

可以看到`flexstyled`支持类似`less/sass/scss`的`嵌套样式`的写法来为组件的子元素指定嵌套样式。

::: tip
**注**：`嵌套样式`的写法是通过`&`符号来指定当前元素的样式。原则上支持所有的`css`选择器。您可以将在`less/sass/scss`中的实践直接应用到`flexstyled`中。
:::


## 第3步：动态样式

接下来我们为`Card`组件提供一个`headerBgColor`属性，用来配置卡片头部的背景色。

```tsx
export type  CardProps = React.PropsWithChildren<{
    headerBgColor?:string                   // [!code ++]
    title:string 
    footer?:string
  }>

export const Card = styled<CardProps>((props,{className,getStyle})=>{
    const { title,children,footer} =props
    return (
      <div className={className} style={getStyle({},props)}>  // [!code ++]
        <div className="header">             
            {title}
        </div>
        <div className="body">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )
  },{ 
    position:"relative",
    width:"100%",
    border:"1px solid #ccc",
    borderRadius:"4px",
    "& > .header":{                          
        padding:"10px",                      
        borderBottom:"1px solid #ccc",
        backgroundColor:(props)=>props.headerBgColor // [!code ++]
    },                                      
    "& > .body":{                           
        padding:"10px",                     
        backgroundColor:'#f9f9f9'           
    },                                      
    "& > .footer":{                         
        padding:"10px",                     
        borderTop:"1px solid #ccc"          
    }                                       
  })    

```
 

- 首先可以在样式中使用`(props)=>props.headerBgColor`来动态获取`headerBgColor`属性。
- 接着需要在根元素上使用`style={getStyle({},props)}`来注入动态样式，`getStyle`返回的是一个样式对象。


## 小结

- 使用`styled`高阶函数创建一个支持`CSS-IN-JS`样式的组件，组件的`CSS`将被自动插入到`head`标签中。
- 支持类似`less/sass/scss`的方式来为组件的子元素指定样式。
- 所有的样式均支持通过`(props)=>{}`来提供组件的动态属性值。

更完整的卡片组件示例可以参考[这里](https://github.com/zhangfisher/styledfc/tree/master/example)。