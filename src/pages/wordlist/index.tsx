import React, { useMemo, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classnames from 'classnames';
import { WORDS } from '@/data/words';
import { Word, WordStatus } from '@/types/word';
import { useWordStore } from '@/store/wordStore';
import styles from './index.module.scss';

const WordListPage: React.FC = () => {
  const router = useRouter();
  const type = (router.params?.type as WordStatus) || 'correct';
  const results = useWordStore((s) => s.results);

  const wordList: Word[] = useMemo(() => {
    const ids = Object.entries(results)
      .filter(([, status]) => status === type)
      .map(([id]) => id);
    return WORDS.filter((w) => ids.includes(w.id));
  }, [results, type]);

  const pageConfig = useMemo(() => {
    if (type === 'correct') {
      return {
        title: '已经会的',
        emoji: '🎉',
        desc: `太棒啦！你已经掌握 ${wordList.length} 个单词`,
        containerClass: styles.containerCorrect,
        playBoxClass: styles.playIconBoxCorrect,
        emptyEmoji: '🌱',
        emptyText: '还没有已经会的单词哦\n快去小游戏中挑战几道题吧！',
      };
    }
    return {
      title: '错题本',
      emoji: '💪',
      desc: `再来复习 ${wordList.length} 个单词吧`,
      containerClass: styles.containerWrong,
      playBoxClass: styles.playIconBoxWrong,
      emptyEmoji: '🌟',
      emptyText: '太厉害啦！\n暂时没有错题哦～',
    };
  }, [type, wordList.length]);

  // 动态设置导航栏标题
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: pageConfig.title }).catch((e) => {
      console.error('[WordList] setNavigationBarTitle error:', e);
    });
  }, [pageConfig.title]);

  const handleWordClick = (wordId: string) => {
    console.log('[WordList] click word:', wordId);
    // 跳转到小游戏 tabBar 页面，并带上 wordId
    // switchTab 无法传参，改用 reLaunch
    Taro.reLaunch({
      url: `/pages/game/index?wordId=${wordId}`,
    });
  };

  const handleGoGame = () => {
    Taro.switchTab({ url: '/pages/game/index' });
  };

  return (
    <View className={classnames(styles.container, pageConfig.containerClass)}>
      <View className={styles.header}>
        <Text className={styles.headerEmoji}>{pageConfig.emoji}</Text>
        <Text className={styles.headerTitle}>{pageConfig.title}</Text>
        <Text className={styles.headerDesc}>{pageConfig.desc}</Text>
      </View>

      {wordList.length === 0 ? (
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
