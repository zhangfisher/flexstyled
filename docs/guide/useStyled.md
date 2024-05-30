# useStyled

`useStyled`用在组件中动态生成样式，函数签名如下：

```ts
function useStyled<Props=any>(styles: CSSRuleObject<Props> | (()=>CSSRuleObject<Props>),options?:StyledOptions):StyledObject
```


使用方式如下:


```tsx
import { useStyled } from "flexstyled"

export const Card:React.FC<React.PropsWithChildren<CardProps>> = (props:CardProps)=>{
    const { title } = props
    const [titleColor,setTitleColor] = useState("blue")
    const {className,getStyle } =  useStyled(
      {
        // 此处是组件样式
      },
      [
          // 此处是组合样式
      ],
      { 
        // 此处是配置参数 
      }
    )
    return (
      <div className={className} style={getStyle(props,{"--title-color":titleColor})}>
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
  }
```

**说明：**

- `useStyled`钩子返回`className`和`getStyle`,用来注入样式类名和动态样式。
- `getStyle`函数支持传入更新`css`变量或内联样式。如果使用到`props`动态样式，则需要传入`props`参数。
- `useStyled`钩子支持传入`options`参数来配置`id`和`className`。
- `useStyled`与`styled`函数功能一样，**唯一的区别是`useStyled`在`head`注入的样式表在组件卸载时会自动移除。** 



