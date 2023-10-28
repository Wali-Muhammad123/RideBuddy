import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { Text } from 'react-native-paper';

const Timer = ({ onTimerEnd }) => {
  const [seconds, setSeconds] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        // Timer has reached 0
        clearInterval(intervalId);
        if (onTimerEnd) {
          onTimerEnd();
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View>
      <Text variant="bodyLarge">Waiting Time : {formatTime(seconds)}</Text>
    </View>
  );
};

export default Timer;

