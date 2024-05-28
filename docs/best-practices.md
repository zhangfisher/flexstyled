# 最佳实践

`flexstyled`是一个`css-in-js`库，核心原理也非常简单，就是将`css`样式对象序列化成`css`字符串再插入到`dom head`中，这可能会产生一些运行时的性能问题。 为了尽可能的优化性能，我们提供了一些最佳实践，帮助你更好的使用`flexstyled`。


## 不在组件内声明样式 


使用`flexstyled`时，我们推荐在组件外声明样式，而不是在组件内部声明,这可以减少重复的`css`字符串的生成和插入操作，从而提高性能。

- **在组件内声明样式** :-1:

:::warning  :-1:不推荐
因为需要渲染函数中反复进行 `css` 字符串的生成和插入操作，这会影响性能。
:::

```tsx
import { styled } from 'flexstyled'

const StyledButton:React:FC = (props)=>{ 
    const btnStyle = styled({....})    
    return <button className={btnStyle.className} style={btnStyle.getStyle({},props)} />
}

// 或者
const StyledButton:React:FC = (props)=>{ 
    const btnStyle = useStyled({....})    
    return <button className={btnStyle.className} style={btnStyle.getStyle({},props)} />
}
```

 在组件内声明样式会由于组件的反复渲染执行，导致`css`字符串的反复生成和插入，从而影响性能。

- **在组件外声明样式** :+1:

:::warning  :+1: 推荐
仅在创建样式时执行 `css` 字符串的生成和插入操作，从而提高性能。
:::


```tsx
import { styled } from 'flexstyled'

const btnStyle = styled({....})    

const StyledButton:React:FC = (props)=>{ 
    return <button className={btnStyle.className} style={btnStyle.getStyle({},props)} />
}

```

- **封装样式化高阶组件**  :+1:

:::warning  :+1: 推荐
仅在创建样式时执行 `css` 字符串的生成和插入操作，从而提高性能。
:::

```tsx
import { styled } from 'flexstyled'


const StyledButton:React:FC = styled((props,{className,getStyle})=>{ 
    return <button className={className} style={getStyle({},props)} />
},{
    // css
})

```


## 提前注入样式 

可以在应用初始化时，提前将一些样式注入到`dom`中，从而提高性能。

- **注入一些原子样式**

```ts
// styles.ts


const FullScreen = styled({
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0
})

const Fit = styled({
    width:'100%',
    height:'100%'
})


``` 

然后这样原子样式就可以在其他样式声明中被重新使用。详见[组合样式](/guide/combind)章节。




