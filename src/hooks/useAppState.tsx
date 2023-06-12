import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type OnChangeFunc = (arg0: AppStateStatus) => void;

interface Settings {
  onChange?: OnChangeFunc;
  onForeground?: () => void;
  onBackground?: () => void;
}

export default (settings: Settings) => {
  // Settings is an optional object that can contain any of the following:
  const { onChange, onForeground, onBackground } = settings || {};

  // The appState variable will contain the current state of the app.
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  // The handleAppStateChange function will be called when the app state changes.
  const handleAppStateChange: (arg: AppStateStatus) => void = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      if (onForeground) {
        onForeground();
      }
    } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      if (onBackground) {
        onBackground();
      }
    }
    setAppState(nextAppState);
    if (onChange) {
      onChange(nextAppState);
    }
  };

  // The useEffect hook will run the handleAppStateChange function when the app state changes.
  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => listener.remove();
  }, [onChange, onBackground, onForeground, appState]);
};
