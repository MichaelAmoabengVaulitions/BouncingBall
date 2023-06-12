import React from 'react';
import { TouchableOpacity, ViewStyle, TouchableOpacityProps } from 'react-native';

import createHapticFeedback from '../utils/createHapticFeedback';

export interface TemplateTouchableProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  onPress?: () => void | null | undefined;
  activeOpacity?: number;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[] | null;
}

const TemplateTouchable: React.FC<TemplateTouchableProps> = ({
  children,
  onPress,
  activeOpacity,
  disabled,
  style,
  ...restProps
}) => {
  const onPressWithHaptic = () => {
    createHapticFeedback();
    onPress && onPress?.();
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      {...restProps}
      onPress={onPressWithHaptic}
      style={style}
      activeOpacity={disabled ? 0.6 : activeOpacity}>
      {children}
    </TouchableOpacity>
  );
};

TemplateTouchable.defaultProps = {
  onPress: undefined,
  activeOpacity: 1,
  disabled: false,
  style: null,
};

export default TemplateTouchable;
