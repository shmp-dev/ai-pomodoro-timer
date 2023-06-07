import React, { useState } from 'react';
import { Text,
         Button,
         Input,
         Heading,
         Spinner,
         Alert,
         AlertIcon, 
         AlertDescription,
         Stack,
         Spacer,
         Card,
         CardBody,
         CardHeader
        } from '@chakra-ui/react';
import axios from 'axios';
import { API_KEY } from '../config/apiKeys';
import { URL } from '../config/config';


export const ScheduleGeneration = (props) =>  {
    const { taskList, scheduleList, setScheduleList, setOpenIndex, setViewPomodoroTimer, isGenerateSchedule, setIsGenerateSchedule } = props;
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
        setScheduleList({});
        setErrorMessage('');
        setIsGenerateSchedule(false);
        setViewPomodoroTimer(false);
        const taskString = JSON.stringify(taskList);
        const prompt = createPrompt(taskString);
        const resultSchedule = await postAPI(prompt);
        let scheduleObj = {};
        try {
            scheduleObj = JSON.parse(resultSchedule);
        } catch (error) {
            console.log(error);
            setErrorMessage('スケジュールの生成に失敗しました。');
            setIsLoading(false);
            return;
        }
        console.log(scheduleObj);
        setScheduleList(scheduleObj);
        setOpenIndex([1]);
        setIsGenerateSchedule(true);
        setIsLoading(false);
      };

    // スケジュール名を更新
    const updateScheduleName = (key, newName) => {
        setScheduleList(prevScheduleList => ({
        ...prevScheduleList,
        [key]: {
            ...prevScheduleList[key],
            task: newName
        }
        }));
    };

    // スケジュールの期間を更新
    const updateScheduleDuration = (key, newDuration) => {
        setScheduleList(prevScheduleList => ({
        ...prevScheduleList,
        [key]: {
            ...prevScheduleList[key],
            schedule: {
            ...prevScheduleList[key].schedule,
            workDuration: newDuration
            }
        }
        }));
    };      

    // スケジュールの休憩時間を更新
    const updateScheduleBreak = (key, newBreak) => {
        setScheduleList(prevScheduleList => ({
        ...prevScheduleList,
        [key]: {
            ...prevScheduleList[key],
            schedule: {
            ...prevScheduleList[key].schedule,
            breakDuration: newBreak
            }
        }
        }));
    };

    // スケジュールの反復回数を更新
    const updateScheduleIterations = (key, newIterations) => {
        setScheduleList(prevScheduleList => ({
        ...prevScheduleList,
        [key]: {
            ...prevScheduleList[key],
            schedule: {
            ...prevScheduleList[key].schedule,
            iterations: newIterations
            }
        }
        }));
    };    

    return (
        <Stack>
            {errorMessage && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertDescription fontSize={{ base:'xs', sm:'md' }}>{errorMessage}</AlertDescription>
                </Alert>
            )}
            <Button fontSize={{ base:'xs', sm:'sm', md:'md' }} onClick={() => generateSchedule()} isLoading={isLoading} >
                {isLoading ? <Spinner /> : 'ポモドーロ・スケジュールを作成'}
            </Button> 
            <Spacer/>
            { Object.keys(scheduleList).map((key, index) => (
                <Card key={key}>
                    <CardHeader paddingBottom={'0'}>
                        <Heading size={{ base:'sm', sm:'md' }} borderBottom={'1px'}>セッション{index+1}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>セッション名:</Text>
                        <Input
                            marginBottom={'2'}
                            value={scheduleList[key].task}
                            onChange={event => updateScheduleName(key, event.target.value)}
                        />
                        <Text>時間（分）:</Text>
                        <Input
                            marginBottom={'2'}
                            value={scheduleList[key].schedule.workDuration}
                            onChange={event => updateScheduleDuration(key, event.target.value)}
                        />
                        <Text>休憩時間:</Text>
                        <Input
                            marginBottom={'2'}
                            value={scheduleList[key].schedule.breakDuration}
                            onChange={event => updateScheduleBreak(key, event.target.value)}
                        />
                        <Text>反復回数:</Text>
                        <Input
                            value={scheduleList[key].schedule.iterations}
                            onChange={event => updateScheduleIterations(key, event.target.value)}
                        />
                    </CardBody>
                </Card>
            )) }
            { isGenerateSchedule && 
                <Button fontSize={{ base:'xs', sm:'sm', md:'md' }} onClick={() => setViewPomodoroTimer(true)} >
                    ポモドーロ・タイマーを作成
                </Button> 
            }
        </Stack>
    );
};