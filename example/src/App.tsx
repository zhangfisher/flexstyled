import {  useState } from 'react'
import './App.css'
import { Card } from "./Card"
import { Card2 } from "./Card2"
import { Card3 } from "./Card3" 
import { Card4 } from './Card4' 
import { ColorButton } from './ColorButton'
import { theme } from "./theme"
import { className, styled } from '../../src'

const Block = styled({
  width: '100%',
  "& > div, & > button":{
    color:"red",
    textAlign:"center!important",
  }
},{tag:"block"})

export const Fit = className({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"        
},{tag:'fit'})

const MyBtn = styled.button({
    background:"#eee",
    "&:hover":{
      border: "1px solid red",
    }
},[Fit,Block])



function App() { 
  const [size,setSize] = useState<"small" | "middle" | "large">("middle")
  const  [bgColor,setBgColor] = useState("white")
  const [showCard2,setShowCard2] = useState(true)
  return (
    <div style={{width:"100%"}}>
      <MyBtn>确认</MyBtn>
      <div style={{display:'flex',flexDirection:"row",alignItems:'center'}}>
        主题:
        <ColorButton color="red" onClick={()=>theme.backgroundColor = 'red'}/>        
        <ColorButton color="#0bcaf0"  onClick={()=>theme.backgroundColor = '#0bcaf0'} />        
        <ColorButton color="#16ff3d"  onClick={()=>theme.backgroundColor = '#16ff3d'}/>        
        <ColorButton color="#ff6600" onClick={()=>theme.backgroundColor = '#ff6600'}/>        
        <ColorButton color="#ff08de" onClick={()=>theme.backgroundColor = '#ff08de'}/>      
        <button onClick={()=>theme.reset()}>重置</button>
        <button onClick={()=>theme.save((data)=>console.log("theme=",data))}>保存</button>
        <button onClick={()=>theme.load({backgroundColor:'#c8ff00'})}>load</button>
      </div>

      <Card title="Card1 - Styled" footer="Copyright 2024" size={size} bgColor={bgColor}>
        FlexStyled is a simple css-in-js library for react component 
        <p>Size={size}</p>
        <button onClick={()=>setSize("small")}>Small</button>
        <button onClick={()=>setSize("middle")}>Middle</button>
        <button onClick={()=>setSize("large")}>Large</button>
        <p>BgColor={bgColor}</p>
        <button onClick={()=>setBgColor("red")}>red</button>
        <button onClick={()=>setBgColor("yellow")}>yellow</button>
        <button onClick={()=>setBgColor("gray")}>gray</button>       

      </Card>
      
     <button onClick={()=>setShowCard2(!showCard2)} >{showCard2 ? 'Hide Card' : 'Show Card'}</button>
      
      { showCard2 && <Card2 title="Card2 - useStyle" footer="Copyright 2024" size={size} bgColor={bgColor}>
        Use useStyle in components to automatically destroy the style sheet when the component is hidden
        <p>Size={size}</p>
        <button onClick={()=>setSize("small")}>Small</button>
        <button onClick={()=>setSize("middle")}>Middle</button>
        <button onClick={()=>setSize("large")}>Large</button>
        <p>BgColor={bgColor}</p>
        <button onClick={()=>setBgColor("red")}>red</button>
        <button onClick={()=>setBgColor("yellow")}>yellow</button>
        <button onClick={()=>setBgColor("gray")}>gray</button>       

      </Card2>}

      <Card3 title="Card3 -  Styled" footer="Copyright 2024" size={size} bgColor={bgColor}>
        FlexStyled is a simple css-in-js library for react component 
        <p>Size={size}</p>
        <button onClick={()=>setSize("small")}>Small</button>
        <button onClick={()=>setSize("middle")}>Middle</button>
        <button onClick={()=>setSize("large")}>Large</button>
        <p>BgColor={bgColor}</p>
        <button onClick={()=>setBgColor("red")}>red</button>
        <button onClick={()=>setBgColor("yellow")}>yellow</button>
        <button onClick={()=>setBgColor("gray")}>gray</button>       
      </Card3>

      <Card4 title="Card4 - 复用样式" footer="Copyright 2024" size={size} bgColor={bgColor}>
        FlexStyled is a simple css-in-js library for react component 
        <p>Size={size}</p>
        <button onClick={()=>setSize("small")}>Small</button>
        <button onClick={()=>setSize("middle")}>Middle</button>
        <button onClick={()=>setSize("large")}>Large</button>
        <p>BgColor={bgColor}</p>
        <button onClick={()=>setBgColor("red")}>red</button>
        <button onClick={()=>setBgColor("yellow")}>yellow</button>
        <button onClick={()=>setBgColor("gray")}>gray</button>       
      </Card4> 
    </div>
  )
}

export default App
