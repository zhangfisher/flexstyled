import { useState } from "react"
import { useStyled } from "../../src"
import { getRandColor } from "./utils" 
import { CardProps, cardStyle } from "./cardStyle"


export const Card2:React.FC<React.PropsWithChildren<CardProps>> = ((props:CardProps)=>{
    const { title } = props
    const [titleColor,setTitleColor] = useState("blue")
    const {className,getStyle} =  useStyled(cardStyle)
    return (
      <div className={className} style={getStyle(props,{"--title-color":titleColor})}>
        <div className="title">            
            <span>{title}</span>
            <span className="tools"><button onClick={()=>setTitleColor(getRandColor())}>Change</button></span>
        </div>
        <div className="content">          
            {props.children}
        </div>
        <div className="footer">{props.footer}</div>
      </div>
    )
  })

 



  

