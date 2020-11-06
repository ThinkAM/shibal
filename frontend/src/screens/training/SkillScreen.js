import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Slider from '../../components/sliders/Slider';

import routes from '../../navigation/routes';

function SkillScreen({ navigation, route }) {
  const skill = route.params;
  
  return (
    <Screen style={styles.screen}>
      <Slider items={skill.steps} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.grass,
    alignItems: 'center',
  },
});

export default SkillScreen;
