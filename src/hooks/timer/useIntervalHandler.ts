import moment, { Moment } from 'moment';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

import useAppState from '../useAppState';

type Handler = (arg0: number) => void;
type InitialTime = Moment | null;

export default (handler: Handler, interval: number, active: boolean, initialTime: InitialTime) => {
  const [background, setBackground] = useState(false);
  const savedCallback = useRef<Handler>();
  let timer: ReturnType<typeof setInterval>;

  useEffect(() => {
    savedCallback.current = handler;
  }, [handler]);

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

  useAppState({
    onBackground: () => {
      setBackground(true);
    },
    onForeground: () => {
      setBackground(false);
    },
  });
};
