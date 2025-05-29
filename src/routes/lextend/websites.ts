export type WebsiteItem = {
  icon?: string
  title: string
  desc: string
  href: string
  sort: number
  type: 'general' | 'frontend' | 'resource'
}

const websites: WebsiteItem[] = [
  {
    title: 'Github',
    desc: 'Github',
    href: 'https://github.com/dashboard',
    sort: 1,
    type: 'general'
  },
  {
    title: 'Github Repos',
    desc: 'Github仓库',
    href: 'https://github.com/Naxisigut?tab=repositories',
    sort: 2,
    type: 'general'
  },
  {
    title: 'ChatGPT',
    desc: 'ChatGPT',
    href: 'https://chatgpt.com/',
    sort: 3,
    type: 'general'
  },
  {
    title: 'Cursor',
    desc: 'Cursor',
    href: 'https://www.cursor.com/settings',
    sort: 4,
    type: 'general'
  },
  {
    title: 'Google Translate',
    desc: '谷歌翻译',
    href: 'https://translate.google.com/?hl=zh-cn&sl=auto&tl=zh-CN&op=translate',
    sort: 5,
    type: 'general'
  },
  {
    title: 'Starlink',
    desc: '翻墙',
    href: 'https://star.369.cyou/',
    sort: 6,
    type: 'general'
  },
  {
    title: 'Regexr',
    desc: '正则表达式测试',
    href: 'https://regexr.com/',
    sort: 7,
    type: 'general'
  },
  {
    title: 'Excalidraw',
    desc: '流程图',
    href: 'https://excalidraw.com/',
    sort: 8,
    type: 'general'
  },
  {
    title: 'Snippet Generator',
    desc: 'vscode代码片段',
    href: 'https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode',
    sort: 9,
    type: 'general'
  },
  {
    title: 'vscode 快捷键',
    desc: 'vscode 快捷键',
    href: 'https://www.dute.org/vscode-shortcut',
    sort: 10,
    type: 'general'
  },
  {
    title: 'CSS Inspiration',
    desc: '个人博客 chokcoco',
    href: 'https://chokcoco.github.io/CSS-Inspiration/#/',
    sort: 11,
    type: 'general'
  },
  {
    title: '字体编辑',
    desc: 'iconfont字体编辑',
    href: 'https://www.1json.com/front/fonteditor.html',
    sort: 12,
    type: 'general'
  },
  {
    title: 'UnoCSS',
    desc: 'css框架',
    href: 'http://unocss.cn/config/',
    sort: 13,
    type: 'frontend'
  },
  {
    title: 'UnoCSS Tutorial',
    desc: 'UnoCSS入门',
    href: 'https://tutorial.unocss.dev/1-basics/1-introduction/1-welcome/',
    sort: 14,
    type: 'frontend'
  },
  {
    title: 'Shadcn Vue',
    desc: '无头组件库',
    href: 'https://www.shadcn-vue.com/docs/components/accordion.html',
    sort: 15,
    type: 'frontend'
  },
  {
    title: 'TailWindCSS',
    desc: 'css框架',
    href: 'https://www.tailwindcss.cn/docs/installation',
    sort: 16,
    type: 'frontend'
  },
  {
    title: 'Vue',
    desc: 'Vue',
    href: 'https://cn.vuejs.org/guide/introduction.html',
    sort: 17,
    type: 'frontend'
  },
  {
    title: 'NPM',
    desc: 'NPM',
    href: 'https://www.npmjs.com/',
    sort: 18,
    type: 'frontend'
  },
  {
    title: 'Lucide',
    desc: '图标库',
    href: 'https://lucide.dev/icons/',
    sort: 19,
    type: 'frontend'
  },
  {
    title: 'Element',
    desc: '组件库',
    href: 'https://element.eleme.cn/#/zh-CN/component/installation',
    sort: 20,
    type: 'frontend'
  },
  {
    title: 'Vaul',
    desc: 'Drawer组件 仿ios',
    href: 'https://vaul.emilkowal.ski/',
    sort: 21,
    type: 'frontend'
  },
  {
    title: 'vue-sonner',
    desc: 'sonner toast组件',
    href: 'https://vue-sonner.vercel.app/',
    sort: 22,
    type: 'frontend'
  },
  {
    title: 'VueUse',
    desc: 'Vue3 hook',
    href: 'https://vueuse.org/guide/',
    sort: 23,
    type: 'frontend'
  },
  {
    title: 'sortablejs',
    desc: '拖拽排序',
    href: 'https://sortablejs.com/',
    sort: 24,
    type: 'frontend'
  },
  {
    title: 'vue-treeselect',
    desc: '树形下拉',
    href: 'https://vue-treeselect.js.org/',
    sort: 25,
    type: 'frontend'
  },
  {
    title: 'rollup.js',
    desc: '构建 打包工具',
    href: 'https://www.rollupjs.com/',
    sort: 26,
    type: 'frontend'
  },
  {
    title: 'mescroll',
    desc: '移动端滚动组件',
    href: 'https://www.mescroll.com/api.html',
    sort: 27,
    type: 'frontend'
  },
  {
    title: 'TS入门教程',
    desc: '电子书',
    href: 'https://ts.xcatliu.com/',
    sort: 28,
    type: 'frontend'
  },
  {
    title: 'Next.js',
    desc: 'React框架',
    href: 'https://nextjs.org/docs',
    sort: 29,
    type: 'frontend'
  },
  {
    title: 'Vitest',
    desc: '测试框架 vue3',
    href: 'https://cn.vitest.dev/guide/',
    sort: 30,
    type: 'frontend'
  },
  {
    title: 'UniBest',
    desc: 'Uniapp框架 vue3',
    href: 'https://codercup.github.io/unibest-docs/base/1-introduction',
    sort: 31,
    type: 'frontend'
  },
  {
    title: 'Ant Design Vue',
    desc: 'Vue组件库',
    href: 'https://2x.antdv.com/components/input-cn',
    sort: 32,
    type: 'frontend'
  },
  {
    title: 'Flowbite Icon',
    desc: '无头图标库',
    href: 'https://flowbite.com/icons/',
    sort: 33,
    type: 'frontend'
  },
  {
    title: '不太灵影视',
    desc: '视频下载',
    href: 'https://www.2bt0.com',
    sort: 34,
    type: 'resource'
  },
  {
    title: 'CN影院',
    desc: '在线VIP',
    href: 'https://cnys.tv/',
    sort: 35,
    type: 'resource'
  },
]

export default websites