# className

当使用`styled`创建样式时的使用方式如下：

```tsx
import { styled } from 'flexstyled'

// 先创建一个样式对象
const btnStyle= styled({
    display        : 'inline-block',
    padding        : '0 10px',
    borderRadius   : '4px',
    cursor         : 'pointer' 
})

// 在组件中使用样式 
const MyButton = (props)=>{
    return <button className={btnStyle.className} /> 
}
```

需要通过`.className`来返回样式类名。

`className`函数是一个快捷方式，它将返回一个`className`属性，该属性将添加到组件上即可。

```tsx
import { className } from 'flexstyled'

const primaryClass= className({
    color: 'blue'
})

// 先创建一个样式对象
const btnClass= className({
    display        : 'inline-block',
    padding        : '0 10px',
    borderRadius   : '4px',
    cursor         : 'pointer' 
},[primaryClass])  // 合并复用样式类

// 在组件中使用样式 
const MyButton = (props)=>{
    return <button className={btnClass()} /> 
    // 提供额外的类名
    return <button className={btnClass("primary","colorized")} /> 
}

```


:::warning 注意
`className`创建的样式中不能包含动态样式和CSS变量,仅能包含静态样式。
::: 
