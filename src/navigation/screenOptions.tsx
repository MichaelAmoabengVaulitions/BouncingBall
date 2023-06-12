import { StyleSheet, View } from 'react-native';

import { GREY, WHITE, TRANSPARENT } from '../constants/Colors';
import isAndroid from '../utils/isAndroid';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: WHITE,
    shadowColor: TRANSPARENT,
  },
  transparentHeader: {
    backgroundColor: TRANSPARENT,
    shadowColor: TRANSPARENT,
  },
});

export const STANDARD_HEADER = () => ({
  headerTitle: isAndroid ? () => null : '',
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerTintColor: GREY,
  headerStyle: styles.transparentHeader,
  headerShown: true,
});

export const INVISIBLE_HEADER = () => ({
  headerLeft: () => null,
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerStyle: styles.transparentHeader,
  headerShown: true,
});

export const SWITCH = {
  headerShown: false,
};
