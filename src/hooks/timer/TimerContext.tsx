import PropTypes from 'prop-types';
import React, { createContext, useState, FC } from 'react';

import useTimer from './useTimer';
interface TimerContextInterface {
  timeSeconds: number;
  paused: boolean;
  ready: boolean;
  startTimer?: () => void | null;
  pauseTimer?: () => void | null;
  toggleTimer?: () => void | null;
  resetTimer?: () => void | null;
  setupTimer?: ((arg0: number, arg1: boolean, arg2: boolean) => void) | null;
}

interface TimerProviderProps {
  children: React.ReactNode;
}
const TimerContext = createContext<TimerContextInterface>({
  timeSeconds: 0,
  paused: false,
  ready: false,
  startTimer: () => null,
  pauseTimer: () => null,
  toggleTimer: () => null,
  resetTimer: () => null,
  setupTimer: () => null,
});
export const { Provider, Consumer: TimerConsumer } = TimerContext;

// @ts-ignore
export const TimerProvider: FC<TimerProviderProps> = ({ children }) => {
  const [startPaused, setStartPaused] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [integar, setIntegar] = useState<boolean | null>(null);

  const { timeSeconds, paused, startTimer, pauseTimer, toggleTimer, resetTimer } = useTimer(
    startPaused,
    startTime,
    integar
  );

  const setupTimer = (time: number, pause: boolean, int: boolean) => {
    setStartTime(time);
    setStartPaused(pause);
    setIntegar(int);
    setReady(true);
  };

  return (
    <Provider
      value={{
        timeSeconds,
        paused,
        ready,
        startTimer,
        pauseTimer,
        toggleTimer,
        resetTimer,
        setupTimer,
      }}>
      {children}
    </Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TimerContext;
