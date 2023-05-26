import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Flex,
  Spacer,
  Container
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import CountdownTimer from './components/CountdownTimer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box width={'100%'} bgColor={'gray.100'}>
        <Container width={'80%'} p={'5'} bgColor={'white'}>
          <Flex>
            <Heading>AI ポモドーロ・タイマー</Heading>
            <Spacer></Spacer>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
          <CountdownTimer></CountdownTimer>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
