# 主题

得益于`flexstyled`的灵活性，我们可以通过主题来实现全局样式的统一管理。


 ```tsx


const light = styled({
    "--primaryColor":'red',
    "--secondaryColor":'blue',
    "--backgroundColor":'white',
    "--color":'black',
    "--borderRadius":'4px'
})

const dark = styled({
    "--primaryColor":'red',
    "--secondaryColor":'blue',
    "--backgroundColor":'#333',
    "--color":'white',
    "--borderRadius":'4px'
})



const theme = createTheme(light,dark)



const Button = styled((props,{className,getStyle})=>{
    return <div class="className" style={getStyle()}>

    </div>
},{
    color:(props,theme)=>theme.primaryColor,
    backgroundColor:theme.secondaryColor,
    borderRadius:theme.borderRadius
},[theme])

const Input = styled({
    color:(props)=>theme.primaryColor,
    backgroundColor:theme.secondaryColor,
    borderRadius:theme.borderRadius
},[theme])







 ```


