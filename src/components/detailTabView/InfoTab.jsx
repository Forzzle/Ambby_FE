import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../contexts/themeContext';

const labelMap = {
  // 시각장애
  audioguide: '오디오 가이드',
  bigprint: '큰 글씨 안내',
  braileblock: '점자 블록',
  brailepromotion: '점자 홍보물',
  elevator: '엘리베이터',
  guidehuman: '안내 인력',
  guidesystem: '안내 시스템',
  helpdog: '도우미견 출입',
  publictransport: '대중교통 접근성',
  restroom: '장애인 화장실',
  blindhandicapetc: '기타 시각장애인 정보',
  // 청각장애
  videoguide: '영상 안내',
  signguide: '수화 안내',
  hearinghandicapetc: '기타 청각장애인 정보',
  // 지체장애
  exit: '출입구',
  tourWheelchair: '휠체어 대여',
  wheelchairAccessibleEntrance: '휠체어 진입 가능 입구',
  wheelchairAccessibleParking: '휠체어 전용 주차장',
  wheelchairAccessibleRestroom: '휠체어 화장실',
  wheelchairAccessibleSeating: '휠체어 좌석',
  handicapetc: '기타 지체장애인 정보',
  // 공통
  parking: '주차장',
  route: '이동 경로',
  stroller: '유모차 대여',
  lactationroom: '수유실',
  babysparechair: '유아용 의자',
  infantsfamilyetc: '영유아/가족 기타',
};

const tabs = [
  {key: 'blind', label: '시각장애'},
  {key: 'deaf', label: '청각장애'},
  {key: 'physicallyDisabled', label: '지체장애'},
  {key: 'common', label: '공통'},
];

const InfoTab = ({data}) => {
  const [selectedTab, setSelectedTab] = useState('blind');
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const currentData = Object.entries(data[selectedTab] || {}).filter(
    ([_, value]) => value !== '' && value !== null,
  );

  const renderItem = ([key, value]) => {
    const label = labelMap[key] || key;
    const displayValue =
      typeof value === 'boolean' ? (value ? '가능' : '불가능') : value;

    return (
      <View key={key} style={styles.item}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{displayValue}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(tab => {
          const isActive = selectedTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.activeTab]}
              onPress={() => setSelectedTab(tab.key)}>
              <Text style={[styles.tabText, isActive && styles.activeText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.infoBox}>
        {currentData.length > 0 ? (
          currentData.map(renderItem)
        ) : (
          <Text style={styles.noInfo}>정보가 없습니다.</Text>
        )}
      </View>
    </View>
  );
};

export default InfoTab;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    tabs: {
      flexDirection: 'row',
      marginBottom: 16,
      flexWrap: 'wrap',
    },
    tabButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginRight: 6,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 6,
    },
    activeTab: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    tabText: {
      color: theme.colors.primary,
    },
    activeText: {
      color: theme.colors.textOnPrimary,
      fontWeight: 'bold',
    },
    infoBox: {
      flex: 1,
    },
    item: {
      marginBottom: 12,
      padding: 10,
      borderRadius: 6,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    value: {
      marginTop: 4,
      fontSize: 15,
      color: theme.colors.textPrimary,
    },
    noInfo: {
      marginTop: 20,
      fontSize: 16,
      color: '#999',
    },
  });
