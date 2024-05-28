import { useState } from "react"
import { styled } from "../../"
import { getRandColor } from "./utils"
import { CardProps, cardStyle } from "./cardStyle"

export const Card = styled<CardProps>((props,{className,getStyle})=>{
    const { title } = props
    const [titleColor,setTitleColor] = useState("blue")

    return (
      <div className={className} style={getStyle({"--title-color":titleColor})}>
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
  },cardStyle)

 



  

