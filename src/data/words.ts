import { Word, WordCategory, CategoryMeta } from '@/types/word';

/**
 * 单词表：适合 3-5 岁小朋友的基础英语单词（共 300 个）
 * 覆盖 25 个分类：水果、蔬菜、食物、动物、鸟类、昆虫、海洋、身体、颜色、数字、形状、
 * 交通、家居、自然、天气、学习、玩具、运动、音乐、服饰、家人、情感、动作、地点、时间
 *
 * 说明：
 * - 序号 w1-w100 与 src/assets/audio/ 中的 100 个 mp3 音频一一对应
 * - w101-w300 为新增词，暂未配音；游戏页 speak 失败时会自动用 Toast 兜底
 * - 如需新增/调整词条，直接编辑此文件即可
 */

/** 分类元数据：用于单词本中按类别浏览 */
export const CATEGORIES: CategoryMeta[] = [
  { key: 'fruit', label: '水果', emoji: '🍎' },
  { key: 'vegetable', label: '蔬菜', emoji: '🥕' },
  { key: 'food', label: '食物', emoji: '🍞' },
  { key: 'animal', label: '动物', emoji: '🐱' },
  { key: 'bird', label: '鸟类', emoji: '🐦' },
  { key: 'insect', label: '昆虫', emoji: '🐝' },
  { key: 'sea', label: '海洋', emoji: '🐳' },
  { key: 'body', label: '身体', emoji: '👁️' },
  { key: 'color', label: '颜色', emoji: '🎨' },
  { key: 'number', label: '数字', emoji: '🔢' },
  { key: 'shape', label: '形状', emoji: '🔵' },
  { key: 'vehicle', label: '交通', emoji: '🚗' },
  { key: 'home', label: '家居', emoji: '🛏️' },
  { key: 'nature', label: '自然', emoji: '🌳' },
  { key: 'weather', label: '天气', emoji: '☀️' },
  { key: 'study', label: '学习', emoji: '📖' },
  { key: 'toy', label: '玩具', emoji: '🎈' },
  { key: 'sport', label: '运动', emoji: '⚽' },
  { key: 'music', label: '音乐', emoji: '🎵' },
  { key: 'clothing', label: '服饰', emoji: '👕' },
  { key: 'family', label: '家人', emoji: '👪' },
  { key: 'emotion', label: '情感', emoji: '😀' },
  { key: 'action', label: '动作', emoji: '🏃' },
  { key: 'place', label: '地点', emoji: '🏫' },
  { key: 'time', label: '时间', emoji: '⏰' },
];

/** 微信云开发环境信息（音频文件转存路径） */
export const CLOUD_ENV_ID = 'cloud1-d5ghnanw8d8190225';
const CLOUD_BUCKET = '636c-cloud1-d5ghnanw8d8190225-1430484152';
const CLOUD_AUDIO_DIR = 'english-learning/audio';

/** 根据 id（如 'w1'、'w100'）和 word 生成云存储 fileID */
const audioPath = (id: string, word: string): string => {
  const seq = id.replace(/^w/, '').padStart(3, '0');
  return `cloud://${CLOUD_ENV_ID}.${CLOUD_BUCKET}/${CLOUD_AUDIO_DIR}/${seq}_${word}.mp3`;
};

/**
 * 已配音的单词 id 上限（w1 ~ w<AUDIO_READY_MAX_ID> 都已上传到云存储）。
 * 当你为更多新词补充音频后，把这个数字调大即可，超过此数的单词游戏页会自动用 Toast 兜底，
 * 不会再尝试播放不存在的音频，从而避免控制台报错。
 */
const AUDIO_READY_MAX_ID = 300;

/** 判断某个 id（如 'w107'）是否已经有云端音频 */
const hasAudioFor = (id: string): boolean => {
  const num = parseInt(id.replace(/^w/, ''), 10);
  return Number.isFinite(num) && num <= AUDIO_READY_MAX_ID;
};

/** 内部：仅描述除 audio / hasAudio 外的字段，导出时自动拼接 */
type RawWord = Omit<Word, 'audio' | 'hasAudio'>;

