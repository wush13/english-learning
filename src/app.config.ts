export default defineAppConfig({
  pages: [
    'pages/game/index',
    'pages/wordbook/index',
    'pages/wordlist/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ff9eb5',
    navigationBarTitleText: '英语乐园',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#8a9aa8',
    selectedColor: '#ff9eb5',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/game/index',
        text: '小游戏'
      },
      {
        pagePath: 'pages/wordbook/index',
        text: '单词本'
      }
    ]
  }
})
