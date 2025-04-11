import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {storeInfo} from '../assets/dummyData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingStars from '../components/RatingStars';
import DetailTabView from '../components/DetailTabView';

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
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
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text>{storeInfo.status} ∙ </Text>
              <Text>{storeInfo.hours}</Text>
            </TouchableOpacity>
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
            <DetailTabView />
          </View>
        </View>
      </ScrollView>
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
});