const RAW_WORDS: RawWord[] = [
  // —— 水果 fruit (12) ——
  { id: 'w1', word: 'apple', meaning: '苹果', emoji: '🍎', imageId: 292, category: 'fruit' },
  { id: 'w2', word: 'banana', meaning: '香蕉', emoji: '🍌', imageId: 312, category: 'fruit' },
  { id: 'w3', word: 'orange', meaning: '橘子', emoji: '🍊', imageId: 401, category: 'fruit' },
  { id: 'w4', word: 'grape', meaning: '葡萄', emoji: '🍇', imageId: 431, category: 'fruit' },
  { id: 'w5', word: 'watermelon', meaning: '西瓜', emoji: '🍉', imageId: 580, category: 'fruit' },
  { id: 'w6', word: 'strawberry', meaning: '草莓', emoji: '🍓', imageId: 835, category: 'fruit' },
  { id: 'w7', word: 'peach', meaning: '桃子', emoji: '🍑', imageId: 570, category: 'fruit' },
  { id: 'w8', word: 'pear', meaning: '梨', emoji: '🍐', imageId: 326, category: 'fruit' },
  { id: 'w9', word: 'lemon', meaning: '柠檬', emoji: '🍋', imageId: 625, category: 'fruit' },
  { id: 'w10', word: 'cherry', meaning: '樱桃', emoji: '🍒', imageId: 835, category: 'fruit' },
  { id: 'w11', word: 'pineapple', meaning: '菠萝', emoji: '🍍', imageId: 312, category: 'fruit' },
  { id: 'w12', word: 'mango', meaning: '芒果', emoji: '🥭', imageId: 401, category: 'fruit' },

  // —— 食物 food (12) ——
  { id: 'w13', word: 'bread', meaning: '面包', emoji: '🍞', imageId: 326, category: 'food' },
  { id: 'w14', word: 'cake', meaning: '蛋糕', emoji: '🎂', imageId: 1080, category: 'food' },
  { id: 'w15', word: 'egg', meaning: '鸡蛋', emoji: '🥚', imageId: 625, category: 'food' },
  { id: 'w16', word: 'milk', meaning: '牛奶', emoji: '🥛', imageId: 431, category: 'food' },
  { id: 'w17', word: 'rice', meaning: '米饭', emoji: '🍚', imageId: 292, category: 'food' },
  { id: 'w18', word: 'noodles', meaning: '面条', emoji: '🍜', imageId: 312, category: 'food' },
  { id: 'w19', word: 'pizza', meaning: '披萨', emoji: '🍕', imageId: 1080, category: 'food' },
  { id: 'w20', word: 'hamburger', meaning: '汉堡', emoji: '🍔', imageId: 292, category: 'food' },
  { id: 'w21', word: 'icecream', meaning: '冰淇淋', emoji: '🍦', imageId: 1080, category: 'food' },
  { id: 'w22', word: 'cookie', meaning: '饼干', emoji: '🍪', imageId: 326, category: 'food' },
  { id: 'w23', word: 'candy', meaning: '糖果', emoji: '🍬', imageId: 835, category: 'food' },
  { id: 'w24', word: 'juice', meaning: '果汁', emoji: '🧃', imageId: 431, category: 'food' },

  // —— 动物 animal (18) ——
  { id: 'w25', word: 'cat', meaning: '猫', emoji: '🐱', imageId: 237, category: 'animal' },
  { id: 'w26', word: 'dog', meaning: '狗', emoji: '🐶', imageId: 1025, category: 'animal' },
  { id: 'w27', word: 'pig', meaning: '猪', emoji: '🐷', imageId: 237, category: 'animal' },
  { id: 'w28', word: 'cow', meaning: '牛', emoji: '🐮', imageId: 1025, category: 'animal' },
  { id: 'w29', word: 'horse', meaning: '马', emoji: '🐴', imageId: 718, category: 'animal' },
  { id: 'w30', word: 'sheep', meaning: '羊', emoji: '🐑', imageId: 237, category: 'animal' },
  { id: 'w31', word: 'rabbit', meaning: '兔子', emoji: '🐰', imageId: 659, category: 'animal' },
  { id: 'w32', word: 'elephant', meaning: '大象', emoji: '🐘', imageId: 1074, category: 'animal' },
  { id: 'w33', word: 'tiger', meaning: '老虎', emoji: '🐯', imageId: 1025, category: 'animal' },
  { id: 'w34', word: 'lion', meaning: '狮子', emoji: '🦁', imageId: 1025, category: 'animal' },
  { id: 'w35', word: 'bear', meaning: '熊', emoji: '🐻', imageId: 1025, category: 'animal' },
  { id: 'w36', word: 'monkey', meaning: '猴子', emoji: '🐵', imageId: 659, category: 'animal' },
  { id: 'w37', word: 'panda', meaning: '熊猫', emoji: '🐼', imageId: 1025, category: 'animal' },
  { id: 'w38', word: 'giraffe', meaning: '长颈鹿', emoji: '🦒', imageId: 659, category: 'animal' },
  { id: 'w39', word: 'bird', meaning: '鸟', emoji: '🐦', imageId: 718, category: 'bird' },
  { id: 'w40', word: 'fish', meaning: '鱼', emoji: '🐟', imageId: 783, category: 'sea' },
  { id: 'w41', word: 'duck', meaning: '鸭子', emoji: '🦆', imageId: 718, category: 'bird' },
  { id: 'w42', word: 'frog', meaning: '青蛙', emoji: '🐸', imageId: 237, category: 'animal' },

  // —— 身体 body (8) ——
  { id: 'w43', word: 'eye', meaning: '眼睛', emoji: '👁️', imageId: 64, category: 'body' },
  { id: 'w44', word: 'ear', meaning: '耳朵', emoji: '👂', imageId: 91, category: 'body' },
  { id: 'w45', word: 'nose', meaning: '鼻子', emoji: '👃', imageId: 177, category: 'body' },
  { id: 'w46', word: 'mouth', meaning: '嘴巴', emoji: '👄', imageId: 338, category: 'body' },
  { id: 'w47', word: 'hand', meaning: '手', emoji: '✋', imageId: 1027, category: 'body' },
  { id: 'w48', word: 'foot', meaning: '脚', emoji: '🦶', imageId: 1027, category: 'body' },
  { id: 'w49', word: 'hair', meaning: '头发', emoji: '💇', imageId: 338, category: 'body' },
  { id: 'w50', word: 'tooth', meaning: '牙齿', emoji: '🦷', imageId: 91, category: 'body' },

  // —— 颜色 color (8) ——
  { id: 'w51', word: 'red', meaning: '红色', emoji: '🔴', imageId: 292, category: 'color' },
  { id: 'w52', word: 'blue', meaning: '蓝色', emoji: '🔵', imageId: 1036, category: 'color' },
  { id: 'w53', word: 'yellow', meaning: '黄色', emoji: '🟡', imageId: 401, category: 'color' },
  { id: 'w54', word: 'green', meaning: '绿色', emoji: '🟢', imageId: 1039, category: 'color' },
  { id: 'w55', word: 'black', meaning: '黑色', emoji: '⚫', imageId: 1025, category: 'color' },
  { id: 'w56', word: 'white', meaning: '白色', emoji: '⚪', imageId: 431, category: 'color' },
  { id: 'w57', word: 'pink', meaning: '粉色', emoji: '🌸', imageId: 1015, category: 'color' },
  { id: 'w58', word: 'purple', meaning: '紫色', emoji: '🟣', imageId: 431, category: 'color' },

  // —— 数字 number (10) ——
  { id: 'w59', word: 'one', meaning: '一', emoji: '1️⃣', imageId: 24, category: 'number' },
  { id: 'w60', word: 'two', meaning: '二', emoji: '2️⃣', imageId: 24, category: 'number' },
  { id: 'w61', word: 'three', meaning: '三', emoji: '3️⃣', imageId: 24, category: 'number' },
  { id: 'w62', word: 'four', meaning: '四', emoji: '4️⃣', imageId: 24, category: 'number' },
  { id: 'w63', word: 'five', meaning: '五', emoji: '5️⃣', imageId: 24, category: 'number' },
  { id: 'w64', word: 'six', meaning: '六', emoji: '6️⃣', imageId: 24, category: 'number' },
  { id: 'w65', word: 'seven', meaning: '七', emoji: '7️⃣', imageId: 24, category: 'number' },
  { id: 'w66', word: 'eight', meaning: '八', emoji: '8️⃣', imageId: 24, category: 'number' },
  { id: 'w67', word: 'nine', meaning: '九', emoji: '9️⃣', imageId: 24, category: 'number' },
  { id: 'w68', word: 'ten', meaning: '十', emoji: '🔟', imageId: 24, category: 'number' },

  // —— 交通 vehicle (8) ——
  { id: 'w69', word: 'car', meaning: '汽车', emoji: '🚗', imageId: 111, category: 'vehicle' },
  { id: 'w70', word: 'bus', meaning: '公交车', emoji: '🚌', imageId: 133, category: 'vehicle' },
  { id: 'w71', word: 'bike', meaning: '自行车', emoji: '🚲', imageId: 111, category: 'vehicle' },
  { id: 'w72', word: 'train', meaning: '火车', emoji: '🚂', imageId: 133, category: 'vehicle' },
  { id: 'w73', word: 'plane', meaning: '飞机', emoji: '✈️', imageId: 1036, category: 'vehicle' },
  { id: 'w74', word: 'ship', meaning: '轮船', emoji: '🚢', imageId: 1015, category: 'vehicle' },
  { id: 'w75', word: 'taxi', meaning: '出租车', emoji: '🚕', imageId: 111, category: 'vehicle' },
  { id: 'w76', word: 'truck', meaning: '卡车', emoji: '🚚', imageId: 133, category: 'vehicle' },

  // —— 家居 home (8) ——
  { id: 'w77', word: 'bed', meaning: '床', emoji: '🛏️', imageId: 225, category: 'home' },
  { id: 'w78', word: 'chair', meaning: '椅子', emoji: '🪑', imageId: 598, category: 'home' },
  { id: 'w79', word: 'table', meaning: '桌子', emoji: '🪟', imageId: 582, category: 'home' },
  { id: 'w80', word: 'door', meaning: '门', emoji: '🚪', imageId: 1082, category: 'home' },
  { id: 'w81', word: 'window', meaning: '窗户', emoji: '🪟', imageId: 787, category: 'home' },
  { id: 'w82', word: 'lamp', meaning: '台灯', emoji: '💡', imageId: 582, category: 'home' },
  { id: 'w83', word: 'clock', meaning: '时钟', emoji: '🕐', imageId: 24, category: 'home' },
  { id: 'w84', word: 'phone', meaning: '电话', emoji: '📱', imageId: 160, category: 'home' },

  // —— 自然 nature (8) ——
  { id: 'w85', word: 'sun', meaning: '太阳', emoji: '☀️', imageId: 1036, category: 'nature' },
  { id: 'w86', word: 'moon', meaning: '月亮', emoji: '🌙', imageId: 1018, category: 'nature' },
  { id: 'w87', word: 'star', meaning: '星星', emoji: '⭐', imageId: 1018, category: 'nature' },
  { id: 'w88', word: 'cloud', meaning: '云', emoji: '☁️', imageId: 1036, category: 'nature' },
  { id: 'w89', word: 'rain', meaning: '雨', emoji: '🌧️', imageId: 1036, category: 'weather' },
  { id: 'w90', word: 'flower', meaning: '花', emoji: '🌸', imageId: 1015, category: 'nature' },
  { id: 'w91', word: 'tree', meaning: '树', emoji: '🌳', imageId: 1039, category: 'nature' },
  { id: 'w92', word: 'grass', meaning: '草', emoji: '🌱', imageId: 1039, category: 'nature' },

  // —— 学习 study (3) & 玩具 toy (1) ——
  { id: 'w93', word: 'book', meaning: '书', emoji: '📖', imageId: 24, category: 'study' },
  { id: 'w94', word: 'pen', meaning: '笔', emoji: '🖊️', imageId: 24, category: 'study' },
  { id: 'w95', word: 'bag', meaning: '书包', emoji: '🎒', imageId: 103, category: 'study' },
  { id: 'w96', word: 'ball', meaning: '球', emoji: '⚽', imageId: 250, category: 'toy' },

  // —— 服饰 clothing (2) & 家人 family (2) ——
  { id: 'w97', word: 'hat', meaning: '帽子', emoji: '🎩', imageId: 103, category: 'clothing' },
  { id: 'w98', word: 'shoe', meaning: '鞋子', emoji: '👟', imageId: 220, category: 'clothing' },
  { id: 'w99', word: 'mom', meaning: '妈妈', emoji: '👩', imageId: 177, category: 'family' },
  { id: 'w100', word: 'dad', meaning: '爸爸', emoji: '👨', imageId: 64, category: 'family' },

  // —— 蔬菜 vegetable (12) ——
  { id: 'w101', word: 'carrot', meaning: '胡萝卜', emoji: '🥕', imageId: 0, category: 'vegetable' },
  { id: 'w102', word: 'tomato', meaning: '番茄', emoji: '🍅', imageId: 0, category: 'vegetable' },
  { id: 'w103', word: 'corn', meaning: '玉米', emoji: '🌽', imageId: 0, category: 'vegetable' },
  { id: 'w104', word: 'potato', meaning: '土豆', emoji: '🥔', imageId: 0, category: 'vegetable' },
  { id: 'w105', word: 'broccoli', meaning: '西兰花', emoji: '🥦', imageId: 0, category: 'vegetable' },
  { id: 'w106', word: 'cucumber', meaning: '黄瓜', emoji: '🥒', imageId: 0, category: 'vegetable' },
  { id: 'w107', word: 'onion', meaning: '洋葱', emoji: '🧅', imageId: 0, category: 'vegetable' },
  { id: 'w108', word: 'garlic', meaning: '大蒜', emoji: '🧄', imageId: 0, category: 'vegetable' },
  { id: 'w109', word: 'pepper', meaning: '辣椒', emoji: '🌶️', imageId: 0, category: 'vegetable' },
  { id: 'w110', word: 'mushroom', meaning: '蘑菇', emoji: '🍄', imageId: 0, category: 'vegetable' },
  { id: 'w111', word: 'eggplant', meaning: '茄子', emoji: '🍆', imageId: 0, category: 'vegetable' },
  { id: 'w112', word: 'lettuce', meaning: '生菜', emoji: '🥬', imageId: 0, category: 'vegetable' },

  // —— 食物扩展 food ext (8) ——
  { id: 'w113', word: 'cheese', meaning: '奶酪', emoji: '🧀', imageId: 0, category: 'food' },
  { id: 'w114', word: 'meat', meaning: '肉', emoji: '🍖', imageId: 0, category: 'food' },
  { id: 'w115', word: 'chicken', meaning: '鸡肉', emoji: '🍗', imageId: 0, category: 'food' },
  { id: 'w116', word: 'soup', meaning: '汤', emoji: '🍲', imageId: 0, category: 'food' },
  { id: 'w117', word: 'popcorn', meaning: '爆米花', emoji: '🍿', imageId: 0, category: 'food' },
  { id: 'w118', word: 'chocolate', meaning: '巧克力', emoji: '🍫', imageId: 0, category: 'food' },
  { id: 'w119', word: 'donut', meaning: '甜甜圈', emoji: '🍩', imageId: 0, category: 'food' },
  { id: 'w120', word: 'pancake', meaning: '煎饼', emoji: '🥞', imageId: 0, category: 'food' },

  // —— 饮料 (归在 food 类别) (5) ——
  { id: 'w121', word: 'water', meaning: '水', emoji: '💧', imageId: 0, category: 'food' },
  { id: 'w122', word: 'tea', meaning: '茶', emoji: '🍵', imageId: 0, category: 'food' },
  { id: 'w123', word: 'coffee', meaning: '咖啡', emoji: '☕', imageId: 0, category: 'food' },
  { id: 'w124', word: 'soda', meaning: '汽水', emoji: '🥤', imageId: 0, category: 'food' },
  { id: 'w125', word: 'honey', meaning: '蜂蜜', emoji: '🍯', imageId: 0, category: 'food' },

  // —— 动物扩展 animal ext (15) ——
  { id: 'w126', word: 'snake', meaning: '蛇', emoji: '🐍', imageId: 0, category: 'animal' },
  { id: 'w127', word: 'mouse', meaning: '老鼠', emoji: '🐭', imageId: 0, category: 'animal' },
  { id: 'w128', word: 'fox', meaning: '狐狸', emoji: '🦊', imageId: 0, category: 'animal' },
  { id: 'w129', word: 'wolf', meaning: '狼', emoji: '🐺', imageId: 0, category: 'animal' },
  { id: 'w130', word: 'squirrel', meaning: '松鼠', emoji: '🐿️', imageId: 0, category: 'animal' },
  { id: 'w131', word: 'camel', meaning: '骆驼', emoji: '🐪', imageId: 0, category: 'animal' },
  { id: 'w132', word: 'zebra', meaning: '斑马', emoji: '🦓', imageId: 0, category: 'animal' },
  { id: 'w133', word: 'kangaroo', meaning: '袋鼠', emoji: '🦘', imageId: 0, category: 'animal' },
  { id: 'w134', word: 'koala', meaning: '考拉', emoji: '🐨', imageId: 0, category: 'animal' },
  { id: 'w135', word: 'hippo', meaning: '河马', emoji: '🦛', imageId: 0, category: 'animal' },
  { id: 'w136', word: 'deer', meaning: '鹿', emoji: '🦌', imageId: 0, category: 'animal' },
  { id: 'w137', word: 'crocodile', meaning: '鳄鱼', emoji: '🐊', imageId: 0, category: 'animal' },
  { id: 'w138', word: 'leopard', meaning: '豹', emoji: '🐆', imageId: 0, category: 'animal' },
  { id: 'w139', word: 'chick', meaning: '小鸡', emoji: '🐥', imageId: 0, category: 'animal' },
  { id: 'w140', word: 'hedgehog', meaning: '刺猬', emoji: '🦔', imageId: 0, category: 'animal' },

  // —— 鸟类 bird (6) ——
  { id: 'w141', word: 'hen', meaning: '母鸡', emoji: '🐔', imageId: 0, category: 'bird' },
  { id: 'w142', word: 'rooster', meaning: '公鸡', emoji: '🐓', imageId: 0, category: 'bird' },
  { id: 'w143', word: 'penguin', meaning: '企鹅', emoji: '🐧', imageId: 0, category: 'bird' },
  { id: 'w144', word: 'eagle', meaning: '老鹰', emoji: '🦅', imageId: 0, category: 'bird' },
  { id: 'w145', word: 'swan', meaning: '天鹅', emoji: '🦢', imageId: 0, category: 'bird' },
  { id: 'w146', word: 'owl', meaning: '猫头鹰', emoji: '🦉', imageId: 0, category: 'bird' },

  // —— 昆虫 insect (6) ——
  { id: 'w147', word: 'bee', meaning: '蜜蜂', emoji: '🐝', imageId: 0, category: 'insect' },
  { id: 'w148', word: 'ant', meaning: '蚂蚁', emoji: '🐜', imageId: 0, category: 'insect' },
  { id: 'w149', word: 'butterfly', meaning: '蝴蝶', emoji: '🦋', imageId: 0, category: 'insect' },
  { id: 'w150', word: 'spider', meaning: '蜘蛛', emoji: '🕷️', imageId: 0, category: 'insect' },
  { id: 'w151', word: 'ladybug', meaning: '瓢虫', emoji: '🐞', imageId: 0, category: 'insect' },
  { id: 'w152', word: 'snail', meaning: '蜗牛', emoji: '🐌', imageId: 0, category: 'insect' },

  // —— 海洋 sea (8) ——
  { id: 'w153', word: 'whale', meaning: '鲸鱼', emoji: '🐳', imageId: 0, category: 'sea' },
  { id: 'w154', word: 'dolphin', meaning: '海豚', emoji: '🐬', imageId: 0, category: 'sea' },
  { id: 'w155', word: 'shark', meaning: '鲨鱼', emoji: '🦈', imageId: 0, category: 'sea' },
  { id: 'w156', word: 'octopus', meaning: '章鱼', emoji: '🐙', imageId: 0, category: 'sea' },
  { id: 'w157', word: 'turtle', meaning: '乌龟', emoji: '🐢', imageId: 0, category: 'sea' },
  { id: 'w158', word: 'crab', meaning: '螃蟹', emoji: '🦀', imageId: 0, category: 'sea' },
  { id: 'w159', word: 'shrimp', meaning: '虾', emoji: '🦐', imageId: 0, category: 'sea' },
  { id: 'w160', word: 'squid', meaning: '鱿鱼', emoji: '🦑', imageId: 0, category: 'sea' },

  // —— 身体扩展 body ext (6) ——
  { id: 'w161', word: 'face', meaning: '脸', emoji: '😊', imageId: 0, category: 'body' },
  { id: 'w162', word: 'head', meaning: '头', emoji: '👤', imageId: 0, category: 'body' },
  { id: 'w163', word: 'leg', meaning: '腿', emoji: '🦵', imageId: 0, category: 'body' },
  { id: 'w164', word: 'arm', meaning: '手臂', emoji: '💪', imageId: 0, category: 'body' },
  { id: 'w165', word: 'finger', meaning: '手指', emoji: '👆', imageId: 0, category: 'body' },
  { id: 'w166', word: 'tongue', meaning: '舌头', emoji: '👅', imageId: 0, category: 'body' },

  // —— 颜色扩展 color ext (4) ——
  { id: 'w167', word: 'brown', meaning: '棕色', emoji: '🟤', imageId: 0, category: 'color' },
  { id: 'w168', word: 'gold', meaning: '金色', emoji: '🟨', imageId: 0, category: 'color' },
  { id: 'w169', word: 'silver', meaning: '银色', emoji: '⚪', imageId: 0, category: 'color' },
  { id: 'w170', word: 'rainbow', meaning: '彩虹色', emoji: '🌈', imageId: 0, category: 'color' },

  // —— 数字扩展 number ext (5) ——
  { id: 'w171', word: 'zero', meaning: '零', emoji: '0️⃣', imageId: 0, category: 'number' },
  { id: 'w172', word: 'hundred', meaning: '一百', emoji: '💯', imageId: 0, category: 'number' },
  { id: 'w173', word: 'first', meaning: '第一', emoji: '🥇', imageId: 0, category: 'number' },
  { id: 'w174', word: 'second', meaning: '第二', emoji: '🥈', imageId: 0, category: 'number' },
  { id: 'w175', word: 'third', meaning: '第三', emoji: '🥉', imageId: 0, category: 'number' },

  // —— 形状 shape (6) ——
  { id: 'w176', word: 'circle', meaning: '圆形', emoji: '⭕', imageId: 0, category: 'shape' },
  { id: 'w177', word: 'square', meaning: '方形', emoji: '🟦', imageId: 0, category: 'shape' },
  { id: 'w178', word: 'triangle', meaning: '三角形', emoji: '🔺', imageId: 0, category: 'shape' },
  { id: 'w179', word: 'heart', meaning: '心形', emoji: '💗', imageId: 0, category: 'shape' },
  { id: 'w180', word: 'diamond', meaning: '钻石', emoji: '💎', imageId: 0, category: 'shape' },
  { id: 'w181', word: 'arrow', meaning: '箭头', emoji: '➡️', imageId: 0, category: 'shape' },

  // —— 交通扩展 vehicle ext (7) ——
  { id: 'w182', word: 'helicopter', meaning: '直升机', emoji: '🚁', imageId: 0, category: 'vehicle' },
  { id: 'w183', word: 'rocket', meaning: '火箭', emoji: '🚀', imageId: 0, category: 'vehicle' },
  { id: 'w184', word: 'firetruck', meaning: '消防车', emoji: '🚒', imageId: 0, category: 'vehicle' },
  { id: 'w185', word: 'police', meaning: '警车', emoji: '🚓', imageId: 0, category: 'vehicle' },
  { id: 'w186', word: 'ambulance', meaning: '救护车', emoji: '🚑', imageId: 0, category: 'vehicle' },
  { id: 'w187', word: 'tractor', meaning: '拖拉机', emoji: '🚜', imageId: 0, category: 'vehicle' },
  { id: 'w188', word: 'motorbike', meaning: '摩托车', emoji: '🏍️', imageId: 0, category: 'vehicle' },

  // —— 家居扩展 home ext (8) ——
  { id: 'w189', word: 'sofa', meaning: '沙发', emoji: '🛋️', imageId: 0, category: 'home' },
  { id: 'w190', word: 'mirror', meaning: '镜子', emoji: '🪞', imageId: 0, category: 'home' },
  { id: 'w191', word: 'toilet', meaning: '马桶', emoji: '🚽', imageId: 0, category: 'home' },
  { id: 'w192', word: 'bathtub', meaning: '浴缸', emoji: '🛁', imageId: 0, category: 'home' },
  { id: 'w193', word: 'fork', meaning: '叉子', emoji: '🍴', imageId: 0, category: 'home' },
  { id: 'w194', word: 'spoon', meaning: '勺子', emoji: '🥄', imageId: 0, category: 'home' },
  { id: 'w195', word: 'knife', meaning: '刀', emoji: '🔪', imageId: 0, category: 'home' },
  { id: 'w196', word: 'cup', meaning: '杯子', emoji: '🥃', imageId: 0, category: 'home' },

  // —— 自然扩展 nature ext (8) ——
  { id: 'w197', word: 'mountain', meaning: '山', emoji: '🏔️', imageId: 0, category: 'nature' },
  { id: 'w198', word: 'ocean', meaning: '海洋', emoji: '🌊', imageId: 0, category: 'nature' },
  { id: 'w199', word: 'island', meaning: '岛屿', emoji: '🏝️', imageId: 0, category: 'nature' },
  { id: 'w200', word: 'volcano', meaning: '火山', emoji: '🌋', imageId: 0, category: 'nature' },
  { id: 'w201', word: 'desert', meaning: '沙漠', emoji: '🏜️', imageId: 0, category: 'nature' },
  { id: 'w202', word: 'leaf', meaning: '树叶', emoji: '🍃', imageId: 0, category: 'nature' },
  { id: 'w203', word: 'rose', meaning: '玫瑰', emoji: '🌹', imageId: 0, category: 'nature' },
  { id: 'w204', word: 'cactus', meaning: '仙人掌', emoji: '🌵', imageId: 0, category: 'nature' },

  // —— 天气 weather (8) ——
  { id: 'w205', word: 'snow', meaning: '雪', emoji: '❄️', imageId: 0, category: 'weather' },
  { id: 'w206', word: 'wind', meaning: '风', emoji: '💨', imageId: 0, category: 'weather' },
  { id: 'w207', word: 'thunder', meaning: '闪电', emoji: '⚡', imageId: 0, category: 'weather' },
  { id: 'w208', word: 'sunny', meaning: '晴天', emoji: '🌞', imageId: 0, category: 'weather' },
  { id: 'w209', word: 'hot', meaning: '热', emoji: '🥵', imageId: 0, category: 'weather' },
  { id: 'w210', word: 'cold', meaning: '冷', emoji: '🥶', imageId: 0, category: 'weather' },
  { id: 'w211', word: 'storm', meaning: '暴雨', emoji: '🌩️', imageId: 0, category: 'weather' },
  { id: 'w212', word: 'tornado', meaning: '龙卷风', emoji: '🌪️', imageId: 0, category: 'weather' },

  // —— 学习扩展 study ext (6) ——
  { id: 'w213', word: 'pencil', meaning: '铅笔', emoji: '✏️', imageId: 0, category: 'study' },
  { id: 'w214', word: 'ruler', meaning: '尺子', emoji: '📏', imageId: 0, category: 'study' },
  { id: 'w215', word: 'scissors', meaning: '剪刀', emoji: '✂️', imageId: 0, category: 'study' },
  { id: 'w216', word: 'paper', meaning: '纸', emoji: '📄', imageId: 0, category: 'study' },
  { id: 'w217', word: 'map', meaning: '地图', emoji: '🗺️', imageId: 0, category: 'study' },
  { id: 'w218', word: 'globe', meaning: '地球仪', emoji: '🌐', imageId: 0, category: 'study' },

  // —— 玩具 toy ext (8) ——
  { id: 'w219', word: 'doll', meaning: '娃娃', emoji: '🪆', imageId: 0, category: 'toy' },
  { id: 'w220', word: 'robot', meaning: '机器人', emoji: '🤖', imageId: 0, category: 'toy' },
  { id: 'w221', word: 'kite', meaning: '风筝', emoji: '🪁', imageId: 0, category: 'toy' },
  { id: 'w222', word: 'balloon', meaning: '气球', emoji: '🎈', imageId: 0, category: 'toy' },
  { id: 'w223', word: 'puzzle', meaning: '拼图', emoji: '🧩', imageId: 0, category: 'toy' },
  { id: 'w224', word: 'teddy', meaning: '玩具熊', emoji: '🧸', imageId: 0, category: 'toy' },
  { id: 'w225', word: 'gift', meaning: '礼物', emoji: '🎁', imageId: 0, category: 'toy' },
  { id: 'w226', word: 'dice', meaning: '骰子', emoji: '🎲', imageId: 0, category: 'toy' },

  // —— 运动 sport (8) ——
  { id: 'w227', word: 'football', meaning: '橄榄球', emoji: '🏈', imageId: 0, category: 'sport' },
  { id: 'w228', word: 'basketball', meaning: '篮球', emoji: '🏀', imageId: 0, category: 'sport' },
  { id: 'w229', word: 'tennis', meaning: '网球', emoji: '🎾', imageId: 0, category: 'sport' },
  { id: 'w230', word: 'baseball', meaning: '棒球', emoji: '⚾', imageId: 0, category: 'sport' },
  { id: 'w231', word: 'volleyball', meaning: '排球', emoji: '🏐', imageId: 0, category: 'sport' },
  { id: 'w232', word: 'skating', meaning: '滑冰', emoji: '⛸️', imageId: 0, category: 'sport' },
  { id: 'w233', word: 'skiing', meaning: '滑雪', emoji: '⛷️', imageId: 0, category: 'sport' },
  { id: 'w234', word: 'yoga', meaning: '瑜伽', emoji: '🧘', imageId: 0, category: 'sport' },

  // —— 音乐 music (6) ——
  { id: 'w235', word: 'piano', meaning: '钢琴', emoji: '🎹', imageId: 0, category: 'music' },
  { id: 'w236', word: 'guitar', meaning: '吉他', emoji: '🎸', imageId: 0, category: 'music' },
  { id: 'w237', word: 'drum', meaning: '鼓', emoji: '🥁', imageId: 0, category: 'music' },
  { id: 'w238', word: 'violin', meaning: '小提琴', emoji: '🎻', imageId: 0, category: 'music' },
  { id: 'w239', word: 'trumpet', meaning: '小号', emoji: '🎺', imageId: 0, category: 'music' },
  { id: 'w240', word: 'mic', meaning: '麦克风', emoji: '🎤', imageId: 0, category: 'music' },

  // —— 服饰扩展 clothing ext (8) ——
  { id: 'w241', word: 'shirt', meaning: '衬衫', emoji: '👕', imageId: 0, category: 'clothing' },
  { id: 'w242', word: 'pants', meaning: '裤子', emoji: '👖', imageId: 0, category: 'clothing' },
  { id: 'w243', word: 'dress', meaning: '裙子', emoji: '👗', imageId: 0, category: 'clothing' },
  { id: 'w244', word: 'coat', meaning: '外套', emoji: '🧥', imageId: 0, category: 'clothing' },
  { id: 'w245', word: 'socks', meaning: '袜子', emoji: '🧦', imageId: 0, category: 'clothing' },
  { id: 'w246', word: 'glove', meaning: '手套', emoji: '🧤', imageId: 0, category: 'clothing' },
  { id: 'w247', word: 'glasses', meaning: '眼镜', emoji: '👓', imageId: 0, category: 'clothing' },
  { id: 'w248', word: 'scarf', meaning: '围巾', emoji: '🧣', imageId: 0, category: 'clothing' },

  // —— 家人扩展 family ext (8) ——
  { id: 'w249', word: 'baby', meaning: '宝宝', emoji: '👶', imageId: 0, category: 'family' },
  { id: 'w250', word: 'boy', meaning: '男孩', emoji: '👦', imageId: 0, category: 'family' },
  { id: 'w251', word: 'girl', meaning: '女孩', emoji: '👧', imageId: 0, category: 'family' },
  { id: 'w252', word: 'grandpa', meaning: '爷爷', emoji: '👴', imageId: 0, category: 'family' },
  { id: 'w253', word: 'grandma', meaning: '奶奶', emoji: '👵', imageId: 0, category: 'family' },
  { id: 'w254', word: 'brother', meaning: '哥哥', emoji: '🧒', imageId: 0, category: 'family' },
  { id: 'w255', word: 'family', meaning: '家庭', emoji: '👪', imageId: 0, category: 'family' },
  { id: 'w256', word: 'friend', meaning: '朋友', emoji: '🤝', imageId: 0, category: 'family' },

  // —— 情感 emotion (8) ——
  { id: 'w257', word: 'happy', meaning: '开心', emoji: '😀', imageId: 0, category: 'emotion' },
  { id: 'w258', word: 'sad', meaning: '难过', emoji: '😢', imageId: 0, category: 'emotion' },
  { id: 'w259', word: 'angry', meaning: '生气', emoji: '😠', imageId: 0, category: 'emotion' },
  { id: 'w260', word: 'laugh', meaning: '大笑', emoji: '😂', imageId: 0, category: 'emotion' },
  { id: 'w261', word: 'cry', meaning: '哭', emoji: '😭', imageId: 0, category: 'emotion' },
  { id: 'w262', word: 'smile', meaning: '微笑', emoji: '😊', imageId: 0, category: 'emotion' },
  { id: 'w263', word: 'surprise', meaning: '惊讶', emoji: '😲', imageId: 0, category: 'emotion' },
  { id: 'w264', word: 'sleepy', meaning: '困', emoji: '😴', imageId: 0, category: 'emotion' },

  // —— 动作 action (26) ——
  { id: 'w265', word: 'run', meaning: '跑', emoji: '🏃', imageId: 0, category: 'action' },
  { id: 'w266', word: 'walk', meaning: '走', emoji: '🚶', imageId: 0, category: 'action' },
  { id: 'w267', word: 'jump', meaning: '跳', emoji: '🤸', imageId: 0, category: 'action' },
  { id: 'w268', word: 'dance', meaning: '跳舞', emoji: '💃', imageId: 0, category: 'action' },
  { id: 'w269', word: 'sing', meaning: '唱歌', emoji: '🎙️', imageId: 0, category: 'action' },
  { id: 'w270', word: 'read', meaning: '读', emoji: '📚', imageId: 0, category: 'action' },
  { id: 'w271', word: 'write', meaning: '写', emoji: '✍️', imageId: 0, category: 'action' },
  { id: 'w272', word: 'eat', meaning: '吃', emoji: '🍽️', imageId: 0, category: 'action' },
  { id: 'w273', word: 'drink', meaning: '喝', emoji: '🍶', imageId: 0, category: 'action' },
  { id: 'w274', word: 'sleep', meaning: '睡觉', emoji: '💤', imageId: 0, category: 'action' },
  { id: 'w275', word: 'wake', meaning: '醒来', emoji: '🌅', imageId: 0, category: 'action' },
  { id: 'w276', word: 'play', meaning: '玩', emoji: '🎮', imageId: 0, category: 'action' },
  { id: 'w277', word: 'stand', meaning: '站', emoji: '🧍', imageId: 0, category: 'action' },
  { id: 'w278', word: 'climb', meaning: '爬', emoji: '🧗', imageId: 0, category: 'action' },
  { id: 'w279', word: 'ride', meaning: '骑', emoji: '🚴', imageId: 0, category: 'action' },
  { id: 'w280', word: 'cook', meaning: '做饭', emoji: '🍳', imageId: 0, category: 'action' },
  { id: 'w281', word: 'wash', meaning: '洗', emoji: '🧼', imageId: 0, category: 'action' },
  { id: 'w282', word: 'brush', meaning: '刷', emoji: '🪥', imageId: 0, category: 'action' },
  { id: 'w283', word: 'think', meaning: '思考', emoji: '🤔', imageId: 0, category: 'action' },
  { id: 'w284', word: 'listen', meaning: '听', emoji: '🎧', imageId: 0, category: 'action' },
  { id: 'w285', word: 'speak', meaning: '说', emoji: '🗣️', imageId: 0, category: 'action' },
  { id: 'w286', word: 'look', meaning: '看', emoji: '👀', imageId: 0, category: 'action' },
  { id: 'w287', word: 'hug', meaning: '拥抱', emoji: '🤗', imageId: 0, category: 'action' },
  { id: 'w288', word: 'kiss', meaning: '亲吻', emoji: '😘', imageId: 0, category: 'action' },
  { id: 'w289', word: 'wave', meaning: '挥手', emoji: '👋', imageId: 0, category: 'action' },
  { id: 'w290', word: 'swim', meaning: '游泳', emoji: '🏊', imageId: 0, category: 'action' },

  // —— 地点 place (8) ——
  { id: 'w291', word: 'school', meaning: '学校', emoji: '🏫', imageId: 0, category: 'place' },
  { id: 'w292', word: 'house', meaning: '房子', emoji: '🏠', imageId: 0, category: 'place' },
  { id: 'w293', word: 'park', meaning: '公园', emoji: '🏞️', imageId: 0, category: 'place' },
  { id: 'w294', word: 'hospital', meaning: '医院', emoji: '🏥', imageId: 0, category: 'place' },
  { id: 'w295', word: 'shop', meaning: '商店', emoji: '🏪', imageId: 0, category: 'place' },
  { id: 'w296', word: 'castle', meaning: '城堡', emoji: '🏰', imageId: 0, category: 'place' },
  { id: 'w297', word: 'beach', meaning: '海滩', emoji: '🏖️', imageId: 0, category: 'place' },
  { id: 'w298', word: 'bridge', meaning: '桥', emoji: '🌉', imageId: 0, category: 'place' },

  // —— 时间 time (2) ——
  { id: 'w299', word: 'day', meaning: '白天', emoji: '🌤️', imageId: 0, category: 'time' },
  { id: 'w300', word: 'night', meaning: '夜晚', emoji: '🌃', imageId: 0, category: 'time' },
];

export const WORDS: Word[] = RAW_WORDS.map((w) => {
  const ready = hasAudioFor(w.id);
  return {
    ...w,
    // 未配音的单词把 audio 置空，游戏页可据此跳过 InnerAudioContext，避免 readFile 报错
    audio: ready ? audioPath(w.id, w.word) : '',
    hasAudio: ready,
  };
});

/** 根据 category key 获取分类元数据；未匹配返回 undefined */
export const getCategoryMeta = (key: WordCategory): CategoryMeta | undefined =>
  CATEGORIES.find((c) => c.key === key);
