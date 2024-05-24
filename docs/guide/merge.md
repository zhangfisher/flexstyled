# 样式合并

创建样式时支持传入`merge`参数，能够合并一些样式。

```tsx

import { styled } from "flexstyled"

const Row = styled({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: (props)=>props.algin==='center'?'center':'flex-start'
})

const Primary = styled({
    color: 'blue'
})


const btnStyle = styled({
    borderRadius: 4,
    padding: 10,
    fontSize: 14
},{
    merge:[Row,Primary]
})

```

createTheme({
    
})