import { parseStyles } from './parse';
import { CSSRuleObject, CSSVars, ComputedStyles, IStyledObject, StyledObject } from './types';


/**
 * Create a theme
 * 
 * const light = styled({
 *  "--primary-color": "red",
 *  "--secondary-color": "blue",
 * })
 * 
 * const dark = styled({
 *  "--primary-color": "green",
 *  "--secondary-color": "yellow",
 * },{rootVars:true})        将css变量提升到全局
 * 
 * 
 * 
 * const theme = new themeManager([light,dark])
 * 
 * 
 * 
 * 
 * btn = styled<Button>({
 *     color: (props)=>theme.primaryColor,
 *     backgroundColor: theme.secondaryColor
 * })
 
    const theme = new themeManager({
        light:{

        },
        dark:{

        }
    })

    theme.styled({
        color: (props,{theme})=>{
            return theme.primaryColor
        }
    })
 

    theme.primary

 * 
 * @param styles 
 */


export type ThemeManagerOptions = {
    use?:string                 // 
}

export class ThemeManager implements IStyledObject{
    options: ThemeManagerOptions
    theme:StyledObject 
    constructor(public themes:StyledObject[],options?:ThemeManagerOptions){
        this.options = Object.assign({},options)
        if (this.themes.length === 0){
            throw new Error("No themes provided")
        }
        this.theme = this.getTheme(options?.use)
    } 
    private getTheme(id?:string){
        return this.themes.find(theme=>theme.id === id)!
    } 
    change(id:string){
        this.theme = this.getTheme(id)
    }
    get id(){
        return this.theme.id!
    }
    get vars():CSSVars<CSSRuleObject<any>>{
        return this.theme?.vars!
    }

    get className(){
        return this.theme?.className
    }
    get style(){
        return {}
    }    
    get computedStyles():ComputedStyles{
        return {}
    }
    getStyle(css?:CSSRuleObject,props?:any){
        return this.theme.getStyle(css,props)
    };
    props(params?: { style?: CSSRuleObject<any>, props?: any; className?: string  }){
        return this.theme.props(params)
    }
}
 


const dark = createStyled({
    border:"1px",
  "--primary-color": "green",
  "--secondary-color": "yellow",
},{rootVars:true})      



  const lignt = createStyled({
  "--primary-color2": "green",
  "--secondary-color2": "yellow",
 },{rootVars:true})      


 class ThemeManager1<T extends CSSRuleObject>{
    private _object:StyledObject<CSSVars<T>>
    constructor(define:T){
        this._object= createStyled(define)
    }
    get vars(){
        return this._object.vars
    }

 }

    const theme = new ThemeManager({ 
      "--primary-color": "green",
      "--secondary-color": "yellow",
    },{id:"voerka-themes"})

/**

theme = createTheme({
    border:"1px",
    "--primary-color": "green",
    "--secondary-color": "yellow",
})

theme.primaryColor         访问CSS变量值
theme.primaryColor 

<Theme.Provider value={theme}>
    <div className={theme.className} style={theme.getStyle()}>
            useTheme(theme)
    </div>
</Theme>


 */
function createTheme(){

}



    
/**
 * 修改DOM head中的:root中指定名称的css变量
 * @param name 
 * @param value 
 */
function changeRootCssVar(name:string,value:string | number){
    
}


