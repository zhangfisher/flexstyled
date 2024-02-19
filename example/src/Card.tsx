import { styled } from "styledfc"
import { getRandColor } from "./utils"

export type  CardProps = React.PropsWithChildren<{
    title:string
    footer:string,
    size?:'small'|'middle'|'large',
    bgColor?:string
  }>

const cardSizes={
    small:"300px",
    middle:"420px",
    large:"600px"
  }

export const Card = styled<CardProps>((props,{ref,className,getStyle,setVar})=>{
    const { title } = props
    return (
      <div ref={ref} className={className} style={getStyle()}>
        <div className="title">            
            <span>{title}</span>
            <span className="tools"><button onClick={()=>setVar('--title-color',getRandColor())}>Change</button></span>
        </div>
        <div className="content">          
            {props.children}
        </div>
        <div className="footer">{props.footer}</div>
      </div>
    )
  },{
    position       : "relative",
    display        : "block",
    width          : (props:Required<CardProps>)=>cardSizes[props.size] || '400px', 
    fontSize       : "16px",
    border         : "1px solid #ccc",
    textAlign      : "left",
    borderRadius   : "4px",
    boxSizing      : "border-box",
    "--title-color": "blue",
    "&             : hover":{
        border:"1px solid #1698e4",
    },
    "& > .title":{
      padding      : "8px",
      background   : "#f9f9f9",
      fontSize     : "18px",
      fontWeight   : "bold",
      borderBottom : "1px solid #ccc",
      display      : "flex",
      flexDirection: "row",
      "& :first-child" : {
        flex:1,        
        color:"var(--title-color)",
      },
      "& > .tools":{
        "& > button":{
            padding:"4px",
            background:"#ebebeb",
            color:"#666",
            border:"1px solid #555",
            borderRadius:"4px",
            cursor:"pointer",
            "&:hover":{
                background:"#64a7ff",
                color:"white"
            }
        }   
       }
    },
    "& > .content":{
        minHeight:"100px",
        padding:"8px",
        boxSizing:"border-box",
        background:(props:Required<CardProps>)=>props.bgColor || "white"
    },
    "& > .footer":{
        padding:"8px",
        background:"var(--title-color)",
        borderTop:"1px solid #ccc",
        textAlign:"right"
    }
  })