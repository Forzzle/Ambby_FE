import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InfoTab = ({accessibilityInfo}) => {
  return (
    <View style={styles.container}>
      <Text>{accessibilityInfo.description}</Text>
      {accessibilityInfo?.brailleBlock && (
        <View>
          <Text style={styles.title}>점자블록</Text>
          <Text style={styles.content}>{accessibilityInfo.brailleBlock}</Text>
        </View>
      )}
      {accessibilityInfo?.braillePanel && (
        <View>
          <Text style={styles.title}>점자안내판</Text>
          <Text style={styles.content}>{accessibilityInfo.braillePanel}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: 'lightgrey',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    color: '#555',
  },
});

export default InfoTab;
