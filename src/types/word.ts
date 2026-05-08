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
  /** 音频文件路径（相对 dist 根目录，如 /assets/audio/001_apple.mp3） */
  audio: string;
}

/** 答题结果类型：correct 已会，wrong 错题 */
export type WordStatus = 'correct' | 'wrong';
