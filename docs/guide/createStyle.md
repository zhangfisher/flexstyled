# 包装样式

`flexstyled`提供`styled`高阶函数，用于封装`React`组件和创建样式对象，**执行该函数时会将CSS样式注入到Head中**。

`styled`函数提供了两种调用签名方式：

```js
import { styled } from 'flexstyled'

function styled<Props=any>(styles:CSSRuleObject<Props>,options?:StyledOptions):StyledComponentParams
function styled<Props=any>(FC: StyledComponent<Props>,styles:CSSRuleObject<Props>,options?:StyledOptions):(props:Props)=>ReactElement
```

## 包装样式组件

`styled`高阶函数可以直接包装`React`组件，返回一个`styled`的`React`高阶组件。

```tsx {6,9-17}
import { styled } from 'flexstyled'

interface StyledButtonProps {
    type?: 'primary' | 'secondary'
}
const StyledButton = styled<StyledButtonProps>((props,{className,getStyle})=>{ 
    return <button className={className} style={getStyle()} />
},{
    display:'inline-block',
    padding:'0 10px',
    borderRadius:'4px',
    cursor:'pointer',
    color:'#333',
    backgroundColor:(props)=>props.type=='primary' ? 'blue' : 'white',
    '&:hover':{
        backgroundColor:'#eee'
    }
})
```

也可以使用 `styled` 的简化方式给 `StyledButton` 组件的根元素添加`className`和`style`属性。

```tsx
const StyledButton = styled<StyledButtonProps>((props,{props:styleProps})=>{ 
    return <button  {...styleProps({},{props})} />
},{...})
```





## 创建样式对象

`styled`高阶函数也可以只用创建一个样式对象`StyledObject`。

`StyledObject`类型声明如下：

```ts
type StyledObject ={
    className: string
    styleId  : string
    vars     : Record<string,string | number> 
    getStyle : (css?:CSSRuleObject,props?:any)=>CSSProperties
    props    : (css?:CSSRuleObject,options?:{props?:any,className?:string})=>{ className:string,style  : CSSProperties}
}
```

上例`StyledButton`组件也可以重写如下：

```tsx {3,16}
import { styled } from 'flexstyled'

// 先创建一个样式对象
const btnStyle= styled({
    display:'inline-block',
    padding:'0 10px',
    borderRadius:'4px',
    cursor:'pointer',
    color:'#333',
    backgroundColor:(props)=>props.type=='primary' ? 'blue' : 'white',
    '&:hover':{
        backgroundColor:'#eee'
    }
})

// 在组件中使用样式

interface StyledButtonProps {
    type?: 'primary' | 'secondary'
}
const StyledButton:React:FC = (props)=>{ 
    return <button className={btnStyle.className} style={btnStyle.getStyle({},props)} /> 
}

```

## 说明

- 无论使用何种方式，执行`styled`函数均会将创建的`CSS样式`注入到`DOM Head`中。
- 比起封装样式组件，创建样式对象`StyledObject`可以更便于复用样式。



