# 嵌套样式

`felxstyled`支持使用类似`less/sacc/scss`的嵌套语法来声明子元素的样式。

示例如下：

```tsx
styled({
    position       : "relative",
    display        : "block",
    width          : (props:CardProps)=> cardSizes[props.size!] || '400px', 
    fontSize       : "16px",
    border         : "1px solid #ccc",
    textAlign      : "left",
    borderRadius   : "4px",
    boxSizing      : "border-box",
    margin         : "4px;",
    "--title-color": "blue",
    "&:hover":{      //   [!code ++]
        border:"1px solid #1698e4",
    },
    "&.submit":{   //   [!code ++]
      color:"red"
    },
    "& > .title":{    //   [!code ++]
      padding      : "8px",
      background   : "#f9f9f9",
      fontSize     : "18px",
      fontWeight   : "bold",
      borderBottom : "1px solid #ccc",
      display      : "flex",
      flexDirection: "row",
      "& :first-child" : {    //   [!code ++]
        flex:1,        
        color:"var(--title-color)"
      },
      "& > .tools":{    //   [!code ++]
        "& > button":{    //   [!code ++]
            padding:"4px",
            background:"#ebebeb",
            color:"#666",
            border:"1px solid #555",
            borderRadius:"4px",
            cursor:"pointer",
            "&:hover":{    //   [!code ++]
                background:"#64a7ff",
                color:"white"
            }
        }   
       }
    }
})
```


::: warning TIP
使用`&`符号来表示当前元素，使用的方式与`less/sass/scss`等嵌套CSS的语法类似。
:::