import React, { useState, useEffect } from 'react';
import { 
  Button,
  Stack,
  Text,
  List,
  ListItem,
  HStack,
  Spacer
} from '@chakra-ui/react';
import { Timer } from './Timer';

export const PomodoroTimer = (props) => {
  const { scheduleList, viewPomodoroTimer, setViewPomodoroTimer } = props;
  const scheduleKeys = Object.keys(scheduleList);
  const [selectedTimerKey, setSelectedTimerKey] = useState(scheduleKeys[0]);
  
  useEffect(() => {
    // scheduleListが更新されたときに実行
    const newScheduleKeys = Object.keys(scheduleList);
    setSelectedTimerKey(newScheduleKeys[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleList]);
  
  const selectNextTimer = () => {
    const currentIndex = scheduleKeys.indexOf(selectedTimerKey);
    const nextIndex = currentIndex + 1;
    setSelectedTimerKey(scheduleKeys[nextIndex]);
  };

  const selectPreviousTimer = () => {
    const currentIndex = scheduleKeys.indexOf(selectedTimerKey);
    const prevIndex = currentIndex - 1;
    setSelectedTimerKey(scheduleKeys[prevIndex]);
  };

  const currentIndex = scheduleKeys.indexOf(selectedTimerKey);

  return (
    <>
      { viewPomodoroTimer && 
        <Stack>
          <Timer 
            key={selectedTimerKey}
            title={scheduleList[selectedTimerKey].task}
            workDuration={scheduleList[selectedTimerKey].schedule.workDuration}
            breakDuration={scheduleList[selectedTimerKey].schedule.breakDuration}
            iterations={scheduleList[selectedTimerKey].schedule.iterations}
          />
          <HStack width="100%">
            {currentIndex > 0 && <Button onClick={selectPreviousTimer}>＜</Button>}
            <Spacer />
            {currentIndex < scheduleKeys.length - 1 && <Button onClick={selectNextTimer}>＞</Button>}
          </HStack>
          <List>
            { Object.keys(scheduleList).map(key => (
              <ListItem key={key} paddingBottom={'3'}>
                <Text fontSize={'xl'}>＜{key}＞</Text>
                <Text>セッション名: {scheduleList[key].task}</Text>
                <Text>時間: {scheduleList[key].schedule.workDuration}</Text>
                <Text>休憩時間: {scheduleList[key].schedule.breakDuration}</Text>
                <Text>反復回数: {scheduleList[key].schedule.iterations}</Text>
                </ListItem>
            )) }
          </List>
          <Button onClick={() => setViewPomodoroTimer(false)}>生成画面へ戻る</Button> 
        </Stack>
      }
    </>
  );
}
