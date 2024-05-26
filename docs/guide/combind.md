# 组合样式

`flexstyled`支持组合多个样式，以方便进行样式的复用。


以下一个简单的示例：


## 第1步：创建工具样式

首先我们在`styles.ts`创建一些工具样式对象。

```tsx
// styles.ts

export const Primary = styled({
    color: 'blue'
})

export const Secondary = styled({
    color: 'red'
})

export const Border = styled({
    border: (props:any)=>`${props.border || '1px'} solid #eee`
})

```

## 第2步：合并组合样式

接下来我们创建一个按钮组件样式，并且组合了`Primary`和`Border`样式。

```tsx

import { styled } from "flexstyled"
import { Primary,Border } from "./styles"

const btnStyle = styled({
    borderRadius: 4,
    padding: 10,
    fontSize: 14
},[Primary,Border])   //   [!code ++]


```

如果是封装高阶组件，可以使用`styled`的简化方式：
```tsx
const Button = styled((props,({className,getStyle}))=>{
    return <button className={className} style={getStyle({props})} />
},{
    borderRadius: 4,
    padding: 10,
    fontSize: 14
},
    [Primary,Border]    //   [!code ++]
)
···

## 第3步：使用组件

```tsx
const Button = (props)=>{
    return <button className={btnStyle.className} style={btnStyle.getStyle({props})} />
}

```

## 小结

- 可以在`styled`函数的第二个参数中传入多个样式对象，以合并组合多个样式。
- 合并样式也支持动态样式和CSS变量
