# CSS变量

`felxstyled`支持使用`CSS变量`，并且可以在组件中动态修改和注入`css变量`值。

## 使用方法

```tsx {7}
interface CardProps{
    padding?:number
}
const Card = styled<CardProps>((props,{className,getStyle})=>{
    const { title,children,footer} =props
    return (
      <div className={className} style={getStyle({
          // 这里可以传递一些额外的参数给动态样式
        },{  
              "--padding":props.padding   //   [!code ++]   // 重载css变量
              color:'red'                 //  [!code ++]    // 额外的内联样式
            }                             //   [!code ++]
        )}>  
        <div className="header">  {title} </div>
        <div className="body">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    )
  },{ 
    position:"relative",
    width:"100%",
    "--padding": '4px',       //   [!code ++] --开头的字符串会被自动识别为css变量声明
    padding: "var(--padding)"  //   [!code ++]  使用CSS变量
    "& > .header":{
        padding: "var(--padding)"   //   [!code ++]  使用CSS变量
    }
    // ... 
  })    
```

- 可以通过`getStyle`来提供重载`css变量`值，也可以提供额外的内联样式。

## 说明
 
- `css`变量声明只能声明中样式的根元素上，不能在子元素上声明.

```tsx
styled({ 
    position:"relative",
    width:"100%",
    "--padding": '4px',       //   [!code warning]  ✔️ 有效, 声明在根，
    "& > .header":{
        "--padding": '4px',  //   [!code error]  ❌ 无效, 声明在子元素上
    }
    // ... 
  }
})
```
 


