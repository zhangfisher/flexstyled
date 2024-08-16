# 封装组件

`styled`可以用于封装`React`组件，返回一个`styled`的`React`高阶组件。
 
```tsx {6,9-17}
import { styled } from 'flexstyled'

interface StyledButtonProps {
    type?: 'primary' | 'secondary'
}
const StyledButton = styled<StyledButtonProps>((props,{className,getStyle})=>{ 
     // 没使用到动态样式和CSS变量时
    return <button className={btnStyle.className} />  //   [!code ++]
    // 用到动态样式时需要传入
    return <button className={btnStyle.className} style={btnStyle.getStyle(props)} /> //   [!code ++]
    // 用到动态样式时或传入CSS变量
    return <button className={btnStyle.className} style={btnStyle.getStyle(props,{  //   [!code ++]
        "--my-color":'blue'                                                             //   [!code ++]
    })} /> //   [!code ++]
},{
    display        : 'inline-block',
    padding        : '0 10px',
    borderRadius   : '4px',
    cursor         : 'pointer',
    color          : 'var(--my-color)', 
    "--my-color"   : 'red',
    backgroundColor: (props)=>props.type=='primary' ? 'blue' : 'white',
    '&:hover':{
        backgroundColor:'#eee'
    }
})
```

也可以使用 `styled` 的简化方式给 `StyledButton` 组件的根元素添加`className`和`style`属性。

```tsx
const StyledButton = styled<StyledButtonProps>((props,{getProps})=>{ 
    return <button  {...getProps({props})} />
},{...})
```


**说明**

- 执行`styled`函数均会将创建的`CSS样式`注入到`DOM Head`中。