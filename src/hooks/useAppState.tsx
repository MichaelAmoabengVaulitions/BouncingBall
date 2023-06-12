import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type OnChangeFunc = (arg0: AppStateStatus) => void;

interface Settings {
  onChange?: OnChangeFunc;
  onForeground?: () => void;
  onBackground?: () => void;
}

export default (settings: Settings) => {
  const { onChange, onForeground, onBackground } = settings || {};
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

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

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => listener.remove();
  }, [onChange, onBackground, onForeground, appState]);
};
