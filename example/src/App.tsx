import {  useState } from 'react'
import './App.css'
import { Card } from "./Card"
import { Card2 } from "./Card2"
import { Card3 } from "./Card3"
import { MyButton } from './MyButton'


function App() { 
  const [size,setSize] = useState<"small" | "middle" | "large">("middle")
  const  [bgColor,setBgColor] = useState("white")
  const [showCard2,setShowCard2] = useState(true)
  return (
    <div style={{width:"100%"}}>
      <MyButton>Styled</MyButton>
      <Card title="Styled" footer="Copyright 2024" size={size} bgColor={bgColor}>
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
      
      <button onClick={()=>setShowCard2(!showCard2)} >{showCard2 ? 'Hide Card' : 'Show Card'}</button>
      
      { showCard2 && <Card2 title="useStyle" footer="Copyright 2024" size={size} bgColor={bgColor}>
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

      <Card3 title="Styled" footer="Copyright 2024" size={size} bgColor={bgColor}>
        StyledFc is a simple css-in-js library for react component 
        <p>Size={size}</p>
        <button onClick={()=>setSize("small")}>Small</button>
        <button onClick={()=>setSize("middle")}>Middle</button>
        <button onClick={()=>setSize("large")}>Large</button>
        <p>BgColor={bgColor}</p>
        <button onClick={()=>setBgColor("red")}>red</button>
        <button onClick={()=>setBgColor("yellow")}>yellow</button>
        <button onClick={()=>setBgColor("gray")}>gray</button>       
      </Card3>

    </div>
  )
}

export default App
