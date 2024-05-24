# 样式组件

`flexstyled`也支持直接通过`styled`函数来创建基于标准`HTML Tag`的样式组件。

```tsx
import { styled } from "flexstyled"


type MyCardProps = {
    title?:string
}

const MyCard = styled.div<MyCardProps>({
    colors: "red",
    fontSize: 16,
    padding: 10,
    "&:hover": {
        ouline: "red"
    },
    "& > .title": {
        color: "blue"
    },
    "& > .body": {
        color: "green"
    }
}
},{

})

<MyCard>
    <div className="title">Title</div>
    <div className="body">Body</div>
</MyCard>

```

- 支持标准`HTML Tag`的样式组件，如`div`、`span`、`a`等。
