import { styled } from "../../src";


export const RedBg = styled({
    backgroundColor:(props)=>props.bgColor ? props.bgColor : 'red'
})

export const RedBorder = styled({
    border: '1px solid red'
})

export const BorderRadius = styled({
    borderRadius: '10px'
})

export const Outline = styled({
    outline: (props)=>`8px solid ${props.bgColor}`
})



export const AtomStyles = [
    RedBg,
    RedBorder,
    BorderRadius,
    Outline
]