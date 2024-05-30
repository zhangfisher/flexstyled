# 动态样式

使用开发`React`组件时，我们经常需要动态设置组件的样式,也就是根据组件的`props`来设置组件的样式。


## 使用方法

使用动态样式时方法如下：

### 第1步： 声明动态样式

每个动态样式属性均使用函数`(props)=>{ return <样式值>} `来声明。

```tsx
const btnStyled= styled({
    display:'inline-block',
    padding:'0 10px',
    borderRadius:(props)=>`${props.radius}px`,
    cursor:'pointer',
    color:'#333',
    backgroundColor:(props)=>props.type=='primary' ? 'blue' : 'white', 
})
```

### 第2步：注入动态样式

接下来，在组件中，使用`btnStyled.getStyle`来注入动态样式到组件中。

```tsx

interface StyledButtonProps {
    type?: 'primary' | 'secondary'
    radius?: number
}
const StyledButton:React:FC = (props)=>{ 
    // 需要传入style={btnStyle.getStyle(props)}
    return <button className={btnStyle.className} style={btnStyle.getStyle(props)} />
}

```


### 小结

- `getStyle`返回的是一个`CSSProperties`样式对象，并且作为内联样式注入到组件中。
- `getStyle`必须提供`props`对象，用于动态样式的计算。


## 工作原理

```tsx
const btnStyled= styled({
    color:(props)=>props.color
})
```

以上面的示例说明动态样式的工作原理：


1. 在`styled`函数中，会扫描整个样式对象，如果发现样式属性值是一个`函数`，则根据样式键名生成一个随机的CSS变量。
例如`color:(props)=>props.color`会生成一个`css变量：--p-1n6vdw`。
2. 将样式属性值替换为：`{color:'var(--p-1n6vdw)'}`,并且配置CSS变量的值为`--p-1n6vdw:unset`,将原始的样式值函数保存到一个内部字典`computedStyles`中,如`{--p-1n6vdw:(props)=>props.color}`
3. 然后`styled`函数将样式插入到`head`标签中。
4. 接下来需要在组件根元素中上使用`getStyle(props)`方法来注入动态样式。`getStyle`方法会遍历`computedStyles`字典，分别执行样式函数，将返回结果作为内联样式注入到组件根元素中。
5. 所以最终根元素中的内联样式就包括了CSS变量，形如`<div style="--p-1n6vdw:red"/>`


