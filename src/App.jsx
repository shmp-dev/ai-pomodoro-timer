import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Container,
  Spacer,
  Stack
} from '@chakra-ui/react';
import PomodoroTimer from './components/PomodoroTimer';
import { TaskGeneration } from './components/TaskGeneration';
import { ScheduleGeneration } from './components/ScheduleGeneration';
// import { InputApiKey } from './components/InputApiKey'

const App = () => {
  const [isGenerateTask, setIsGenerateTask] = useState(false); // タスク作成状況
  const [taskList, setTaskList] = useState({}); // タスク

  return (
    <ChakraProvider theme={theme}>
      <Box width={'100%'} bgColor={'gray.100'}>
        <Container width={'80%'} p={'5'} bgColor={'white'} minHeight="100vh">
          <Stack>
            <Heading>AI ポモドーロ・タイマー</Heading>
            {/* <Spacer />
            <InputApiKey /> */}
            <Spacer />
            <TaskGeneration
              setIsGenerateTask={setIsGenerateTask} 
              taskList={taskList}
              setTaskList={setTaskList}
            />
            <Spacer />
            { isGenerateTask && 
              <ScheduleGeneration
                taskList={taskList}
              />
            }
            <PomodoroTimer />
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
