import React, { useState } from 'react';
import { Textarea, Text, Button, Box, OrderedList, ListItem, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, Stack  } from '@chakra-ui/react';
import axios from 'axios';
import { API_KEY } from '../config/apiKeys';
import { URL } from '../config/config';


export const TaskGeneration = () =>  {
    const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ
    const [targetText, setTargetText] = useState(''); // 目標
    const [taskList, setTaskList] = useState({}); // タスク
    const [isLoading, setIsLoading] = useState(false); // タスク生成状況

    // タスク生成用のプロンプトを作成
    const createPrompt = () => {
        return (
        `
            #命令書:
            あなたは、プロのマネージャーです。
            以下の制約条件と入力文をもとに、目標達成までのスケジュールを出力してください。
            
            #制約条件:
            ・入力文を基に、目標達成までのタスクを生成
            ・以下のJSON形式で出力
            {
            "task1": {
                "name": "ここにタスク名を記載",
                "duration": "ここに必要な時間を記載(分)"
            } ...
            }
            ・返答はJSONのみ
            
            #入力文:
            ${targetText}
            
            #出力文:
        `);
    };

  // APIにPOST
  const postAPI = async (content) => {
        try {
        const response = await axios.post(
            URL,
            {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "user", "content": content }
            ],
            },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            }
        );
        return response.data.choices[0].message.content;
        } catch (error) {
            console.log(error);
            setErrorMessage('通信中にエラーが発生しました。');
        }
    }

    // タスク生成
    const generateTask = async () => {
        setIsLoading(true);
        const prompt = createPrompt();
        const resultTask = await postAPI(prompt);
        let taskObj = {};
        try {
            taskObj = JSON.parse(resultTask);
        } catch (error) {
            console.log(error);
            setErrorMessage('タスクの生成に失敗しました。');
        }
        console.log(taskObj);
        setTaskList(taskObj);
        setIsLoading(false);
      };

    return (
        <Stack p={'3'} border={'1px'} borderRadius={'lg'}>
            {errorMessage && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            <Text fontSize={'2xl'}>タスクを生成</Text>
            <Textarea 
                placeholder='目標を入力'
                value={targetText}
                onChange={(event) => setTargetText(event.target.value)}
            />
            <Button onClick={() => generateTask()} isLoading={isLoading}>
            {isLoading ? <Spinner /> : 'タスクを生成'}
            </Button>
            <OrderedList>
                { Object.keys(taskList).map(key => (
                    <ListItem key={key}>
                    <Text fontSize={'xl'}>{key}</Text>
                    <Text>Name: {taskList[key].name}</Text>
                    <Text>Duration: {taskList[key].duration}</Text>
                    </ListItem>
                )) }
            </OrderedList>
        </Stack>
    );
};