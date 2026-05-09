import React, { useEffect } from 'react';
import Taro, { useDidShow, useDidHide } from '@tarojs/taro';
import { CLOUD_ENV_ID } from '@/data/words';
// 全局样式
import './app.scss';

// 初始化微信云开发：用于播放云存储中的单词音频
// 仅微信小程序环境支持，并需要在 project.config.json 开启 cloud
if (process.env.TARO_ENV === 'weapp') {
  try {
    // @ts-ignore Taro.cloud 在 weapp 下可用
    if (Taro.cloud && typeof Taro.cloud.init === 'function') {
      // @ts-ignore
      Taro.cloud.init({ env: CLOUD_ENV_ID, traceUser: true });
    }
  } catch (err) {
    console.error('[App] cloud init error:', err);
  }
}

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return props.children;
}

export default App;
