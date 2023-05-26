import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack } from "@chakra-ui/react";

const CountdownTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [initialValue, setInitialValue] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        if (!isActive && seconds === 0 && initialValue > 0) {
            setSeconds(initialValue);
        }
        setIsActive(!isActive);
    };

    const reset = () => {
        setSeconds(initialValue);
        setIsActive(false);
    };

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    useEffect(() => {
        if (seconds === 0) {
            setIsActive(false);
        }
    }, [seconds]);

    return (
        <VStack spacing={5}>
            <Box fontSize="2xl">{seconds}s</Box>
            <Box>
                <Input 
                    type="number" 
                    value={initialValue} 
                    onChange={e => setInitialValue(Number(e.target.value))}
                    isDisabled={isActive}
                />
            </Box>
            <Box>
                <Button colorScheme="teal" onClick={toggle}>
                    {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button colorScheme="orange" onClick={reset}>
                    Reset
                </Button>
            </Box>
        </VStack>
    );
};

export default CountdownTimer;
