import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import GameEndScreen from '../../screens/home/GameEndScreen';
import { GAME_END } from '../ScreenNames';
import { STANDARD_HEADER } from '../screenOptions';

const { Screen, Navigator } = createNativeStackNavigator();
const ScoresStack = () => {
  return (
    <Navigator screenOptions={STANDARD_HEADER}>
      <Screen name={GAME_END} component={GameEndScreen} />
    </Navigator>
  );
};

export default ScoresStack;
