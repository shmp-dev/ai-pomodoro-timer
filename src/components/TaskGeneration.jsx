import React, { useState } from 'react';
import { Textarea,
         Text,
         Button,
         Heading,
         Spinner,
         Alert,
         AlertIcon,
         AlertDescription,
         Stack,
         Spacer,
         Input,
         Card,
         CardBody,
         CardHeader
            } from '@chakra-ui/react';

import axios from 'axios';
import { API_KEY } from '../config/apiKeys';
import { URL } from '../config/config';


export const TaskGeneration = (props) =>  {
    const { targetText, setTargetText, setIsGenerateTask, taskList, setTaskList, setOpenIndex, setScheduleList } = props;
    const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ
    const [isLoading, setIsLoading] = useState(false); // ローディング状況

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
        setErrorMessage('');
        setTaskList({});
        setOpenIndex([0]);
        setScheduleList('');
        setIsGenerateTask(false);
        setIsLoading(true);
        const prompt = createPrompt();
        const resultTask = await postAPI(prompt);
        let taskObj = {};
        try {
            taskObj = JSON.parse(resultTask);
        } catch (error) {
            console.log(error);
            setErrorMessage('タスクの生成に失敗しました。');
            setIsLoading(false);
            return;
        }
        console.log(taskObj);
        setTaskList(taskObj);
        setIsGenerateTask(true);
        setOpenIndex([0, 1]);
        setIsLoading(false);
      };

      // タスク名を更新
      const updateTaskName = (key, newName) => {
        setTaskList(prevTaskList => ({
          ...prevTaskList,
          [key]: {
            ...prevTaskList[key],
            name: newName
          }
        }));
      };

      // タスクの期間を更新
      const updateTaskDuration = (key, newDuration) => {
        setTaskList(prevTaskList => ({
          ...prevTaskList,
          [key]: {
            ...prevTaskList[key],
            duration: newDuration
          }
        }));
      };      

    return (
        <Stack >
            {errorMessage && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            <Textarea 
                placeholder='目標を入力'
                value={targetText}
                onChange={(event) => setTargetText(event.target.value)}
            />
            <Button onClick={() => generateTask()} isLoading={isLoading}>
                {isLoading ? <Spinner /> : 'タスクを生成'}
            </Button>
            <Spacer/>
            { Object.keys(taskList).map(key => (
                <Card key={key}>
                    <CardHeader paddingBottom={'0'}>
                        <Heading size='md'>＜{key}＞</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>タスク名:</Text>
                        <Input
                            marginBottom={'2'}
                            value={taskList[key].name}
                            onChange={event => updateTaskName(key, event.target.value)}
                        />
                        <Text>時間（分）:</Text>
                        <Input
                            value={taskList[key].duration}
                            onChange={event => updateTaskDuration(key, event.target.value)}
                        />
                    </CardBody>
                </Card>
            )) }
        </Stack>
    );
};