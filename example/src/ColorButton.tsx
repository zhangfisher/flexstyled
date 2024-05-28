/**
 * 显示颜色按钮
 */
 
import { styled } from "../../src"


export type ColorButtonProps = {
    color?: string
}


export const ColorButton = styled.span<ColorButtonProps>({
    width: '24px',
    height: '24px',
    padding:"8px",
    borderRadius: "4px",
    margin: "4px",
    border: "5px solid white",
    boxShadow: "1px 1px 2px #ddd, -1px -1px 2px #ddd", 
    backgroundColor: (props)=>props.color,
    cursor: "pointer",
    "&:hover":{
        outline: "1px solid #aaa"
    }
});