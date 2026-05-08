import { Word } from '@/types/word';

/**
 * 单词表：适合 3-5 岁小朋友的基础英语单词（共 100 个）
 * 覆盖类别：水果、食物、动物、身体、颜色、数字、交通、家居、自然、服饰、学习、家人、情感等
 * 如需调整单词难度或增删，直接修改此文件即可
 */

/** 根据 id（如 'w1'、'w100'）和 word 生成音频相对路径 */
const audioPath = (id: string, word: string): string => {
  const seq = id.replace(/^w/, '').padStart(3, '0');
  return `/assets/audio/${seq}_${word}.mp3`;
};

/** 内部：仅描述除 audio 外的字段，audio 在导出时自动拼接 */
type RawWord = Omit<Word, 'audio'>;

const RAW_WORDS: RawWord[] = [
  // —— 水果（12）——
  { id: 'w1', word: 'apple', meaning: '苹果', emoji: '🍎', imageId: 292 },
  { id: 'w2', word: 'banana', meaning: '香蕉', emoji: '🍌', imageId: 312 },
  { id: 'w3', word: 'orange', meaning: '橘子', emoji: '🍊', imageId: 401 },
  { id: 'w4', word: 'grape', meaning: '葡萄', emoji: '🍇', imageId: 431 },
  { id: 'w5', word: 'watermelon', meaning: '西瓜', emoji: '🍉', imageId: 580 },
  { id: 'w6', word: 'strawberry', meaning: '草莓', emoji: '🍓', imageId: 835 },
  { id: 'w7', word: 'peach', meaning: '桃子', emoji: '🍑', imageId: 570 },
  { id: 'w8', word: 'pear', meaning: '梨', emoji: '🍐', imageId: 326 },
  { id: 'w9', word: 'lemon', meaning: '柠檬', emoji: '🍋', imageId: 625 },
  { id: 'w10', word: 'cherry', meaning: '樱桃', emoji: '🍒', imageId: 835 },
  { id: 'w11', word: 'pineapple', meaning: '菠萝', emoji: '🍍', imageId: 312 },
  { id: 'w12', word: 'mango', meaning: '芒果', emoji: '🥭', imageId: 401 },

  // —— 食物（12）——
  { id: 'w13', word: 'bread', meaning: '面包', emoji: '🍞', imageId: 326 },
  { id: 'w14', word: 'cake', meaning: '蛋糕', emoji: '🎂', imageId: 1080 },
  { id: 'w15', word: 'egg', meaning: '鸡蛋', emoji: '🥚', imageId: 625 },
  { id: 'w16', word: 'milk', meaning: '牛奶', emoji: '🥛', imageId: 431 },
  { id: 'w17', word: 'rice', meaning: '米饭', emoji: '🍚', imageId: 292 },
  { id: 'w18', word: 'noodles', meaning: '面条', emoji: '🍜', imageId: 312 },
  { id: 'w19', word: 'pizza', meaning: '披萨', emoji: '🍕', imageId: 1080 },
  { id: 'w20', word: 'hamburger', meaning: '汉堡', emoji: '🍔', imageId: 292 },
  { id: 'w21', word: 'icecream', meaning: '冰淇淋', emoji: '🍦', imageId: 1080 },
  { id: 'w22', word: 'cookie', meaning: '饼干', emoji: '🍪', imageId: 326 },
  { id: 'w23', word: 'candy', meaning: '糖果', emoji: '🍬', imageId: 835 },
  { id: 'w24', word: 'juice', meaning: '果汁', emoji: '🧃', imageId: 431 },

  // —— 动物（18）——
  { id: 'w25', word: 'cat', meaning: '猫', emoji: '🐱', imageId: 237 },
  { id: 'w26', word: 'dog', meaning: '狗', emoji: '🐶', imageId: 1025 },
  { id: 'w27', word: 'pig', meaning: '猪', emoji: '🐷', imageId: 237 },
  { id: 'w28', word: 'cow', meaning: '牛', emoji: '🐮', imageId: 1025 },
  { id: 'w29', word: 'horse', meaning: '马', emoji: '🐴', imageId: 718 },
  { id: 'w30', word: 'sheep', meaning: '羊', emoji: '🐑', imageId: 237 },
  { id: 'w31', word: 'rabbit', meaning: '兔子', emoji: '🐰', imageId: 659 },
  { id: 'w32', word: 'elephant', meaning: '大象', emoji: '🐘', imageId: 1074 },
  { id: 'w33', word: 'tiger', meaning: '老虎', emoji: '🐯', imageId: 1025 },
  { id: 'w34', word: 'lion', meaning: '狮子', emoji: '🦁', imageId: 1025 },
  { id: 'w35', word: 'bear', meaning: '熊', emoji: '🐻', imageId: 1025 },
  { id: 'w36', word: 'monkey', meaning: '猴子', emoji: '🐵', imageId: 659 },
  { id: 'w37', word: 'panda', meaning: '熊猫', emoji: '🐼', imageId: 1025 },
  { id: 'w38', word: 'giraffe', meaning: '长颈鹿', emoji: '🦒', imageId: 659 },
  { id: 'w39', word: 'bird', meaning: '鸟', emoji: '🐦', imageId: 718 },
  { id: 'w40', word: 'fish', meaning: '鱼', emoji: '🐟', imageId: 783 },
  { id: 'w41', word: 'duck', meaning: '鸭子', emoji: '🦆', imageId: 718 },
  { id: 'w42', word: 'frog', meaning: '青蛙', emoji: '🐸', imageId: 237 },

  // —— 身体部位（8）——
  { id: 'w43', word: 'eye', meaning: '眼睛', emoji: '👁️', imageId: 64 },
  { id: 'w44', word: 'ear', meaning: '耳朵', emoji: '👂', imageId: 91 },
  { id: 'w45', word: 'nose', meaning: '鼻子', emoji: '👃', imageId: 177 },
  { id: 'w46', word: 'mouth', meaning: '嘴巴', emoji: '👄', imageId: 338 },
  { id: 'w47', word: 'hand', meaning: '手', emoji: '✋', imageId: 1027 },
  { id: 'w48', word: 'foot', meaning: '脚', emoji: '🦶', imageId: 1027 },
  { id: 'w49', word: 'hair', meaning: '头发', emoji: '💇', imageId: 338 },
  { id: 'w50', word: 'tooth', meaning: '牙齿', emoji: '🦷', imageId: 91 },

  // —— 颜色（8）——
  { id: 'w51', word: 'red', meaning: '红色', emoji: '🔴', imageId: 292 },
  { id: 'w52', word: 'blue', meaning: '蓝色', emoji: '🔵', imageId: 1036 },
  { id: 'w53', word: 'yellow', meaning: '黄色', emoji: '🟡', imageId: 401 },
  { id: 'w54', word: 'green', meaning: '绿色', emoji: '🟢', imageId: 1039 },
  { id: 'w55', word: 'black', meaning: '黑色', emoji: '⚫', imageId: 1025 },
  { id: 'w56', word: 'white', meaning: '白色', emoji: '⚪', imageId: 431 },
  { id: 'w57', word: 'pink', meaning: '粉色', emoji: '🌸', imageId: 1015 },
  { id: 'w58', word: 'purple', meaning: '紫色', emoji: '🟣', imageId: 431 },

  // —— 数字（10）——
  { id: 'w59', word: 'one', meaning: '一', emoji: '1️⃣', imageId: 24 },
  { id: 'w60', word: 'two', meaning: '二', emoji: '2️⃣', imageId: 24 },
  { id: 'w61', word: 'three', meaning: '三', emoji: '3️⃣', imageId: 24 },
  { id: 'w62', word: 'four', meaning: '四', emoji: '4️⃣', imageId: 24 },
  { id: 'w63', word: 'five', meaning: '五', emoji: '5️⃣', imageId: 24 },
  { id: 'w64', word: 'six', meaning: '六', emoji: '6️⃣', imageId: 24 },
  { id: 'w65', word: 'seven', meaning: '七', emoji: '7️⃣', imageId: 24 },
  { id: 'w66', word: 'eight', meaning: '八', emoji: '8️⃣', imageId: 24 },
  { id: 'w67', word: 'nine', meaning: '九', emoji: '9️⃣', imageId: 24 },
  { id: 'w68', word: 'ten', meaning: '十', emoji: '🔟', imageId: 24 },

  // —— 交通工具（8）——
  { id: 'w69', word: 'car', meaning: '汽车', emoji: '🚗', imageId: 111 },
  { id: 'w70', word: 'bus', meaning: '公交车', emoji: '🚌', imageId: 133 },
  { id: 'w71', word: 'bike', meaning: '自行车', emoji: '🚲', imageId: 111 },
  { id: 'w72', word: 'train', meaning: '火车', emoji: '🚂', imageId: 133 },
  { id: 'w73', word: 'plane', meaning: '飞机', emoji: '✈️', imageId: 1036 },
  { id: 'w74', word: 'ship', meaning: '轮船', emoji: '🚢', imageId: 1015 },
  { id: 'w75', word: 'taxi', meaning: '出租车', emoji: '🚕', imageId: 111 },
  { id: 'w76', word: 'truck', meaning: '卡车', emoji: '🚚', imageId: 133 },

  // —— 家居物品（8）——
  { id: 'w77', word: 'bed', meaning: '床', emoji: '🛏️', imageId: 225 },
  { id: 'w78', word: 'chair', meaning: '椅子', emoji: '🪑', imageId: 598 },
  { id: 'w79', word: 'table', meaning: '桌子', emoji: '🪟', imageId: 582 },
  { id: 'w80', word: 'door', meaning: '门', emoji: '🚪', imageId: 1082 },
  { id: 'w81', word: 'window', meaning: '窗户', emoji: '🪟', imageId: 787 },
  { id: 'w82', word: 'lamp', meaning: '台灯', emoji: '💡', imageId: 582 },
  { id: 'w83', word: 'clock', meaning: '时钟', emoji: '🕐', imageId: 24 },
  { id: 'w84', word: 'phone', meaning: '电话', emoji: '📱', imageId: 160 },

  // —— 自然（8）——
  { id: 'w85', word: 'sun', meaning: '太阳', emoji: '☀️', imageId: 1036 },
  { id: 'w86', word: 'moon', meaning: '月亮', emoji: '🌙', imageId: 1018 },
  { id: 'w87', word: 'star', meaning: '星星', emoji: '⭐', imageId: 1018 },
  { id: 'w88', word: 'cloud', meaning: '云', emoji: '☁️', imageId: 1036 },
  { id: 'w89', word: 'rain', meaning: '雨', emoji: '🌧️', imageId: 1036 },
  { id: 'w90', word: 'flower', meaning: '花', emoji: '🌸', imageId: 1015 },
  { id: 'w91', word: 'tree', meaning: '树', emoji: '🌳', imageId: 1039 },
  { id: 'w92', word: 'grass', meaning: '草', emoji: '🌱', imageId: 1039 },

  // —— 学习用品 & 玩具（4）——
  { id: 'w93', word: 'book', meaning: '书', emoji: '📖', imageId: 24 },
  { id: 'w94', word: 'pen', meaning: '笔', emoji: '🖊️', imageId: 24 },
  { id: 'w95', word: 'bag', meaning: '书包', emoji: '🎒', imageId: 103 },
  { id: 'w96', word: 'ball', meaning: '球', emoji: '⚽', imageId: 250 },

  // —— 服饰 & 家人（4）——
  { id: 'w97', word: 'hat', meaning: '帽子', emoji: '🎩', imageId: 103 },
  { id: 'w98', word: 'shoe', meaning: '鞋子', emoji: '👟', imageId: 220 },
  { id: 'w99', word: 'mom', meaning: '妈妈', emoji: '👩', imageId: 177 },
  { id: 'w100', word: 'dad', meaning: '爸爸', emoji: '👨', imageId: 64 },
];

export const WORDS: Word[] = RAW_WORDS.map((w) => ({
  ...w,
  audio: audioPath(w.id, w.word),
}));
