import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Config from 'react-native-config';
const KakaoShareBtn = () => {
  const openKakaoLink = async () => {
    const kakaoUrl = 'https://sharer.kakao.com/talk/friends/picker/link';
    const appKey = Config.KAKAO_JS_KEY;
    const url = encodeURIComponent('https://naver.com');
    const title = encodeURIComponent('여행 정보 공유');
    const description = encodeURIComponent(
      '이 링크를 통해 여행 계획을 확인해보세요!',
    );
    const imageUrl = encodeURIComponent('https://yourdomain.com/sample.png');

    const fullUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${url}&response_type=code`;

    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(fullUrl, {
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#FEE500',
          preferredControlTintColor: 'black',
        });
      }
    } catch (error) {
      console.error('카카오톡 열기 실패:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openKakaoLink}>
      <Text style={styles.text}>카카오톡으로 공유하기</Text>
    </TouchableOpacity>
  );
};

export default KakaoShareBtn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FEE500',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: '#3C1E1E',
    fontWeight: 'bold',
  },
});
