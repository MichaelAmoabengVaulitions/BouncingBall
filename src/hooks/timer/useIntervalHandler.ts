import moment, { Moment } from 'moment';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

import useAppState from '../useAppState';

type Handler = (arg0: number) => void;
type InitialTime = Moment | null;

export default (handler: Handler, interval: number, active: boolean, initialTime: InitialTime) => {
  // This is a workaround for the timer not working in the background on Android
  const [background, setBackground] = useState(false);

  // Remember the latest callback.
  const savedCallback = useRef<Handler>();

  let timer: ReturnType<typeof setInterval>;

  // Set the latest callback.
  useEffect(() => {
    savedCallback.current = handler;
  }, [handler]);

  // Set up the interval.
  useEffect(() => {
    if (!background && initialTime && active) {
      timer = setInterval(
        () => {
          const now = moment();
          const change = now.diff(initialTime);
          savedCallback.current && savedCallback.current(change / interval);
        },
        Platform.OS === 'ios' ? 50 : 1000
      );
    }
    return () => clearInterval(timer);
  }, [interval, active, initialTime]);

  // Handle app state changes
  useAppState({
    onBackground: () => {
      setBackground(true);
    },
    onForeground: () => {
      setBackground(false);
    },
  });
};
