import { useEffect, useContext } from 'react';

import TimerContext from './TimerContext';

export default (startPaused = false, startTime = 0, integar = true) => {
  const timerContext = useContext(TimerContext);
  const { setupTimer, ready, ...rest } = timerContext;

  useEffect(() => {
    if (!ready && setupTimer) {
      console.log('setup timer', startTime);
      setupTimer(startTime, startPaused, integar);
    }
  }, [ready, startTime]);

  useEffect(() => {
    if (startTime && setupTimer) {
      setupTimer(startTime, startPaused, integar);
    }
  }, [startTime]);

  return rest;
};
