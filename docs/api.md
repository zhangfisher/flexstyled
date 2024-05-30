# API
 
 `flexstyled`仅提供了少量的API。

 ## styled

```ts

// 创建样式对象
function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>, CombindStyles extends StyledObject[]=StyledObject[]>(styles:Styles,options?:StyledOptions):StyledObject<CSSVars<Styles>> 
// 创建样式对象，并指定组合样式
function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>, CombindStyles extends StyledObject[]=StyledObject[]>(styles:Styles,combindStyles:CombindStyles,options?:StyledOptions):StyledObject<CSSVars<Styles>>
// 封装React组件
function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>, CombindStyles extends StyledObject[]=StyledObject[]>(FC: StyledComponent<Props>,styles:Styles,options?:StyledOptions):(props:Props)=>ReactElement
// 封装React组件, 并指定组合样式
function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>, CombindStyles extends StyledObject[]=StyledObject[]>(FC: StyledComponent<Props>,styles:Styles,combindStyles:CombindStyles,options?:StyledOptions):(props:Props)=>ReactElement
```

**参数说明:**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `styles` | `CSSRuleObject` | 样式对象 |
| `combindStyles` | `StyledObject[]` | 可选，组合样式 |
| `options` | `StyledOptions` | 可选，样式选项 |

### StyledObject

```ts
interface StyledObject<Styles extends CSSRuleObject =  CSSRuleObject>{
    // 生成的css字符串
    css           : string
    id            : string
    className     : string    
    vars          : CSSVars<Styles>                 
    computedStyles: ComputedStyles
    getStyle      : (props?:any,css?:CSSRuleObject)=>CSSProperties
    getProps      : (params?:{style?:CSSRuleObject,props?:any,className?:string})=>StyledResult
}

```

| 参数 |说明 |
| --- | --- |
| `css` | 生成的css字符串 |
| `id` |样式表的ID |
| `className` | 生成的样式类名 |
| `vars`| 保存所有CSS变量 |
| `computedStyles`| 动态样式,样式对象中的所有`(props)=>{}`被保存到此处 |
| `getStyle`| 获取样式，用于给组件提供内联样式 |
| `getProps` | 获取样式对象的`className`和`style`，用于使用`<div {...getProps({props})}/>`进行快速传参。 |   


### StyledOptions

```ts
interface StyledOptions{
    id?          : string  | null             
    className?  : string          
    asRoot?     : boolean            
    varPrefix?  : string      
    inject?     : boolean                         
    tag?        : string                          
}

```

| 参数 | 说明 |
| --- | --- |
| `id` |  可选，样式表的ID，默认值为`flexstyled-classs` |
| `className` | 可选，生成的样式类名，如果没有指定则自动生成 |
| `asRoot` |  可选，是否提升CSS变量到全局 |
| `varPrefix` |可选，为css变量指定前缀，如`varPrefix="v"`,则`--primary-color`变量转化为`--v-primary-color` |
| `inject` | 可选，是否立即注入样式，默认为`true` |
| `tag` |  可选，将被追加到生成的类名，作用是提高自动生成的类名的可读性 |

## createTheme

```ts
type ThemeOptions = {
    id?:string
    prefix ?: string                // 为css变量自动添加前缀
}
type Theme<T extends CSSVariables>  = T & {
    load(vars:Partial<T>):void
    update(vars:Partial<T>):void
    save(fn:(vars:T)=>void):void
    reset():void
} 

function createTheme<T extends CSSVariables = CSSVariables>(vars:T,options?:ThemeOptions):Theme

```

### ThemeOptions

| 参数 | 说明 |
| --- |--- |
| `id` | 可选，样式表的ID，默认值为`flexstyled-theme` |
| `prefix` |  可选，为`css`变量自动添加前缀，用于防止全局`CSS`变量冲突 |

### Theme

| 方法名称 | 说明 |
| --- |  --- |
| `load` | 加载主题 |
| `update` | 更新主题 |
| `save` | 保存主题 |
| `reset` |重置主题 |

## useStyled

在组件中使用`useStyled`生成样式对象，在组件销毁时自动移除样式表。

```ts
 function useStyled<Props=any>(
    styles: CSSRuleObject<Props> | (()=>CSSRuleObject<Props>),
    options?:Omit<StyledOptions,'id'>):StyledObject
```

## keyframes

创建动画序列，返回一个`keyframes`对象，用于`animation`属性。

```ts
type KeyframesObject = {
    name:string
    computedStyles: ComputedStyles
}
```

## className

`styled`的快捷方式，用于只生成样式类名，不生成样式对象。

注: 仅在不需要动态样式和CSS变量时使用

```tsx

type StyledClassName = (...args:string[])=>string

function className(styles:CSSRuleObject,options?:StyledOptions): StyledClassName
function className(styles:CSSRuleObject,combindStyles?:(StyledObject | StyledClassName)[],options?:StyledOptions):StyledClassName

```


