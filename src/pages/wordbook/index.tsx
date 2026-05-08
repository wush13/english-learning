import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import { useWordStore } from '@/store/wordStore';
import styles from './index.module.scss';

const WordbookPage: React.FC = () => {
  const results = useWordStore((s) => s.results);

  // useDidShow 保证从 game 页回来时数据会刷新（zustand 状态已同步）
  useDidShow(() => {
    console.log('[Wordbook] show, results count:', Object.keys(results).length);
  });

  const { correctCount, wrongCount } = useMemo(() => {
    let c = 0;
    let w = 0;
    Object.values(results).forEach((status) => {
      if (status === 'correct') c += 1;
      else if (status === 'wrong') w += 1;
    });
    return { correctCount: c, wrongCount: w };
  }, [results]);

  const handleNavigate = (type: 'correct' | 'wrong') => {
    console.log('[Wordbook] navigate to wordlist:', type);
    Taro.navigateTo({
      url: `/pages/wordlist/index?type=${type}`,
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerEmoji}>📚</Text>
        <Text className={styles.headerTitle}>我的单词本</Text>
        <Text className={styles.headerDesc}>记录你的学习成果</Text>
      </View>

      {/* 统计数据 */}
      <View className={styles.statsRow}>
        <View className={styles.statCard}>
          <Text className={classnames(styles.statNumber, styles.statNumberCorrect)}>
            {correctCount}
          </Text>
          <Text className={styles.statLabel}>已经会的</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={classnames(styles.statNumber, styles.statNumberWrong)}>
            {wrongCount}
          </Text>
          <Text className={styles.statLabel}>错题数</Text>
        </View>
      </View>

      {/* 入口卡片 */}
      <View className={styles.entryList}>
        <View className={styles.entryCard} onClick={() => handleNavigate('correct')}>
          <View className={classnames(styles.entryIconBox, styles.entryIconBoxCorrect)}>
            <Text className={styles.entryIcon}>✅</Text>
          </View>
          <View className={styles.entryInfo}>
            <Text className={styles.entryTitle}>已经会的</Text>
            <Text className={styles.entrySubtitle}>共 {correctCount} 个单词 · 点击查看</Text>
          </View>
          <Text className={styles.entryArrow}>›</Text>
        </View>

        <View className={styles.entryCard} onClick={() => handleNavigate('wrong')}>
          <View className={classnames(styles.entryIconBox, styles.entryIconBoxWrong)}>
            <Text className={styles.entryIcon}>📝</Text>
          </View>
          <View className={styles.entryInfo}>
            <Text className={styles.entryTitle}>错题本</Text>
            <Text className={styles.entrySubtitle}>共 {wrongCount} 个单词 · 点击复习</Text>
          </View>
          <Text className={styles.entryArrow}>›</Text>
        </View>
      </View>

      <View className={styles.encourageCard}>
        <Text className={styles.encourageEmoji}>🌟</Text>
        <Text className={styles.encourageText}>
          每天练习一点点，你会越来越棒哦！继续加油 💪
        </Text>
      </View>
    </View>
  );
};

export default WordbookPage;
