import { Dimensions } from 'react-native';

import { wp } from '../utils/getResponsiveSize';

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export const WRAPPER_MARGIN = wp(20);

export const WRAPPED_SCREEN_WIDTH: number = SCREEN_WIDTH - wp(WRAPPER_MARGIN * 2);
