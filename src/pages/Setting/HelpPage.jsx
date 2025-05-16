import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useTheme} from '../../contexts/themeContext';
import Header from '../../components/Header';

const HelpPage = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Header title="도움말" showBack={true} />
        <View style={styles.content}>
          <Text style={[styles.text, {color: theme.colors.text}]}>
            준비중입니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 18,
    },
  });

export default HelpPage;
