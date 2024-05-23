import { useState } from "react"
import { styled } from "../../src"
import { getRandColor } from "./utils" 
import { CardProps, cardStyle } from "./cardStyle"


const style = styled(cardStyle,{styleId:"mycard3"})

export const Card3:React.FC<React.PropsWithChildren<CardProps>> = ((props:CardProps)=>{
    const { title } = props
    const [titleColor,setTitleColor] = useState("blue")
    return (
      <div {...style.props({"--title-color":titleColor},{props,className:"xxx"})}>
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

 



  

