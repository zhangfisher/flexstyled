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
    borderRadius: 5,
    margin: "4px",
    backgroundColor: (props)=>props.color,
    cursor: "pointer",
    "&:hover":{
        outline: "1px solid #aaa"
    }
});