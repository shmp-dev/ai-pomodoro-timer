import React from 'react';
import { 
          Button,
          // Alert,
          // AlertIcon,
          // AlertDescription,
          Stack
        } from '@chakra-ui/react';
import { Timer } from './Timer';

// ポモドーロタイマーコンポーネント
export const PomodoroTimer = (props) => {
  const { scheduleList, viewPomodoroTimer, setViewPomodoroTimer } = props;
  // const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ
  // スケジュール作成
  // useEffect(() => {
  //   if (!viewPomodoroTimer) return;
  //   console.log(scheduleList);
  //   alert(scheduleList);
  // }, [viewPomodoroTimer]);

  return (
    <>
      { viewPomodoroTimer && 
        <Stack>
          {/* {errorMessage && (
            <Alert status="error">
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )} */}
          <Button onClick={() => setViewPomodoroTimer(false)}>生成画面へ戻る</Button> 
          {
            Object.keys(scheduleList).map(key => (
              <Timer 
                key={key}
                title={scheduleList[key].task}
                workDuration={scheduleList[key].schedule.workDuration}
                breakDuration={scheduleList[key].schedule.breakDuration}
                iterations={scheduleList[key].schedule.iterations}
              />
            )) 
          }
        </Stack>
      }
    </>
  );
}
