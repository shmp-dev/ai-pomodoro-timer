import React, { useState, useEffect } from 'react';
import { 
          Button,
          Text,
          VStack,
          useToast,
          Stack
        } from '@chakra-ui/react';

// タイマーコンポーネント
export const Timer = (props) => {
  const { title, workDuration, breakDuration, iterations } = props;

  // タイマーの分と秒、そしてタイマーが動作中かどうかを管理するための状態を定義します。
  const [minutes, setMinutes] = useState(workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // トースト（一時的な通知）を表示するためのフックを定義します。
  const toast = useToast();

  // useEffectフックを使用して、タイマーが動作中のときに毎秒更新を行うようにします。
  useEffect(() => {
    let interval = null;

    // タイマーが動作中であれば、以下の処理を毎秒行います。
    if (isRunning) {
        // 1秒ごとに処理を実行
        interval = setInterval(() => {
            // 秒が1以上であれば、1秒減らします。
            if (seconds > 0) {
            setSeconds(seconds - 1);
            }

            // 秒が0になったときの処理です。
            if (seconds === 0) {
            // 分も0になった場合、タイマーが終了したとみなします。
            if (minutes === 0) {
                clearInterval(interval);  // タイマーをクリアします。
                // トーストを表示してユーザーに通知します。
                toast({
                title: "Time's up!",
                description: "Take a short break.",
                status: "success",
                duration: 3000,
                isClosable: true,
                });
                // 短い休憩のタイマーをセットします。
                setMinutes(breakDuration);
                setSeconds(0);
            } else {
                // 分がまだ残っている場合、分を1減らし、秒を59にリセットします。
                setMinutes(minutes - 1);
                setSeconds(59);
            }
            } 
        }, 1000);
    } else if (!isRunning && minutes !== 0 && seconds !== 0) {
      // タイマーが停止している場合、タイマーをクリアします。
      clearInterval(interval);
    }

    // コンポーネントがアンマウントされたときにタイマーをクリアするクリーンアップ関数を定義します。
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, minutes, seconds, toast]);  // これらの状態が変化したときにeffectを再実行します。

  // タイマーの動作状態を切り替える関数を定（続き）義します。
  const toggleIsRunning = () => {
    setIsRunning(!isRunning);
  }

  return (
    <Stack> 
      <VStack p={'3'} border={'1px'} borderRadius={'lg'} spacing={10}>
        <Text fontSize={'2xl'}>{title}</Text>
        <Text fontSize="6xl">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
        <Text>反復回数：{iterations}</Text>
        <Button onClick={toggleIsRunning}>{isRunning ? 'Pause' : 'Start'}</Button>
      </VStack>
    </Stack>
  );
}
