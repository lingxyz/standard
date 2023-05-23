import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
import navJson from './nav.json'
import sidebarJson from './sidebar.json'

export default defineConfig({
  title: "Code Standards",
  description: "开发规范",
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navJson,
    sidebar: sidebarJson,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lingxyz/standard' }
    ],
    editLink: {
      pattern: 'https://gitee.com/-/ide/project/lingxyz/standard/edit/master/-/:path'
    },
    search: {
      provider: 'local'
    }
  },
  ignoreDeadLinks: [
    './LICENSE',
  ],
  base: '/standard/',
  lastUpdated: true
})
