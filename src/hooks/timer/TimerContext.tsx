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

export const TimerProvider: FC<TimerProviderProps> = ({ children }) => {
  // The startPaused variable will determine whether the timer starts paused or not.
  const [startPaused, setStartPaused] = useState<boolean>(true);

  // The startTime variable will determine the starting time of the timer.
  const [startTime, setStartTime] = useState<number | null>(null);

  // The ready variable will determine whether the timer is ready to start or not.
  const [ready, setReady] = useState<boolean>(false);

  // The integar variable will determine whether the timer should count in integars or not.
  const [integar, setIntegar] = useState<boolean | null>(null);

  // The useTimer hook will return the timeSeconds, paused, startTimer, pauseTimer, toggleTimer, and resetTimer variables.
  const { timeSeconds, paused, startTimer, pauseTimer, toggleTimer, resetTimer } = useTimer(
    startPaused,
    startTime,
    integar
  );

  // The setupTimer function will set the startTime, startPaused, integar, and ready variables.
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
