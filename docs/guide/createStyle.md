# 创建样式

`styled`函数也可以只用来创建一个样式对象`StyledObject`,**执行该函数时会将CSS样式注入到Head中**。

`StyledObject`类型声明如下：

```ts
type StyledObject ={
    id            : string
    className     : string    
    vars          : Vars    
    computedStyles: ComputedStyles
    getStyle      : (css?:CSSRuleObject,props?:any)=>CSSProperties
    getProps      : (params?:{style?:CSSRuleObject,props?:any,className?:string})=>StyledResult   
    css           :  string           // 生成的css字符串
}
```

上例`StyledButton`组件也可以重写如下：

```tsx {3,16}
import { styled } from 'flexstyled'

// 先创建一个样式对象
const btnStyle= styled({
    display        : 'inline-block',
    padding        : '0 10px',
    borderRadius   : '4px',
    cursor         : 'pointer',
    color          : 'var(--my-color)',
    backgroundColor: (props)=>props.type=='primary' ? 'blue' : 'white',
    "--my-color"   : 'red',
    '& : hover':{
        backgroundColor:'#eee'
    }
})

// 在组件中使用样式

interface StyledButtonProps {
    type?: 'primary' | 'secondary'
}
const StyledButton:React:FC = (props)=>{ 
    // 没使用到动态样式和CSS变量时
    return <button className={btnStyle.className} /> 
    // 用到动态样式时需要传入
    return <button className={btnStyle.className} style={btnStyle.getStyle({props})} /> 
    // 用到动态样式时或传入CSS变量
    return <button className={btnStyle.className} style={btnStyle.getStyle({style:{
        "--my-color":'blue'
    },props})} /> 
}

```

## 说明

- 无论使用何种方式，执行`styled`函数均会将创建的`CSS样式`注入到`DOM Head`中。
- 比起封装高阶样式组件，创建样式对象`StyledObject`可以更便于复用样式。



