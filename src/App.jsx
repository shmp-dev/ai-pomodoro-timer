import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Container,
  Spacer,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import PomodoroTimer from './components/PomodoroTimer';
import { TaskGeneration } from './components/TaskGeneration';
import { ScheduleGeneration } from './components/ScheduleGeneration';
// import { InputApiKey } from './components/InputApiKey'

const App = () => {
  const [openIndex, setOpenIndex] = useState([0]); // 開いているアコーディオンアイテムのインデックス
  const [isGenerateTask, setIsGenerateTask] = useState(false); // タスク作成状況
  const [taskList, setTaskList] = useState({}); // タスク
  const [scheduleList, setScheduleList] = useState({}); // スケジュール
  const [isGenerateSchedule, setIsGenerateSchedule] = useState(false); // スケジュール作成状況

  return (
    <ChakraProvider theme={theme}>
      <Box width={'100%'} bgColor={'gray.100'}>
        <Container width={'80%'} p={'5'} bgColor={'white'} minHeight="100vh">
          <Stack>
            <Heading>AI ポモドーロ・タイマー</Heading>
            {/* <Spacer />
            <InputApiKey /> */}
            <Spacer />
            <Accordion index={openIndex} onChange={setOpenIndex} allowMultiple >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontSize={'2xl'}>
                      タスクを生成
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TaskGeneration
                    setIsGenerateTask={setIsGenerateTask} 
                    taskList={taskList}
                    setTaskList={setTaskList}
                    setOpenIndex={setOpenIndex}
                    setScheduleList={setScheduleList}
                  />
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem isDisabled={!isGenerateTask}>
                <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontSize={'2xl'}>
                        ポモドーロ・スケジュールを作成
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ScheduleGeneration
                    taskList={taskList}
                    scheduleList={scheduleList}
                    setScheduleList={setScheduleList}
                    setOpenIndex={setOpenIndex}
                  />
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem isDisabled={!isGenerateSchedule}>
                <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontSize={'2xl'}>
                        ポモドーロ・タイマー
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <PomodoroTimer />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
