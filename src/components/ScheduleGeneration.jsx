import React, { useState } from 'react';
import { Text, Button, List, ListItem, Spinner, Alert, AlertIcon, AlertDescription, Stack, Spacer  } from '@chakra-ui/react';
import axios from 'axios';
import { API_KEY } from '../config/apiKeys';
import { URL } from '../config/config';


export const ScheduleGeneration = (props) =>  {
    const { taskList, scheduleList, setScheduleList, setOpenIndex } = props;
    const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ
    const [isLoading, setIsLoading] = useState(false); // ローディング状況

    // スケジュール生成用のプロンプトを作成
    const createPrompt = (input) => {
        return (
        `
            #命令書:
            あなたは、プロのマネージャーです。
            以下の制約条件と、上記で作成したタスクをもとに、ポモドーロ・テクニックを行う、スケジュールを出力してください。
            
            #制約条件:
            ・生成されたタスクを基に、目標達成までのポモドーロ・テクニックのスケジュールを生成
            ・以下のJSON形式で出力
            {
            "pomodoroSession1": {
                "task": "ここにタスクの詳細を記入",
                "schedule": {
                "workDuration": 25,
                "breakDuration": 5,
                "iterations": "ここに反復回数を記入"
                }
            } ...
            }
            ・返答はJSONのみ

            # 入力JSON
            ${input}
            
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

    // ポモドーロ・スケジュール生成
    const generateSchedule = async () => {
        setIsLoading(true);
        const taskString = JSON.stringify(taskList);
        const prompt = createPrompt(taskString);
        const resultSchedule = await postAPI(prompt);
        let scheduleObj = {};
        try {
            scheduleObj = JSON.parse(resultSchedule);
        } catch (error) {
            console.log(error);
            setErrorMessage('スケジュールの生成に失敗しました。');
            return;
        }
        console.log(scheduleObj);
        setScheduleList(scheduleObj);
        setOpenIndex([1]);
        setIsLoading(false);
      };

    return (
        <Stack>
            {errorMessage && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            <Button onClick={() => generateSchedule()} isLoading={isLoading} >
                {isLoading ? <Spinner /> : 'ポモドーロ・スケジュールを作成'}
            </Button> 
            <Spacer/>
            <List>
                { Object.keys(scheduleList).map(key => (
                    <ListItem key={key} paddingBottom={'3'}>
                    <Text fontSize={'xl'}>＜{key}＞</Text>
                    <Text>タスク名: {scheduleList[key].task}</Text>
                    <Text>時間: {scheduleList[key].schedule.workDuration}</Text>
                    <Text>休憩時間: {scheduleList[key].schedule.breakDuration}</Text>
                    <Text>反復回数: {scheduleList[key].schedule.iterations}</Text>
                    </ListItem>
                )) }
            </List>
        </Stack>
    );
};