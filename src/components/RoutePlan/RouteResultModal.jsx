import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useTheme} from '../../contexts/themeContext';
import Clipboard from '@react-native-clipboard/clipboard';

const RouteResultModal = ({visible, onClose, routeData}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  if (!routeData) {
    return null;
  }

  const handleCopy = () => {
    const {summary, humanTraffic} = routeData;
    const routeList = humanTraffic
      ?.map((place, idx) => `${idx + 1}. ${place}`)
      .join('\n');
    const fullText = `이 경로를 추천해요 😊\n\n${routeList}\n\n${summary}\n-Amby-`;
    Clipboard.setString(fullText);
    Alert.alert('추천 경로가 복사되었습니다! 붙여넣기해서 저장하세요');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeIcon}
              accessibilityRole="button"
              accessibilityLabel="닫기 버튼"
              accessibilityHint="최적 경로 모달을 닫습니다">
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>

            <Text
              style={styles.title}
              accessibilityRole="header"
              accessibilityLabel="최적 여행 경로 제목">
              최적 여행 경로
            </Text>
          </View>

          <View style={{padding: 20}}>
            <ScrollView>
              {routeData.humanTraffic?.map((place, index) => (
                <View key={index} style={styles.stepContainer}>
                  {/* 점 */}
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{index + 1}</Text>
                  </View>
                  {/* 선 */}
                  {index !== routeData.humanTraffic.length - 1 && (
                    <View style={styles.line} />
                  )}
                  {/* 제목 */}
                  <View style={styles.stepTextWrapper}>
                    <Text style={styles.itemText}>{place}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.summary}>{routeData.summary}</Text>

            <TouchableOpacity
              style={styles.kakaoShareBtn}
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel="내용 복사하기 버튼"
              accessibilityHint="추천 경로를 클립보드에 복사합니다.">
              <Text style={styles.kakaoShareText}>내용 복사하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RouteResultModal;

const getStyles = theme =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    container: {
      borderRadius: 10,
      width: '100%',
      backgroundColor: theme.colors.background,
      maxHeight: '85%',
      position: 'relative',
    },
    header: {
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      padding: 20,
      backgroundColor: theme.colors.primary,
    },
    closeIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
      borderRadius: '50%',
    },
    closeIconText: {
      fontSize: 18,
      color: theme.colors.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.textOnPrimary,
    },
    stepContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    circleText: {
      color: theme.colors.accent,
      fontWeight: 'bold',
      fontSize: 12,
    },
    line: {
      width: 2,
      height: 24,
      backgroundColor: theme.colors.primary,
      position: 'absolute',
      top: 24,
      left: 11,
    },
    stepTextWrapper: {
      flex: 1,
    },
    itemText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    summary: {
      fontSize: 14,
      marginTop: 12,
      color: theme.colors.textSecondary || theme.colors.text,
    },
    kakaoShareBtn: {
      marginTop: 20,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: '#FEE500', // 카카오 스타일 색
    },
    kakaoShareText: {
      color: '#000',
      fontWeight: '600',
    },
  });
