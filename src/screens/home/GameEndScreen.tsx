import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import TemplateButton from '../../components/TemplateButton';
import TemplateText from '../../components/TemplateText';
import useScores from '../../hooks/scores/useScores';
import { SCORES } from '../../navigation/ScreenNames';
import { wp } from '../../utils/getResponsiveSize';

interface GameEndScreenProps {
  navigation: any;
  route: any;
}
const GameEndScreen: FC<GameEndScreenProps> = ({ navigation, route }) => {
  const elapsedTime = route?.params?.elapsedTime;

  const { saveScore } = useScores();

  useEffect(() => {
    saveScore({
      score: elapsedTime,
      date: new Date().toISOString(),
    });
  }, [elapsedTime]);

  return (
    <View style={styles.container}>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <TemplateText bold size={50}>
        {`SCORE: ${elapsedTime}`} <TemplateText>secs</TemplateText>
      </TemplateText>

      <TemplateButton
        title="Check your Best scores"
        onPress={() => navigation.navigate(SCORES)}
        style={styles.button}
      />
      <TemplateButton
        title="Play Again"
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: wp(40),
  },
});
export default GameEndScreen;
