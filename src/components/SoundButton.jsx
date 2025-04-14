// src/components/SoundButton.jsx
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import {useTheme} from '../context/ThemeContext';

Sound.setCategory('Playback');

const soundMap = {
  crowd: [
    require('../assets/audio/crowd1.mp3'),
    require('../assets/audio/crowd2.mp3'),
    require('../assets/audio/crowd3.mp3'),
  ],
  beach: [
    require('../assets/audio/beach1.mp3'),
    require('../assets/audio/beach2.mp3'),
  ],
  footstep: [require('../assets/audio/footstep.mp3')],
  eat: [require('../assets/audio/eat.mp3')],
  wind: [require('../assets/audio/wind.mp3')],
};

let currentSounds = [];
let stopAllCallbacks = [];

const SoundButton = ({categories}) => {
  const {theme} = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  const stopCurrentSounds = () => {
    currentSounds.forEach(sound => {
      sound.stop(() => sound.release());
    });
    currentSounds = [];
    stopAllCallbacks.forEach(callback => callback(false));
    stopAllCallbacks = [];
  };

  const handlePress = () => {
    if (isPlaying) {
      stopCurrentSounds();
    } else {
      stopCurrentSounds(); // 기존 재생 중단
      const selectedCategories = Array.isArray(categories)
        ? categories
        : [categories];

      selectedCategories.forEach(category => {
        const list = soundMap[category];
        if (!list) return;

        const file = list[Math.floor(Math.random() * list.length)];

        const sound = new Sound(file, error => {
          if (error) {
            console.log('사운드 로딩 실패:', error);
            return;
          }
          currentSounds.push(sound);
          sound.play(success => {
            if (!success) console.log('재생 실패');
            sound.release();
            currentSounds = currentSounds.filter(s => s !== sound);
            if (currentSounds.length === 0) setIsPlaying(false);
          });
        });
      });
      stopAllCallbacks.push(setIsPlaying);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopCurrentSounds();
    };
  }, []);

  const selectedCategories = Array.isArray(categories)
    ? categories
    : [categories];

  const availableCategories = selectedCategories.filter(cat => soundMap[cat]);

  if (availableCategories.length === 0) return null;

  const label = availableCategories.join('+');

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: theme.colors.primary,
        },
      ]}
      onPress={handlePress}>
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.accent,
          },
        ]}>
        {isPlaying ? '정지' : `재생: ${label}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SoundButton;
