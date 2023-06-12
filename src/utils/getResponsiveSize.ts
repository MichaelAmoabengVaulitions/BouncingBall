import { PixelRatio, Dimensions, } from 'react-native';

interface ResponsiveType {
    (size: number) : number
}

// Dimensions corresponding to iPhone 13
export const DESIGN_HEIGHT = 844;
export const DESIGN_WIDTH = 390;

const SCREEN_HEIGHT:number = Dimensions.get('screen').height;
const SCREEN_WIDTH:number = Dimensions.get('screen').width;

// Responsive size based on iPhone 13 dimensions and screen dimensions
export const hp:ResponsiveType = (value: number) => {
    const dimension = (value / DESIGN_HEIGHT) * 100;
    return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * dimension) / 100);
};

// Responsive size based on iPhone 13 dimensions and screen dimensions
export const wp:ResponsiveType = (value: number) => {
    const dimension = (value / DESIGN_WIDTH) * 100;
    return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * dimension) / 100);
};
