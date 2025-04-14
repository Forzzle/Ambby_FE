import React from 'react';
import {View, StyleSheet} from 'react-native';
import SoundButton from '../components/SoundButton';
import ScreenContainer from '../components/ScreenContainer';

const SoundPage = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <SoundButton categories="crowd" />
        <SoundButton categories={['beach', 'wind']} />
        <SoundButton categories={['eat', 'crowd', 'footstep']} />
        <SoundButton categories={['invalid', 'ghost']} />
        <SoundButton categories={['crowd', 'ghost']} />
        <SoundButton categories="wind" />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default SoundPage;
