import React from 'react';
import { ColorValue, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import {
  WHITE,
  BLACK,
  PRIMARY,
  SECONDARY,
  INFO,
  SUCCESS,
  WARNING,
  DANGER,
} from '../constants/Colors';
import { wp } from '../utils/getResponsiveSize';
import isShortDevice from '../utils/isShortDevice';

export interface TemplateTextProps extends TextProps {
  light?: boolean;
  medium?: boolean;
  bold?: boolean;
  extraBold?: boolean;
  black?: boolean;
  white?: boolean;
  title?: boolean;
  largeTitle?: boolean;
  caps?: boolean;
  subTitle?: boolean;
  underLine?: boolean;
  small?: boolean;
  green?: boolean;
  semiBold?: boolean;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  color?: ColorValue;
  size?: number | null;
  lineThrough?: boolean;
  numberOfLines?: number;
  upperCase?: boolean;
  capitalize?: boolean;
  allowFontScaling?: boolean;
  adjustsFontSizeToFit?: boolean;
  opacity?: number;
  style?: TextStyle | TextStyle[] | null;
  children?: string | React.ReactNode | null | false | (string | React.ReactNode | null | false)[];
  primary?: boolean;
  secondary?: boolean;
  info?: boolean;
  danger?: boolean;
  success?: boolean;
  warning?: boolean;
  mAll?: number;
  mt?: number;
  mb?: number;
  mh?: number;
  mv?: number;
  ml?: number;
  mr?: number;
  pAll?: number;
  pv?: number;
  ph?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  flex?: boolean | number;
  width?: number | string | false;
  minWidth?: number | string | false;
  height?: number | string | false;
  minHeight?: number | string | false;
}

const TemplateText: React.FC<TemplateTextProps> = ({
  light,
  medium,
  bold,
  extraBold,
  black,
  white,
  title,
  largeTitle,
  caps,
  subTitle,
  underLine,
  small,
  green,
  semiBold,
  center,
  left,
  right,
  color,
  size,
  lineThrough,
  numberOfLines,
  upperCase,
  capitalize,
  allowFontScaling,
  adjustsFontSizeToFit,
  opacity,
  style,
  children,
  primary,
  secondary,
  info,
  danger,
  success,
  warning,
  mAll,
  mt,
  mb,
  mh,
  mv,
  ml,
  mr,
  pAll,
  pv,
  ph,
  pl,
  pt,
  pr,
  pb,
  flex,
  width,
  minWidth,
  height,
  minHeight,
  ...restProps
}) => {
  let fontWeight:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900' = '300';

  const textStyle: TextStyle = {};

  if (light) {
    fontWeight = '300';
  }

  if (medium) {
    fontWeight = '500';
  }

  if (bold) {
    fontWeight = '700';
  }
  if (extraBold) {
    fontWeight = '800';
  }
  if (semiBold) {
    fontWeight = '600';
  }

  if (black) {
    textStyle.color = BLACK;
  }

  if (white) {
    textStyle.color = WHITE;
  }

  if (title) {
    textStyle.fontSize = wp(24);
  }

  if (largeTitle) {
    textStyle.fontSize = wp(32);
  }

  if (caps || upperCase) {
    textStyle.textTransform = 'uppercase';
  }

  if (capitalize) {
    textStyle.textTransform = 'capitalize';
  }

  if (subTitle) {
    textStyle.fontSize = wp(20);
  }
  if (underLine) {
    textStyle.textDecorationLine = 'underline';
  }

  if (small) {
    textStyle.fontSize = wp(14);
  }

  if (green) {
    textStyle.color = PRIMARY;
  }

  if (left) {
    textStyle.textAlign = 'left';
  }
  if (right) {
    textStyle.textAlign = 'right';
  }

  if (center) {
    textStyle.textAlign = 'center';
  }

  if (color) {
    textStyle.color = color;
  }
  if (primary) textStyle.color = PRIMARY;
  if (secondary) textStyle.color = SECONDARY;
  if (info) textStyle.color = INFO;
  if (success) textStyle.color = SUCCESS;
  if (warning) textStyle.color = WARNING;
  if (danger) textStyle.color = DANGER;

  if (opacity) textStyle.opacity = opacity;

  if (size) {
    textStyle.fontSize = size;
  }

  if (lineThrough) {
    textStyle.textDecorationLine = 'line-through';
    textStyle.textDecorationStyle = 'solid';
  }

  const content = children;

  return (
    <Text
      {...restProps}
      style={[
        styles.default,
        !!flex && { flex: flex === true ? 1 : flex },
        !!mAll && { margin: mAll },
        !!mt && { marginTop: mt },
        !!mb && { marginBottom: mb },
        !!ml && { marginLeft: ml },
        !!mr && { marginRight: mr },
        !!mh && { marginHorizontal: mh },
        !!mv && { marginVertical: mv },
        !!pAll && { padding: pAll },
        !!ph && { paddingHorizontal: ph },
        !!pv && { paddingVertical: pv },
        !!pl && { paddingLeft: pl },
        !!pt && { paddingTop: pt },
        !!pr && { paddingRight: pr },
        !!pb && { paddingBottom: pb },
        !!width && { width },
        !!minWidth && { minWidth },
        !!height && { height },
        !!minHeight && { minHeight },
        !!fontWeight && { fontWeight },
        style && style,
        textStyle,
      ]}
      numberOfLines={numberOfLines}
      allowFontScaling={numberOfLines === 1 ? true : allowFontScaling}
      adjustsFontSizeToFit={numberOfLines === 1 ? true : adjustsFontSizeToFit}>
      {content}
    </Text>
  );
};

TemplateText.defaultProps = {
  light: false,
  medium: false,
  bold: false,
  black: false,
  white: false,
  title: false,
  largeTitle: false,
  caps: false,
  subTitle: false,
  underLine: false,
  small: false,
  green: false,
  semiBold: false,
  center: false,
  left: false,
  right: false,
  color: BLACK,
  size: null,
  lineThrough: false,
  numberOfLines: 0,
  upperCase: false,
  capitalize: false,
  allowFontScaling: true,
  style: null,
  adjustsFontSizeToFit: false,
  children: null,
};

const styles = StyleSheet.create({
  default: {
    fontSize: isShortDevice ? 15 : 18,
    color: BLACK,
  },
});

export default TemplateText;
