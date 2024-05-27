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
 * },{root:true})        
 * 
 * 
 * 
 * const theme = new themeManager([light,dark])
 * themeManage
 * 
 * 
 * 
 * btn = styled<Button>({
 *      color: (props,{theme})=>theme.primaryColor,
 * },[theme])
 
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
 

