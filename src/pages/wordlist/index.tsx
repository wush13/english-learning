import React, { useMemo, useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classnames from 'classnames';
import { WORDS, CATEGORIES, getCategoryMeta } from '@/data/words';
import { Word, WordStatus, WordCategory, CategoryMeta } from '@/types/word';
import { useWordStore } from '@/store/wordStore';
import styles from './index.module.scss';

/** 特殊值：表示"全部"分类（不过滤） */
const ALL_CATEGORY = 'all' as const;
type CategoryFilter = WordCategory | typeof ALL_CATEGORY;

const WordListPage: React.FC = () => {
  const router = useRouter();
  const type = (router.params?.type as WordStatus) || 'correct';
  const results = useWordStore((s) => s.results);

  /** 当前筛选的分类（仅在已会 tab 显示） */
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(ALL_CATEGORY);

  /** 当前 tab 下的所有单词（不含分类筛选） */
  const allWords: Word[] = useMemo(() => {
    const ids = Object.entries(results)
      .filter(([, status]) => status === type)
      .map(([id]) => id);
    return WORDS.filter((w) => ids.includes(w.id));
  }, [results, type]);

  /** 计算当前 tab 下有哪些分类（按 CATEGORIES 顺序），并统计每个分类的词数 */
  const availableCategories: Array<CategoryMeta & { count: number }> = useMemo(() => {
    const counter = new Map<WordCategory, number>();
    allWords.forEach((w) => {
      counter.set(w.category, (counter.get(w.category) || 0) + 1);
    });
    return CATEGORIES.filter((c) => counter.has(c.key)).map((c) => ({
      ...c,
      count: counter.get(c.key)!,
    }));
  }, [allWords]);

  /** 根据筛选条件得到最终展示的单词列表 */
  const wordList: Word[] = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return allWords;
    return allWords.filter((w) => w.category === activeCategory);
  }, [allWords, activeCategory]);

  /** 切换 tab 时重置分类筛选；清理已不存在的分类 */
  useEffect(() => {
    if (
      activeCategory !== ALL_CATEGORY &&
      !availableCategories.find((c) => c.key === activeCategory)
    ) {
      setActiveCategory(ALL_CATEGORY);
    }
  }, [availableCategories, activeCategory]);

  const pageConfig = useMemo(() => {
    if (type === 'correct') {
      return {
        title: '已经会的',
        emoji: '🎉',
        desc: `太棒啦！你已经掌握 ${allWords.length} 个单词`,
        containerClass: styles.containerCorrect,
        playBoxClass: styles.playIconBoxCorrect,
        emptyEmoji: '🌱',
        emptyText: '还没有已经会的单词哦\n快去小游戏中挑战几道题吧！',
      };
    }
    return {
      title: '错题本',
      emoji: '💪',
      desc: `再来复习 ${allWords.length} 个单词吧`,
      containerClass: styles.containerWrong,
      playBoxClass: styles.playIconBoxWrong,
      emptyEmoji: '🌟',
      emptyText: '太厉害啦！\n暂时没有错题哦～',
    };
  }, [type, allWords.length]);

  // 动态设置导航栏标题
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: pageConfig.title }).catch((e) => {
      console.error('[WordList] setNavigationBarTitle error:', e);
    });
  }, [pageConfig.title]);

  const handleWordClick = (wordId: string) => {
    console.log('[WordList] click word:', wordId);
    Taro.reLaunch({
      url: `/pages/game/index?wordId=${wordId}`,
    });
  };

  const handleGoGame = () => {
    Taro.switchTab({ url: '/pages/game/index' });
  };

  /** 当前分类筛选下的副标题文案 */
  const filterHint = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return null;
    const meta = getCategoryMeta(activeCategory);
    if (!meta) return null;
    return `${meta.emoji} ${meta.label} · ${wordList.length} 个`;
  }, [activeCategory, wordList.length]);

  return (
    <View className={classnames(styles.container, pageConfig.containerClass)}>
      <View className={styles.header}>
        <Text className={styles.headerEmoji}>{pageConfig.emoji}</Text>
        <Text className={styles.headerTitle}>{pageConfig.title}</Text>
        <Text className={styles.headerDesc}>{pageConfig.desc}</Text>
      </View>

      {/* 分类筛选 Pills（有数据时才显示） */}
      {availableCategories.length > 0 && (
        <ScrollView
          scrollX
          enableFlex
          className={styles.categoryBar}
          showScrollbar={false}
        >
          <View className={styles.categoryBarInner}>
            <View
              className={classnames(
                styles.categoryPill,
                activeCategory === ALL_CATEGORY && styles.categoryPillActive,
              )}
              onClick={() => setActiveCategory(ALL_CATEGORY)}
            >
              <Text className={styles.categoryPillText}>全部 {allWords.length}</Text>
            </View>
            {availableCategories.map((cat) => (
              <View
                key={cat.key}
                className={classnames(
                  styles.categoryPill,
                  activeCategory === cat.key && styles.categoryPillActive,
                )}
                onClick={() => setActiveCategory(cat.key)}
              >
                <Text className={styles.categoryPillText}>
                  {cat.emoji} {cat.label} {cat.count}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {filterHint && (
        <View className={styles.filterHint}>
          <Text className={styles.filterHintText}>{filterHint}</Text>
        </View>
      )}

      {allWords.length === 0 ? (
        <View className={styles.emptyState}>
          <Text className={styles.emptyEmoji}>{pageConfig.emptyEmoji}</Text>
          <Text className={styles.emptyText}>{pageConfig.emptyText}</Text>
          <Button className={styles.emptyBtn} onClick={handleGoGame} hoverClass='none'>
            去玩小游戏
          </Button>
        </View>
      ) : (
        <View className={styles.wordList}>
          {wordList.map((w) => (
            <View
              key={w.id}
              className={styles.wordCard}
              onClick={() => handleWordClick(w.id)}
            >
              <View className={styles.wordEmoji}>
                <Text className={styles.wordEmojiText}>{w.emoji}</Text>
              </View>
              <View className={styles.wordInfo}>
                <Text className={styles.wordText}>{w.word}</Text>
                <Text className={styles.wordMeaning}>{w.meaning}</Text>
              </View>
              <View className={classnames(styles.playIconBox, pageConfig.playBoxClass)}>
                <Text className={styles.playIcon}>▶</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default WordListPage;
