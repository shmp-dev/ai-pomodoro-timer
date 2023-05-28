import React, { useState, useEffect } from 'react';
import { 
          Button,
          Text,
          VStack,
          useToast,
          Stack,
          Spacer,
          HStack,
          Card,
          CardBody,
          CardHeader
        } from '@chakra-ui/react';

// タイマーコンポーネント
export const Timer = (props) => {
  const { title, workDuration, breakDuration, iterations } = props;
  
  const [minutes, setMinutes] = useState(workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);
  const [currentIteration, setCurrentIteration] = useState(1);
  
  const toast = useToast();
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
        interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    toast({
                      title: "時間です!",
                      description: isWorkPeriod ? "休憩を取りましょう。" : "仕事に戻りましょう。",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });

                    // 休憩時間に移行
                    if (isWorkPeriod) {
                      setMinutes(breakDuration);
                      setSeconds(0);
                      setIsWorkPeriod(false);
                    } else {
                      if (currentIteration === iterations) {
                        // 全て終了
                        toast({
                          title: "終了です!",
                          description: "次のセッションに進みましょう。",
                          status: "success",
                          duration: 10000,
                          isClosable: true,
                        });
                        setIsRunning(false);
                      } else {
                        setMinutes(workDuration);
                        setSeconds(0);
                        setIsWorkPeriod(true);
                        setCurrentIteration(currentIteration + 1);
                      }
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000);
    } else if (!isRunning && minutes !== 0 && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isWorkPeriod, minutes, seconds, toast, workDuration, breakDuration, currentIteration, iterations]);
  
  const toggleIsRunning = () => {
    setIsRunning(!isRunning);
  }  

  const resetTimer = () => {
    setMinutes(workDuration);
    setSeconds(0);
    setIsRunning(false);
    setIsWorkPeriod(true);
    setCurrentIteration(1);
  } 

  return (
    <Card> 
      <CardBody>
        <VStack>
          <CardHeader fontSize={'2xl'}>
            <Text>{title}</Text>
          </CardHeader>
          {!isWorkPeriod && <Text>（休憩時間）</Text>}
          <Text fontSize="6xl">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
          <Text>反復回数：{currentIteration}/{iterations}</Text>
          <Spacer />
          <CardHeader>
            <HStack>
              <Button onClick={toggleIsRunning}>{isRunning ? 'Pause' : 'Start'}</Button>
              <Button onClick={resetTimer}>Reset</Button> 
            </HStack>
          </CardHeader>
        </VStack>
      </CardBody>
    </Card>
  );
}
