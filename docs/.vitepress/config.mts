import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FlexStyled",
  description: "Flex CSS-IN-JS For React",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide' },
      { text: 'API', link: '/api' }
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
              { text: 'useStyle', link: '/guide/useStyle' },
              { text: 'CSS变量', link: '/guide/css-vars' },
              { text: '嵌套样式', link: '/guide/nesting' },
              { text: '样式组件', link: '/guide/get-starts' },
              
            
        ]
      },
      { text: '最佳实践', link: '/best-practices' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
