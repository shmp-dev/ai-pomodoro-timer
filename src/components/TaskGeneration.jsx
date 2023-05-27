import React, { useState } from 'react';
import { Textarea, Text, Button, Box, OrderedList, ListItem, AlertTitle } from '@chakra-ui/react';
import axios from 'axios';

export const TaskGeneration = () =>  {
    const [targetText, setTargetText] = useState('');
    const [taskList, setTaskList] = useState(['hoge', 'fuga', 'piyo']);
    const [resText, setResText] = useState('');

    const API_KEY = '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';
    const URL = "https://api.openai.com/v1/chat/completions";

    const generateTask = () => {
        async function getResponse() {
            try {
                const response = await axios.post(
                    URL,
                    {
                        "model": "gpt-3.5-turbo",
                        "messages": [
                            { "role": "user", "content": targetText }
                        ]
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${API_KEY}`,
                        },
                    }
                );
                var chatgpt_response = response.data.choices[0].message.content;
                setResText(chatgpt_response);
            } catch (error) {
                console.log(error);
            }
        }
        getResponse();
    }

    return (
        <Box>
            <Text fontSize={'2xl'}>タスクを生成</Text>
            <Textarea 
                placeholder='目標を入力'
                value={targetText}
                onChange={(event) => setTargetText(event.target.value)}
            />
            <Button onClick={() => generateTask()}>
                タスクを生成
            </Button>
            <Text>
                { resText }
            </Text>
            <OrderedList>
                { taskList.map((task) => {
                    return (
                        <ListItem>{ task }</ListItem>
                    );
                }) }
                
            </OrderedList>
        </Box>
    );
};