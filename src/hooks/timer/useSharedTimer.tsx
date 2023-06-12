import { useEffect, useContext } from 'react';

import TimerContext from './TimerContext';

export default (startPaused = false, startTime = 0, integar = true) => {
  // The timerContext variable will contain the timeSeconds, paused, ready, startTimer, pauseTimer, toggleTimer, resetTimer, and setupTimer variables.
  const timerContext = useContext(TimerContext);

  // The setupTimer function will set the startTime, startPaused, integar, and ready variables.
  const { setupTimer, ready, ...rest } = timerContext;

  // The useEffect hook will run the setupTimer function when the ready variable changes.
  useEffect(() => {
    if (!ready && setupTimer) {
      setupTimer(startTime, startPaused, integar);
    }
  }, [ready, startTime]);

  // The useEffect hook will run the setupTimer function when the startTime variable changes.
  useEffect(() => {
    if (startTime && setupTimer) {
      setupTimer(startTime, startPaused, integar);
    }
  }, [startTime]);

  return rest;
};
