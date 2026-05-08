写一个微信小程序，内容是给女儿做一个英语学习小程序，进入小程序第一个页面有两个按钮，第一个tab是英语小游戏，第二个tab是单词本。样式参考下面的html 

\<div style="display: flex; gap: 12px; margin: 20px;">   \<button      style="padding: 12px 24px;             background-color: #ff9eb5;             color: #fff;             border: none;             border-radius: 8px;             font-size: 16px;             cursor: pointer;">     小游戏   \</button>    \<button      style="padding: 12px 24px;             background-color: #4cd964;             color: #fff;             border: none;             border-radius: 8px;             font-size: 16px;             cursor: pointer;"> 单词本   \</button> \</div>

<br />

点击按钮1进入功能1，

功能1: 英语单词学习小游戏：

页面上方每次出一个单词，然后自动发音，有一个发音按钮用户可以点击重听。 同时页面下方出两张实物图片，只有一张图片和单词是对应的，小朋友在两张里点击选择正确的答案，如果回答正确，程序回答你答对了，然后出一个艾莎公主的笑脸，如果回答错误，程序回答你答错了，出一个安娜公主的哭脸。

页面样式参考下面的html: 

 \<!DOCTYPE html> \<html lang="zh-CN"> \<head>   \<meta charset="UTF-8" />   \<meta name="viewport" content="width=device-width, initial-scale=1.0"/>   \<title>单词学习页\</title>   \<style>     \* {       margin: 0;       padding: 0;       box-sizing: border-box;     }     body {       padding: 30px 20px;       font-family: Arial, sans-serif;       max-width: 800px;       margin: 0 auto;     }      /\* 顶部单词区域 \*/     .word-section {       text-align: center;       margin-bottom: 40px;     }     .word {       font-size: 32px;       font-weight: bold;       margin-right: 10px;     }     .pronounce-btn {       padding: 8px 16px;       font-size: 16px;       background: #f5f5f5;       border: 1px solid #ccc;       border-radius: 8px;       cursor: pointer;     }     .pronounce-btn:hover {       background: #eee;     }      /\* 下方图片区域 \*/     .img-container {       display: flex;       justify-content: space-around;       gap: 20px;     }     .img-box {       width: 45%;       aspect-ratio: 1 / 1;       border: 1px solid #eee;       border-radius: 12px;       overflow: hidden;     }     .img-box img {       width: 100%;       height: 100%;       object-fit: cover;     }   \</style> \</head> \<body>   \<!-- 顶部单词 + 发音按钮 -->   \<div class="word-section">     \<span class="word">elephant\</span>     \<button class="pronounce-btn">🔊 发音\</button>   \</div>    \<!-- 下方左右对称图片 -->   \<div class="img-container">     \<div class="img-box">       \<img src="图片1地址.jpg" alt="图片1" />     \</div>     \<div class="img-box">       \<img src="图片2地址.jpg" alt="图片2" />     \</div>   \</div> \</body> \</html>

注意，单词难度适合3岁小朋友，把单词表单独做一个文件，以便之后我调整单词难度

<br />

功能2: 单词本

把我在功能1的小游戏中已经做对和做错的单词分类出来，放在2个不同链接里 “已经会的”和“错题本”，点击链接可以查看做对和做错的单词清单，点击具体的单词会跳转到游戏里再玩一次。单词的分类以最新一次的游戏结果判定

<br />

<br />

