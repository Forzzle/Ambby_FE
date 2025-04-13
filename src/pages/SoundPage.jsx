import React from 'react';
import {View, StyleSheet} from 'react-native';
import SoundButton from '../components/SoundButton';

const SoundPage = () => {
  return (
    <View style={styles.container}>
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
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default SoundPage;
