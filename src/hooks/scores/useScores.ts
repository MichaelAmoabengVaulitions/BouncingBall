import AsyncStorage from '@react-native-async-storage/async-storage';

export type ScoreType = {
  score: number;
  date: string;
};
const useScores = () => {
  const saveScore = async (score: ScoreType) => {
    try {
      const scoresArray = await AsyncStorage.getItem('scores');
      const parsedScoresArray = scoresArray && JSON.parse(scoresArray);
      if (parsedScoresArray?.length) {
        const newScoresArray = [...parsedScoresArray, score];
        await AsyncStorage.setItem('scores', JSON.stringify(newScoresArray));
      } else {
        await AsyncStorage.setItem('scores', JSON.stringify([score]));
      }
    } catch (e) {
      __DEV__ && console.log('[useScores save score] - Error', e);
    }
  };
  const getScores = async () => {
    try {
      const scoresArray = await AsyncStorage.getItem('scores');
      const parsedScoresArray = scoresArray && JSON.parse(scoresArray);
      return parsedScoresArray;
    } catch (e) {
      __DEV__ && console.log('[useScores get scores] - Error', e);
    }
  };

  return {
    saveScore,
    getScores,
  };
};

export default useScores;
