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
    outline: '5px solid #0a8afb'
})



export const AtomStyles = [
    RedBg,
    RedBorder,
    BorderRadius,
    Outline
]