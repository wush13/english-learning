// 单词类型定义
export interface Word {
  /** 单词 id */
  id: string;
  /** 英文单词 */
  word: string;
  /** 中文释义 */
  meaning: string;
  /** emoji 表示（与 word 对应） */
  emoji: string;
  /** 图片关键词，用于从 picsum 获取图片 ID */
  imageId: number;
  /** 音频文件路径（相对 dist 根目录，如 /assets/audio/001_apple.mp3）；未配音的单词为空字符串 */
  audio: string;
  /** 是否已有可播放的本地 mp3 音频 */
  hasAudio: boolean;
  /** 分类 key（与 CATEGORIES 中的 key 对应） */
  category: WordCategory;
}

/** 答题结果类型：correct 已会，wrong 错题 */
export type WordStatus = 'correct' | 'wrong';

/** 分类 key 联合类型 */
export type WordCategory =
  | 'fruit'
  | 'vegetable'
  | 'food'
  | 'animal'
  | 'bird'
  | 'insect'
  | 'sea'
  | 'body'
  | 'color'
  | 'number'
  | 'shape'
  | 'vehicle'
  | 'home'
  | 'nature'
  | 'weather'
  | 'study'
  | 'toy'
  | 'sport'
  | 'music'
  | 'clothing'
  | 'family'
  | 'emotion'
  | 'action'
  | 'place'
  | 'time';

/** 分类元数据 */
export interface CategoryMeta {
  key: WordCategory;
  label: string;
  emoji: string;
}
