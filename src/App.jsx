import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Container,
  Spacer
} from '@chakra-ui/react';
import PomodoroTimer from './components/PomodoroTimer';
import { TaskGeneration } from './components/TaskGeneration';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box width={'100%'} bgColor={'gray.100'}>
        <Container width={'80%'} p={'5'} bgColor={'white'} minHeight="100vh">
          <Heading>AI ポモドーロ・タイマー</Heading>
          <Spacer />
          <TaskGeneration />
          <PomodoroTimer />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
