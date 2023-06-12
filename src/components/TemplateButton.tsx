import React, { FC } from 'react';
import { ViewStyle, StyleSheet } from 'react-native';

import TemplateText from './TemplateText';
import TemplateTouchable from './TemplateTouchable';
import { PRIMARY, WHITE } from '../constants/Colors';
import { WRAPPED_SCREEN_WIDTH } from '../constants/Dimensions';
import { GAME_END } from '../navigation/ScreenNames';
import { wp } from '../utils/getResponsiveSize';

export interface TemplateButtonProps {
  title: string;
  onPress: () => void;
  style: ViewStyle;
}
const TemplateButton: FC<TemplateButtonProps> = ({ title, onPress, style }) => {
  return (
    <TemplateTouchable style={[styles.button, style]} onPress={onPress}>
      <TemplateText semiBold caps color={WHITE}>
        {title}
      </TemplateText>
    </TemplateTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: WRAPPED_SCREEN_WIDTH,
    height: wp(50),
    borderRadius: wp(20),
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TemplateButton;
