import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Taro from '@tarojs/taro';
import { WordStatus } from '@/types/word';

/**
 * Taro storage adapter for zustand persist
 */
const taroStorage = {
  getItem: (name: string) => {
    try {
      const value = Taro.getStorageSync(name);
      return value || null;
    } catch (e) {
      console.error('[WordStore] getItem error:', e);
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      Taro.setStorageSync(name, value);
    } catch (e) {
      console.error('[WordStore] setItem error:', e);
    }
  },
  removeItem: (name: string) => {
    try {
      Taro.removeStorageSync(name);
    } catch (e) {
      console.error('[WordStore] removeItem error:', e);
    }
  },
};

interface WordStoreState {
  /** wordId -> 最新状态（'correct' | 'wrong'） */
  results: Record<string, WordStatus>;
  /** 记录一次答题结果（以最新一次为准） */
  recordResult: (wordId: string, status: WordStatus) => void;
  /** 重置所有记录 */
  resetAll: () => void;
}

export const useWordStore = create<WordStoreState>()(
  persist(
    (set) => ({
      results: {},
      recordResult: (wordId, status) => {
        console.log('[WordStore] recordResult:', wordId, status);
        set((state) => ({
          results: { ...state.results, [wordId]: status },
        }));
      },
      resetAll: () => {
        console.log('[WordStore] resetAll');
        set({ results: {} });
      },
    }),
    {
      name: 'english_word_results',
      storage: createJSONStorage(() => taroStorage),
    }
  )
);
