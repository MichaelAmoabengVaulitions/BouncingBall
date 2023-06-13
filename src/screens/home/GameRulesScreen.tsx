import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import TemplateButton from '../../components/TemplateButton';
import TemplateText from '../../components/TemplateText';
import {  WRAPPER_MARGIN } from '../../constants/Dimensions';
import { GAME,  SCORES } from '../../navigation/ScreenNames';
import { wp } from '../../utils/getResponsiveSize';

interface GameRulesScreenProps {
  navigation: any;
}
const GameRulesScreen: FC<GameRulesScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <TemplateText bold size={24} mb={WRAPPER_MARGIN}>
          Game Rules
        </TemplateText>
        <TemplateText semiBold size={16} mb={WRAPPER_MARGIN / 2}>
          - The game starts with a ball moving randomly in the boundaries of your screen
        </TemplateText>
        <TemplateText semiBold size={16} mb={WRAPPER_MARGIN / 2}>
          - The speed of the ball will increase and the size will decrease everytime you press on it
        </TemplateText>
        <TemplateText semiBold size={16} mb={WRAPPER_MARGIN / 2}>
          - The goal is it press on the ball 5 times within the shortest possible time. You have 5
          attempts
        </TemplateText>
        <TemplateText semiBold size={16} mb={WRAPPER_MARGIN / 2}>
          - The game will end after the last attempt revealing your scores
        </TemplateText>
      </View>
      <TemplateButton
        title="Play Game"
        onPress={() => navigation.navigate(GAME)}
        style={styles.button}
      />
      <TemplateButton
        title="Check your Best scores"
        onPress={() => navigation.navigate(SCORES)}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: WRAPPER_MARGIN,
  },
  button: {
    alignSelf: 'center',
    marginTop: wp(40),
  },
});
export default GameRulesScreen;
