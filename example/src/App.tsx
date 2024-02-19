import {  useState } from 'react'
import './App.css'
import { Card } from "./Card"

function App() { 
  const [size,setSize] = useState<"small" | "middle" | "large">("middle")
  const  [bgColor,setBgColor] = useState("white")
  return (
    <div style={{width:"100%"}}>
      <Card title="StyledFC" footer="Copyright 2024" size={size} bgColor={bgColor}>
        StyledFc is a simple css-in-js library for react component 
        <p>Size={size}</p>
        <button onClick={()=>setSize("small")}>Small</button>
        <button onClick={()=>setSize("middle")}>Middle</button>
        <button onClick={()=>setSize("large")}>Large</button>
        <p>BgColor={bgColor}</p>
        <button onClick={()=>setBgColor("red")}>red</button>
        <button onClick={()=>setBgColor("yellow")}>yellow</button>
        <button onClick={()=>setBgColor("gray")}>gray</button>       

      </Card>
    </div>
  )
}

export default App
