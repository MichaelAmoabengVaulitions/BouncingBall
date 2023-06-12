import { sortBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import TemplateText from '../../components/TemplateText';
import { GREY, LIGHT_GREY, PRIMARY, WHITE } from '../../constants/Colors';
import { WRAPPER_MARGIN } from '../../constants/Dimensions';
import useScores, { ScoreType } from '../../hooks/scores/useScores';
import { wp } from '../../utils/getResponsiveSize';

const ScoresScreen = () => {
  const [scores, setScores] = useState([]);

  console.log('scores', JSON.stringify(scores, null, 2));

  const { getScores } = useScores();

  useEffect(() => {
    (async () => {
      try {
        const savedScores = await getScores();
        setScores(savedScores);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TemplateText bold size={24} mt={wp(WRAPPER_MARGIN * 6)} mb={wp(WRAPPER_MARGIN)}>
        Your Best Scores
      </TemplateText>

      {scores?.length > 0 &&
        sortBy(scores, 'score')?.slice(0, 10)?.map((savedScore: ScoreType, index) => (
          <View key={`${savedScore?.score} - ${index}`} style={styles.scoreCard}>
            <TemplateText
              size={16}
              semiBold
              color={WHITE}>{`Score: ${savedScore?.score} seconds`}</TemplateText>
            <TemplateText size={14} color={WHITE}>
              {new Date(savedScore?.date).toDateString()}
            </TemplateText>
          </View>
        ))}

      {scores?.length === 0 && (
        <TemplateText bold size={24} mt={wp(WRAPPER_MARGIN * 6)} mb={wp(WRAPPER_MARGIN)}>
          You do not have a ny best scores yet
        </TemplateText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: wp(100),
    paddingHorizontal: wp(WRAPPER_MARGIN),
  },
  scoreCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});
export default ScoresScreen;
