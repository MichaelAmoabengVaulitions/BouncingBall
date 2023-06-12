import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import isAndroid from "./isAndroid";

export default () => {
    if (!isAndroid) {
        const options = {
            enableVibrateFallback: false,
            ignoreAndroidSystemSettings: false,
        };

        ReactNativeHapticFeedback.trigger('impactLight', options);
    }
};
