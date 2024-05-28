# 主题

得益于`flexstyled`的灵活性，我们可以通过主题来实现全局样式的统一管理。

## 创建主题

主题是一个对象，包含多个CSS变量样式，也可以包含一些预定义的样式。

 ```tsx
// theme.ts
import { createTheme } from "flexstyled"
export const theme = createTheme({
    primaryColor   : "#007bff",
    secondaryColor : "blue",
    backgroundColor: "#e8f8ff",
    textColor      : "333",
    fontSize       : "16px",
})
 ```

## 使用主题

接下来就可以在组件中使用主题了。

```tsx

import { theme } from "./theme"

export type  CardProps = React.PropsWithChildren<{
    title:string 
    footer?:string
  }>

export const Card = styled<CardProps>((props,{className})=>{
    const { title,children,footer} =props
    return (
      <div className={className}>
        <div>            
            {title}
        </div>
        <div>{children}</div>
        <div>{footer}</div>
      </div>
    )
  },{ 
    position:"relative",
    width:"100%",
    border:"1px solid #ccc",
    // 引用主题变量，具有类型提示
    backgroudColor: theme.backgroundColor,              // [!code ++] 
    color: theme.primaryColor                           // [!code ++] 
    // 或者也可以直接引用
    backgroudColor: "var(--background-color)",          // [!code ++] 
    color: "var(--primary-color)"                       // [!code ++] 
    borderRadius:"4px" 
  })

```

## 修改主题

能通过修改主题来修改全局样式。

```tsx
import { theme } from "./theme"

// 具有类型提示，直接修改主题变量
theme.primaryColor = "red"               // ![code ++]

// 也可以直接批量修改主题变量
theme.update({                                  // ![code ++]
    primaryColor   : "#007bff",                 // ![code ++]
    secondaryColor : "blue",                    // ![code ++]
    backgroundColor: "#e8f8ff",                 // ![code ++]
    textColor      : "333",                     // ![code ++]
    fontSize       : "16px",                    // ![code ++]
})

```


## 保存主题

修改主题后可以保存地，方便下次使用。

```tsx
import { theme } from "./theme"

// 也可以直接批量修改主题变量
theme.update({
    primaryColor   : "#007bff",
    secondaryColor : "blue",
    backgroundColor: "#e8f8ff",
    textColor      : "333",
    fontSize       : "16px",
})

theme.save((data)=>{             // ![code ++]
    // ![code ++] // 保存主题到   
    localStorage.setItem("theme",JSON.stringify(data))   // ![code ++]
} )  // ![code ++]

```

## 读取主题


```tsx
import { theme } from "./theme"

theme.load(JSON.parse(localStorage.getItem("theme"))   // ![code ++]

```


## 变量前缀

主题变量本质上是创建一些全局CSS变量，为了避免冲突，可以给变量添加统一的前缀。

```ts
import { createTheme } from "flexstyled";

export const theme = createTheme({
    primaryColor   : "#007bff",
    secondaryColor : "blue",
    backgroundColor: "#e8f8ff",
    textColor      : "333",
    fontSize       : "16px",
},{
    prefix:"v"
})

```

以下声明的变量都会自动添加前缀`v`，创建以下的全局变量：

```css
:root{
    --v-primary-color: #007bff;
    --v-secondary-color: blue;
    --v-background-color: #e8f8ff;
    --v-text-color: 333;
    --v-font-size: 16px;
}

```