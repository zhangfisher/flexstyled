import { styled } from "../../src";



export const MyButton = styled.div({
    border:"1px solid red",
    padding:"10px",
    borderRadius:"5px",
    fontSize:"16px",
    cursor:"pointer",
    "&:hover":{        
        backgroundColor:"red",
    }
})