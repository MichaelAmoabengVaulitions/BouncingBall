import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { GAME, GAME_RULES, SCORES, SCORES_STACK } from './ScreenNames';
import ScoresStack from './scores/ScoresStack';
import { INVISIBLE_HEADER, STANDARD_HEADER, SWITCH } from './screenOptions';
import GameRulesScreen from '../screens/home/GameRulesScreen';
import GameScreen from '../screens/home/GameScreen';
import ScoresScreen from '../screens/scores/ScoresScreen';

const { Screen, Navigator } = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={SWITCH} initialRouteName={GAME_RULES}>
        <Screen name={GAME_RULES} component={GameRulesScreen} options={STANDARD_HEADER} />
        <Screen name={GAME} component={GameScreen} options={STANDARD_HEADER} />
        <Screen name={SCORES_STACK} component={ScoresStack} options={STANDARD_HEADER} />
        <Screen name={SCORES} component={ScoresScreen} options={STANDARD_HEADER} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
