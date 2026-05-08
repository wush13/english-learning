import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import { WORDS } from '@/data/words';
import { Word } from '@/types/word';
import { useWordStore } from '@/store/wordStore';
import styles from './index.module.scss';

interface QuestionState {
  word: Word;
  /** 2 张选项（一张正确，一张干扰） */
  options: Word[];
  /** 正确答案在选项中的索引 */
  correctIndex: number;
}

/** 生成一道题：从单词表中挑选目标词 + 一个干扰项 */
const buildQuestion = (targetId?: string): QuestionState => {
  const target =
    (targetId && WORDS.find((w) => w.id === targetId)) ||
    WORDS[Math.floor(Math.random() * WORDS.length)];

  // 挑一个不等于 target 的干扰项
  const distractors = WORDS.filter((w) => w.id !== target.id);
  const distractor = distractors[Math.floor(Math.random() * distractors.length)];

  // 随机决定正确答案在左还是右
  const correctIndex = Math.random() < 0.5 ? 0 : 1;
  const options: Word[] = correctIndex === 0 ? [target, distractor] : [distractor, target];

  return { word: target, options, correctIndex };
};

type Feedback = 'correct' | 'wrong' | null;

const GamePage: React.FC = () => {
  const router = useRouter();
  const recordResult = useWordStore((s) => s.recordResult);

  const [question, setQuestion] = useState<QuestionState>(() => buildQuestion());
  const [feedback, setFeedback] = useState<Feedback>(null);
  /** 被点击的选项索引（用于高亮） */
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // 发音：播放单词对应的本地 mp3 音频
  // 音频位于 src/assets/audio/，构建时会被 copy 到 dist/assets/audio/
  // InnerAudioContext 通过相对路径（如 /assets/audio/001_apple.mp3）即可播放
  const audioCtxRef = useRef<Taro.InnerAudioContext | null>(null);

  // 组件卸载时销毁 audio 上下文，防止内存泄漏
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.destroy();
        } catch (err) {
          console.error('[Game] destroy audio error:', err);
        }
        audioCtxRef.current = null;
      }
    };
  }, []);

  const speak = useCallback((word: Word) => {
    console.log('[Game] speak:', word.word, word.audio);
    try {
      // 每次播放前销毁旧实例（避免同时播放多个音频）
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.stop();
          audioCtxRef.current.destroy();
        } catch (err) {
          console.error('[Game] recycle audio error:', err);
        }
      }
      const audio = Taro.createInnerAudioContext();
      audio.src = word.audio;
      audio.onError((err) => {
        console.error('[Game] audio onError:', word.audio, err);
        // 音频播放失败时用 Toast + 震动作为兜底提示
        Taro.showToast({ title: `🔊 ${word.word}`, icon: 'none', duration: 800 });
        Taro.vibrateShort({ type: 'light' }).catch(() => {});
      });
      audio.play();
      audioCtxRef.current = audio;
    } catch (err) {
      console.error('[Game] speak exception:', err);
      Taro.showToast({ title: `🔊 ${word.word}`, icon: 'none', duration: 800 });
    }
  }, []);

  // 自动发音
  useEffect(() => {
    if (question?.word && !feedback) {
      const timer = setTimeout(() => speak(question.word), 300);
      return () => clearTimeout(timer);
    }
  }, [question, feedback, speak]);

  // 处理从单词本点进来的情况：携带 wordId
  useDidShow(() => {
    const wordId = router.params?.wordId;
    if (wordId && wordId !== question.word.id) {
      console.log('[Game] useDidShow wordId:', wordId);
      setQuestion(buildQuestion(wordId));
      setFeedback(null);
      setSelectedIndex(null);
    }
  });

  const handleChoose = (idx: number) => {
    if (feedback) return; // 已经选过
    setSelectedIndex(idx);
    const isCorrect = idx === question.correctIndex;
    setTotalCount((c) => c + 1);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }
    recordResult(question.word.id, isCorrect ? 'correct' : 'wrong');
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const handleNext = () => {
    setQuestion(buildQuestion());
    setFeedback(null);
    setSelectedIndex(null);
  };

  const handlePronounce = () => {
    speak(question.word);
  };

  const getImgBoxClass = (idx: number) => {
    if (selectedIndex === null) return styles.imgBox;
    if (idx === selectedIndex) {
      return classnames(
        styles.imgBox,
        feedback === 'correct' && styles.imgBoxCorrect,
        feedback === 'wrong' && styles.imgBoxWrong
      );
    }
    // 答错时高亮显示正确答案
    if (feedback === 'wrong' && idx === question.correctIndex) {
      return classnames(styles.imgBox, styles.imgBoxCorrect);
    }
    return styles.imgBox;
  };

  const progressText = useMemo(
    () => `第 ${totalCount + (feedback ? 0 : 1)} 题`,
    [totalCount, feedback]
  );

  return (
    <View className={styles.container}>
      {/* 顶部进度 + 分数 */}
      <View className={styles.progressBar}>
        <Text className={styles.progressText}>{progressText}</Text>
        <View className={styles.scoreBox}>
          <Text className={styles.scoreEmoji}>⭐</Text>
          <Text className={styles.scoreText}>
            {correctCount} / {totalCount}
          </Text>
        </View>
      </View>

      {/* 单词区域 */}
      <View className={styles.wordSection}>
        <Text className={styles.word}>{question.word.word}</Text>
        <Button className={styles.pronounceBtn} onClick={handlePronounce} hoverClass='none'>
          <Text className={styles.pronounceIcon}>🔊</Text>
          <Text className={styles.pronounceText}>点我发音</Text>
        </Button>
      </View>

      <Text className={styles.tipText}>请选择正确的图片 👇</Text>

      {/* 图片选择区 */}
      <View className={styles.imgContainer}>
        {question.options.map((opt, idx) => (
          <View
            key={`${question.word.id}-${opt.id}-${idx}`}
            className={getImgBoxClass(idx)}
            onClick={() => handleChoose(idx)}
          >
            <Text className={styles.imgEmoji}>{opt.emoji}</Text>
          </View>
        ))}
      </View>

      {/* 反馈弹层 */}
      {feedback && (
        <View className={styles.feedbackMask}>
          <View className={styles.feedbackCard}>
            <Text className={styles.feedbackEmoji}>
              {feedback === 'correct' ? '👸' : '😭'}
            </Text>
            <Text
              className={classnames(
                styles.feedbackTitle,
                feedback === 'correct' ? styles.feedbackTitleCorrect : styles.feedbackTitleWrong
              )}
            >
              {feedback === 'correct' ? '你答对啦！' : '你答错了哦'}
            </Text>
            <Text className={styles.feedbackDesc}>
              {feedback === 'correct'
                ? `艾莎公主为你鼓掌 ❄️\n${question.word.word} - ${question.word.meaning}`
                : `安娜公主有点难过\n正确答案是：${question.word.word} (${question.word.meaning})`}
            </Text>
            <Button className={styles.nextBtn} onClick={handleNext} hoverClass='none'>
              下一题 →
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default GamePage;
