import { CSSRuleObject } from "../../src"

export type  CardProps = React.PropsWithChildren<{
    title:string
    footer:string,
    size?:'small'|'middle'|'large',
    bgColor?:string
  }>

export const cardSizes={
    small:"320px",
    middle:"460px",
    large:"600px"
  }
  
export const cardStyle:CSSRuleObject = {
    position       : "relative",
    display        : "block",
    width          : (props:CardProps)=> cardSizes[props.size!] || '400px', 
    fontSize       : "16px",
    border         : "1px solid #ccc",
    textAlign      : "left",
    borderRadius   : "4px",
    boxSizing      : "border-box",
    margin         : "4px;",
    "--title-color": "blue",
    "&:hover":{
        border:"1px solid #1698e4",
    },
    "&.submit":{
      color:"red"
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
        color:"var(--title-color)"
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
        background:(props:CardProps)=>props.bgColor || "white"
    },
    "& > .footer":{
        padding:"8px",
        background:"var(--title-color)",
        borderTop:"1px solid #ccc",
        textAlign:"right",
        color:"white"
    }
  }
 
