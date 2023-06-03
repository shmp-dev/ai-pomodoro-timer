import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Container,
  Spacer,
  Stack,
  HStack
} from '@chakra-ui/react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { PomodoroGenerator } from './components/PomodoroGenerator';
import { TutorialButton } from './components/TutorialButton';

const App = () => {
  const [scheduleList, setScheduleList] = useState({}); // スケジュール
  const [viewPomodoroTimer, setViewPomodoroTimer] = useState(false); // スケジュール作成状況

  return (
    <ChakraProvider theme={theme}>
      <Box px={'10'} bgColor={'gray.100'}>
        <Container maxW={'1000px'} p={'5'} bgColor={'white'} minHeight="100vh">
          <Stack>
            <HStack justifyContent={'space-between'}>
              <Heading>AI ポモドーロ・タイマー</Heading>
              <TutorialButton />
            </HStack>
            <Spacer />
            <PomodoroGenerator 
              scheduleList={scheduleList}
              setScheduleList={setScheduleList}
              viewPomodoroTimer={viewPomodoroTimer}
              setViewPomodoroTimer={setViewPomodoroTimer}
            />
            <PomodoroTimer
              scheduleList={scheduleList}
              viewPomodoroTimer={viewPomodoroTimer}
              setViewPomodoroTimer={setViewPomodoroTimer}
            />
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
