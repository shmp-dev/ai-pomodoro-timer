import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { TaskGeneration } from "./TaskGeneration";
import { ScheduleGeneration } from "./ScheduleGeneration";

export const PomodoroGenerator = (props) => {
    const { viewPomodoroTimer, setViewPomodoroTimer, scheduleList, setScheduleList } = props;
    const [openIndex, setOpenIndex] = useState([0]); // 開いているアコーディオンアイテムのインデックス
    const [targetText, setTargetText] = useState(''); // 目標
    const [isGenerateTask, setIsGenerateTask] = useState(false); // タスク作成状況
    const [taskList, setTaskList] = useState({}); // タスク
    const [isGenerateSchedule, setIsGenerateSchedule] = useState(false); // 作成状況

    return (
        <>
            { !viewPomodoroTimer && 
                <Accordion index={openIndex} onChange={setOpenIndex} allowMultiple >
                <AccordionItem>
                <h2>
                    <AccordionButton>
                    <Box as="span" flex='1' textAlign='left' fontSize={{ base:'lg', sm:'xl', md: '2xl' }}>
                        タスクを生成
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <TaskGeneration
                    targetText={targetText}
                    setTargetText={setTargetText}
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
                        <Box as="span" flex='1' textAlign='left' fontSize={{ base:'lg', sm:'xl', md: '2xl' }}>
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
                    setViewPomodoroTimer={setViewPomodoroTimer} 
                    isGenerateSchedule={isGenerateSchedule}
                    setIsGenerateSchedule={setIsGenerateSchedule}
                    />
                </AccordionPanel>
                </AccordionItem>
            </Accordion>
            }
        </>
    );

};