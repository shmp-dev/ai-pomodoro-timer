import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Container,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { PomodoroTimer } from './components/PomodoroTimer';
import { PomodoroGenerator } from './components/PomodoroGenerator';
// import { InputApiKey } from './components/InputApiKey'

const App = () => {
  const [scheduleList, setScheduleList] = useState({}); // スケジュール
  const [viewPomodoroTimer, setViewPomodoroTimer] = useState(false); // スケジュール作成状況

  return (
    <ChakraProvider theme={theme}>
      <Box width={'100%'} bgColor={'gray.100'}>
        <Container width={'80%'} p={'5'} bgColor={'white'} minHeight="100vh">
          <Stack>
            <Heading>AI ポモドーロ・タイマー</Heading>
            {/* <Spacer />
            <InputApiKey /> */}
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
