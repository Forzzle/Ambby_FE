import React from 'react';
import {View, StyleSheet} from 'react-native';
import SoundButton from '../components/SoundButton';
import {useTheme} from '../context/ThemeContext';

const SoundPage = () => {
  const {theme} = useTheme(); // 테마 가져오기

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <SoundButton categories="crowd" />
      <SoundButton categories={['beach', 'wind']} />
      <SoundButton categories={['eat', 'crowd', 'footstep']} />
      <SoundButton categories={['invalid', 'ghost']} />
      <SoundButton categories={['crowd', 'ghost']} />
      <SoundButton categories="wind" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});

export default SoundPage;
