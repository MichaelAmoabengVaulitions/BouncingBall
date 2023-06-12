import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import TemplateText from '../../components/TemplateText';
import { LIGHT_GREY, PRIMARY, SECONDARY, WHITE } from '../../constants/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, WRAPPER_MARGIN } from '../../constants/Dimensions';
import useSharedTimer from '../../hooks/timer/useSharedTimer';
import { GAME_END, SCORES_STACK } from '../../navigation/ScreenNames';
import { wp } from '../../utils/getResponsiveSize';

interface GameScreenProps {
  navigation: any;
}
const GameScreen: FC<GameScreenProps> = ({ navigation }) => {
  const maxAttempts = 5;

  const [attempts, setAttempts] = useState(0);

  const [elapsedTime, setElapsedTime] = useState(0);

  const sizeAnimationDuration = 2000;

  const initialSpeedAnimationDuration = 2000;

  const [animationDuration, setAnimationDuration] = useState(initialSpeedAnimationDuration);

  const offset = useSharedValue(0);

  const offsetY = useSharedValue(0);

  const initialSize = 120;

  const ballRadius = useSharedValue(initialSize / 2);

  const ballSize = useSharedValue(initialSize);

  const { timeSeconds, startTimer, resetTimer, pauseTimer } = useSharedTimer();

  const animationConfig = {
    duration: sizeAnimationDuration,
    easing: Easing.linear,
  };

  // Reduce ball
  const reduceBallSize = () => {
    const targetSize = ballSize.value * 0.7;
    const targetRadius = targetSize / 2;
    ballSize.value = withTiming(targetSize, animationConfig);
    ballRadius.value = withTiming(targetRadius, animationConfig);
  };

  // Decrease the animation duration by 400 milliseconds
  const increaseSpeed = () => {
    const durationOffset = 500;
    if (animationDuration >= durationOffset) {
      setAnimationDuration((prevDuration) => prevDuration - durationOffset);
    }
  };

  // Increase the attempts by 1
  const increaseAttempts = () => {
    if (attempts < maxAttempts) {
      setAttempts((prevAttempts) => prevAttempts + 1);
    }
  };

  // Pause the timer and navigate to the end game screen
  const endGame = () => {
    pauseTimer?.();
    setElapsedTime(timeSeconds);
    navigation.replace(SCORES_STACK, {
      screen: GAME_END,
      params: {
        elapsedTime: timeSeconds,
      },
    });
  };

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      height: ballSize.value,
      width: ballSize.value,
      borderRadius: ballRadius.value,
    };
  });

  const springStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            offsetY.value * (SCREEN_HEIGHT - (WRAPPER_MARGIN + ballSize.value)),
            {
              damping: 20,
              stiffness: 90,
            }
          ),
        },
        {
          translateX: withSpring(
            offset.value * (SCREEN_WIDTH - (WRAPPER_MARGIN * 2 + ballSize.value)),
            {
              damping: 20,
              stiffness: 90,
            }
          ),
        },
      ],
    };
  });

  // Start the timer when the screen is loaded
  useEffect(() => {
    if (timeSeconds) {
      resetTimer?.();
      startTimer?.();
    } else {
      startTimer?.();
    }
  }, []);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(Math.random(), {
        duration: animationDuration,
        easing: Easing.inOut(Easing.ease),
      }),
      40,
      true
    );
    offsetY.value = withRepeat(
      withTiming(Math.random(), {
        duration: animationDuration,
        easing: Easing.inOut(Easing.ease),
      }),
      20,
      true
    );
  }, [timeSeconds, offset, offsetY]);

  // End the game when the attempts are equal to the max attempts
  useEffect(() => {
    if (attempts === maxAttempts - 1) {
      endGame();
    }
  }, [attempts]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <TemplateText color={WHITE} size={14} semiBold>{`Attempts left: ${
            maxAttempts - attempts
          }`}</TemplateText>
        </View>
        <View style={styles.card}>
          <TemplateText
            color={WHITE}
            size={14}
            semiBold>{`Time Used: ${timeSeconds}`}</TemplateText>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            increaseSpeed();
            reduceBallSize();
            increaseAttempts();
          }}>
          <Animated.View style={[styles.ball, springStyle, animatedViewStyle]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WRAPPER_MARGIN,
    paddingVertical: WRAPPER_MARGIN * 3,
    backgroundColor: SECONDARY,
  },
  ball: {
    backgroundColor: PRIMARY,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(WRAPPER_MARGIN / 2),
    paddingHorizontal: wp(WRAPPER_MARGIN),
    backgroundColor: PRIMARY,
    shadowColor: LIGHT_GREY,
    shadowOffset: {
      width: -4,
      height: -6,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 9,
    borderRadius: wp(10),
    marginVertical: wp(10),
    width: wp(150),
    marginRight: wp(WRAPPER_MARGIN),
  },

  cardContainer: {
    marginTop: wp(WRAPPER_MARGIN * 2.5),
    flexDirection: 'row',
  },
});
export default GameScreen;
