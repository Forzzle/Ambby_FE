import React, {useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {storeInfo, reviewInfo, accessibilityInfo} from '../assets/dummyData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingStars from '../components/RatingStars';
import DetailTabView from '../components/detailTabView/DetailTabView';

const certConfig = {
  kto: {
    label: '관광공사 인증 무장애 관광지입니다.',
    backgroundColor: '#ffe0e0',
  },
  hodeum: {
    label: 'hodeum 인증 관광지입니다.',
    backgroundColor: '#ccbfff',
  },
};

const DetailPage = ({navigation}) => {
  const certInfo = certConfig[storeInfo?.certification] || null;

  const handleGoBack = () => {
    navigation?.goBack();
    console.log('back');
  };

  const handleCallPress = () => {
    if (storeInfo.tel !== '' && storeInfo.tel.length > 0) {
      if (Platform.OS === 'android') {
        Linking.openURL(`tel:${storeInfo.tel}`);
      } else {
        Linking.openURL(`tel://${storeInfo.tel}`);
      }
    }
  };

  const [openHoursMore, setOpenHoursMore] = useState(false);

  const handleToggle = () => {
    setOpenHoursMore(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 260}}>
        <View style={styles.container}>
          {storeInfo?.certification && (
            <View
              style={[
                styles.certBanner,
                {backgroundColor: certInfo?.backgroundColor},
              ]}>
              <Text>{certInfo?.label}</Text>
            </View>
          )}

          <Image
            style={styles.img}
            source={{uri: storeInfo?.image}}
            resizeMode="cover"
          />

          <View style={[styles.section, {gap: 4}]}>
            <Text style={styles.title}>{storeInfo.name}</Text>
            <TouchableOpacity
              onPress={handleToggle}
              style={{flexDirection: 'row'}}>
              <Text>{storeInfo.status} ∙ </Text>
              <Text>{storeInfo.hours}</Text>
            </TouchableOpacity>
            {openHoursMore && (
              <View>
                {Object.entries(storeInfo.weeklyHours).map(([day, hours]) => (
                  <Text key={day}>
                    {day}: {hours}
                  </Text>
                ))}
              </View>
            )}
            <Text>{storeInfo.address}</Text>
            <View style={{flexDirection: 'row'}}>
              <RatingStars
                rating={storeInfo.rating}
                reviewCount={storeInfo.reviewCount}
              />
              <Text>{storeInfo.rating} </Text>
              <Text>({storeInfo.reviewCount})</Text>
            </View>
          </View>

          <View style={{height: '100%'}}>
            <DetailTabView
              reviewInfo={reviewInfo}
              accessibilityInfo={accessibilityInfo}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity style={styles.mapBtn}>
          <Text style={styles.bottomBtnText}>구글맵</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn} onPress={handleCallPress}>
          <Text style={styles.bottomBtnText}>전화 문의하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    gap: 10,
  },
  section: {
    backgroundColor: 'lightgrey',
    padding: 20,
  },
  certBanner: {
    padding: 20,
    alignItems: 'center',
  },
  img: {
    height: 200,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    gap: 10,
  },
  callBtn: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  mapBtn: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    aspectRatio: 1.5,
  },
  bottomBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
