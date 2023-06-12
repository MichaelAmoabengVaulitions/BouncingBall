import { isEqual } from 'lodash';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';

import useIntervalHandler from './useIntervalHandler';

export default (
  startPaused = false,
  startTime: number | null = null,
  integar: boolean | null = false
) => {
  const [timeSeconds, setTimeSeconds] = useState(startTime || 0);
  useEffect(() => {
    setTimeSeconds(startTime || 0);
  }, [startTime]);
  const [paused, setPaused] = useState<boolean>(startPaused);
  const [initialTime, setInititalTime] = useState<Moment | null>(null);
  const [previousTime, setPreviousTime] = useState<number>(0);
  useEffect(() => {
    if (!initialTime && !paused) {
      setInititalTime(integar ? moment().startOf('second') : moment());
      setPaused(false);
    }
  }, [paused]);
  const handler = (change: number) => {
    let result = startTime ? (previousTime || startTime) - change : change + previousTime;
    if (integar) {
      result = Math.round(result);
    }
    if (!isEqual(timeSeconds, result)) {
      setTimeSeconds(result);
    }
  };
  useIntervalHandler(handler, 1000, !paused, initialTime);
  const startTimer = () => setPaused(false);
  const pauseTimer = () => {
    setPreviousTime(timeSeconds);
    setInititalTime(null);
    setPaused(true);
  };
  return {
    timeSeconds,
    paused,
    startTimer,
    pauseTimer,
    toggleTimer: () => (paused ? startTimer() : pauseTimer()),
    resetTimer: () => {
      setTimeSeconds(startTime || 0);
      setInititalTime(null);
      setPreviousTime(0);
      setPaused(true);
    },
  };
};
