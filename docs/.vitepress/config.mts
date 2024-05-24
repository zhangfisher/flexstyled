import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FlexStyled",
  description: "Flex CSS-IN-JS For React",
  themeConfig: {
    outline:{
      label:"目录",
      level:[2,5]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide' },
      { text: 'API', link: '/api' },
      { text: '示例', target:"_blank",link: 'https://codesandbox.io/p/sandbox/styledfc-demo-x7w94w?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clstzj2mg0006356lkdcmsv3s%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clstzj2mg0002356lq7y9whne%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clstzj2mg0003356lip4fhd1w%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clstzj2mg0005356l6vsjkkfr%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clstzj2mg0002356lq7y9whne%2522%253A%257B%2522id%2522%253A%2522clstzj2mg0002356lq7y9whne%2522%252C%2522tabs%2522%253A%255B%255D%257D%252C%2522clstzj2mg0005356l6vsjkkfr%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clstzj2mg0004356l6rts8s1f%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clstzj2mg0005356l6vsjkkfr%2522%252C%2522activeTabId%2522%253A%2522clstzj2mg0004356l6rts8s1f%2522%257D%252C%2522clstzj2mg0003356lip4fhd1w%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clstzj2mg0003356lip4fhd1w%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D' }
    ],
    sidebar: [
      { text: '关于', link: '/guide' },      
      { text: '安装', link: '/install' },
      { text: '快速入门', link: '/get-started' },
      {
        text: '指南',
        items: [                    
              { text: '创建样式', link: '/guide/createStyle' },
              { text: '动态样式', link: '/guide/dynamic' },              
              { text: 'CSS变量', link: '/guide/css-vars' },              
              { text: '嵌套样式', link: '/guide/nesting' },              
              { text: '样式组件', link: '/guide/component' },              
              { text: 'useStyled', link: '/guide/useStyled' },
              { text: '主题', link: '/guide/theme' },
              { text: 'StyledObject', link: '/guide/styledObject' },             
 
        ]
      },
      { text: '最佳实践', link: '/best-practices' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
