# styled

`styled`是一个复合函数，可以用于:

- 创建基于标准`HTML Tag`的样式组件。
- 创建样式对象
- 封装高阶组件


## 函数签名

```ts
export function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>>(
    styles:Styles,options?:StyledOptions):StyledObject<Styles> 
export function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>>(
    styles:Styles,combindStyles:(StyledObject | StyledClassName)[],options?:StyledOptions):StyledObject<Styles>
export function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>>(
    FC: StyledComponent<Props>,styles:Styles,options?:StyledOptions):(props:Props)=>ReactElement
export function styled<Props=any,Styles extends CSSRuleObject<Props> = CSSRuleObject<Props>>(
    FC: StyledComponent<Props>,styles:Styles,combindStyles?:(StyledObject | StyledClassName)[],options?:StyledOptions):(props:Props)=>ReactElement
```

## 泛型

| 参数    | 说明     |
|---------|---------|
| Props   | 组件的属性类型 |
| Styles  | 为输入的样式对象提供类型约束，一般不需要重载 |


## 参数

| 名称 | 类型          | 说明     |
|------|---------------|---------|
| `styles` | `Styles` | 样式对象 |
| `combindStyles` | `(StyledObject \| StyledClassName)[]` | 组合样式对象 |
| `options` | `StyledOptions` | 配置参数 |
| `FC` | `StyledComponent<Props>` | 组件类型 |


其中`StyledOptions`是可选的配置参数，其类型定义如下：

```ts
export interface StyledOptions{
    // 样式表的ID
    id?          : string  | null                
    // 生成的样式类名，如果没有指定则自动生成 
    className?  : string                          
    // 是不使用CSS变量
    asRoot?     : boolean                         
    // 为所有css变量指定一个前缀，如varPrefix="v",则--primary-color --v-primary-color
    varPrefix?  : string                          
    // 是否立即注入样式
    inject?     : boolean                         
    // 指定一个标签，将被追加到生成的类名，如tag="column",则生成的类名为"column-xxxxx"，当指定类名时，tag无效
    tag?        : string                          
}
```

| 名称 | 类型          | 说明     |
|------|---------------|---------|
| `id` | `string` | 可选，样式表的ID |
| `className` | `string` | 可选，生成的样式类名，如果没有指定则自动生成 |
| `asRoot` | `boolean` | 可选，是否生成`ROOT CSS`变量 |
| `varPrefix` | `string` | 可选，为所有css变量指定一个前缀，如`varPrefix="v"`,则`--primary-color`生成的是 `--v-primary-color` |
| `inject` | `boolean` | 可选，是否立即注入样式，在组件中使用`useStyled`时使用 |
| `tag` | `string` | 可选，指定一个标签，将被追加到生成的类名，如`tag="column"`,则生成的类名为`"column-xxxxx"`,当指定类名时，`tag`无效，此参数可以让随机生成的类名具有可标识性，便于调试 |





