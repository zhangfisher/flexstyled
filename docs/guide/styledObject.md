# styledObject

`useStyled`和`styled`函数均会创建`styledObject`，其声明如下：

```ts
type StyledObject ={
    className: string
    id  : string
    vars     : Record<string,string | number>     
    computedStyles:ComputedStyles
    getStyle : (props?:any,style?:CSSRuleObject)=>CSSProperties
    getProps    : (params?:{css?:CSSRuleObject,props?:any,className?:string})=>StyledResult
}
```

`StyledObject`各个属性的含义如下：


## className

返回生成的`className`，用于给元素添加样式类名。
默认情况下，该值是一个随机生成的`HASH`字符串，但是也可以在创建样式对手动指定。

```ts
const myStyle = styled({...},{
    className:'my-class'
})
```
 
## id

指定创建的样式表的`id`。默认情况下，该值也是随机生成的`HASH`字符串，但是也可以在创建样式对手动指定。

```ts
const myStyle = styled({...},{
    id:'xxxxxxxx'
})
```

## computedStyles

保存动态样式函数。例如:

```ts
const myStyle = styled({...},{
    color:(props)=>props.color
})

myStyle.computedStyles =={
    "--p-auwytb14":(props)=>props.color    
}


```


## vars

返回创建的样式对象的CSS变量清单。

## getStyle

`getStyle`函数用于返回一个`StyledObject`样式对象。其函数签名如下：

```ts
getStyle(props?:any,style?:CSSRuleObject):CSSProperties
```

- 当样式声明中包含`动态样式`或`CSS变量`才需要使用`getStyle`函数，其返回值是一个`CSSProperties`对象，用来传递给组件的根元素`style`属性，如果没有样式中不包括`动态样式`或`CSS变量`，则可以不必传递。


## getProps

`props`函数用于生成`className`和`style`属性，用于简化组件传参。

```tsx
import { styled } from 'flexstyled'

interface StyledButtonProps {
    type?: 'primary' | 'secondary'
}
const StyledButton = styled<StyledButtonProps>((props,{className,getStyle})=>{ 
    return <button className={className} style={getStyle(props)} />
},{
    // ...css
})
```

以上需要分别解构传入`className`和`getStyle`属性，如果使用`props`函数，可以简化为：

```tsx
const StyledButton = styled<StyledButtonProps>((props,{getProps})=>{ 
    return <button  {...getProps()} />
},{...})

//  或者

const myStyle = styled({...})

const StyledButton = (props)=>{ 
    return <button  {...myStyle.getProps({css:{<样式或CSS变量>},props,className:"额外的样式类"})} />
},{...})


```








