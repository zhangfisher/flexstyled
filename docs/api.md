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

## useStyled


## keyframes