import React, { useState, useEffect } from 'react';
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
import { useCookies } from "react-cookie";
import { PomodoroTimer } from './components/PomodoroTimer';
import { PomodoroGenerator } from './components/PomodoroGenerator';
import { TutorialButton } from './components/TutorialButton';

const App = () => {
  const [cookies, setCookie] = useCookies(['visited']); // クッキー
  const [scheduleList, setScheduleList] = useState({}); // スケジュール
  const [viewPomodoroTimer, setViewPomodoroTimer] = useState(false); // スケジュール作成状況

  // クッキーの設定
  useEffect(() => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 14); // 2週間後に有効期限を設定
    setCookie('visited', true, { expires: expires }); // クッキーを作成
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box px={{ base:'0', sm:'4', md:'8', lg:'10' }} bgColor={'gray.100'}>
        <Container maxW={'1000px'} p={'5'} bgColor={'white'} minHeight="100vh">
          <Stack>
            <HStack justifyContent={'space-between'}>
              <Heading as={'h1'} size={{ base:'md', sm:'lg', md: 'xl' }}>AI ポモドーロ・タイマー</Heading>
              <TutorialButton visited={cookies.visited} />
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
