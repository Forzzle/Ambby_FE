import React, {useEffect, useState} from 'react';
import {useTheme} from '../contexts/themeContext';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {accessibilityInfo} from '../assets/dummyData';
import RatingStars from '../components/RatingStars';
import DetailTabView from '../components/detailTabView/DetailTabView';
import {getDetail} from '../apis/placeApi';
import BookMarkBtn from '../components/BookMarkBtn';

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
const StoreOverview = ({storeInfo}) => {
  const {theme} = useTheme();
  const [openHoursMore, setOpenHoursMore] = useState(false);
  const handleToggle = () => {
    setOpenHoursMore(prev => !prev);
  };
  const bookMarkPlace = {
    id: storeInfo.id,
    name: storeInfo?.displayName?.text,
    simpleAddress: storeInfo?.formattedAddress,
    category: storeInfo?.primaryTypeDisplayName?.text,
  };
  return (
    <View
      style={[
        styles.section,
        {gap: 4, backgroundColor: theme.colors.background},
      ]}>
      <View style={{flexDirection: 'row', gap: 6}}>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 18,
            maxWidth: '80%',
          }}>
          {storeInfo?.displayName?.text}
        </Text>
        <Text
          style={{
            color: theme.colors.primary,
            marginRight: 'auto',
            alignSelf: 'flex-end',
          }}>
          {storeInfo?.primaryTypeDisplayName?.text}
        </Text>
        <BookMarkBtn place={bookMarkPlace} />
      </View>
      <TouchableOpacity onPress={handleToggle} style={{flexDirection: 'row'}}>
        <Text style={{color: theme.colors.text}}>
          {storeInfo?.regularOpeningHours?.openNow ? '영업중' : '영업종료'}
        </Text>
        <Text style={{color: theme.colors.text}}>{storeInfo?.hours}</Text>
      </TouchableOpacity>
      {openHoursMore && (
        <View>
          {storeInfo?.regularOpeningHours?.weekdayDescriptions.map(
            (desc, i) => (
              <Text key={i} style={{color: theme.colors.text}}>
                {desc}
              </Text>
            ),
          )}
        </View>
      )}
      <Text style={{color: theme.colors.text}}>
        {storeInfo?.formattedAddress}
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RatingStars rating={storeInfo?.rating} />
        <Text style={{color: theme.colors.text}}>{storeInfo?.rating} </Text>
        <Text style={{color: theme.colors.text}}>
          ({storeInfo?.userRatingCount})
        </Text>
      </View>
    </View>
  );
};
const DetailPage = ({route}) => {
  const {placeId} = route.params;
  const {theme} = useTheme();
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState([]);
  const [reviewInfo, setReciewInfo] = useState([]);
  const certInfo = certConfig[storeInfo?.certification] || null;
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getDetail(placeId);
        console.log(res.data);
        setStoreInfo(res.data?.placeDetail);
        setReciewInfo(res.data?.reviewSummary);
      } catch (error) {
        console.error('상세 정보 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [placeId]);

  const handleCallPress = () => {
    if (storeInfo.tel !== '' && storeInfo.nationalPhoneNumber.length > 0) {
      if (Platform.OS === 'android') {
        Linking.openURL(`tel:${storeInfo.nationalPhoneNumber}`);
      } else {
        Linking.openURL(`tel://${storeInfo.nationalPhoneNumber}`);
      }
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>로딩..(디자인 추후 구현)</Text>
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
          <View style={styles.container}>
            {storeInfo?.certification && (
              <View
                style={[
                  styles.certBanner,
                  {backgroundColor: certInfo?.backgroundColor},
                ]}>
                <Text style={{color: theme.colors.text}}>
                  {certInfo?.label}
                </Text>
              </View>
            )}

            <Image
              style={styles.img}
              source={{uri: storeInfo?.image}}
              resizeMode="cover"
            />
            <StoreOverview storeInfo={storeInfo} />

            <View style={{height: '100%', paddingBottom: 180}}>
              <DetailTabView
                reviewInfo={reviewInfo}
                accessibilityInfo={{
                  baseInfo: accessibilityInfo,
                  options: storeInfo.accessibilityOptions,
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={[styles.bottomBtnContainer]}>
          <TouchableOpacity
            style={[styles.mapBtn, {backgroundColor: theme.colors.primary}]}>
            <Text style={[styles.bottomBtnText, {color: theme.colors.accent}]}>
              구글맵
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.callBtn, {backgroundColor: theme.colors.primary}]}
            onPress={handleCallPress}>
            <Text style={[styles.bottomBtnText, {color: theme.colors.accent}]}>
              전화 문의하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  section: {
    padding: 20,
  },
  certBanner: {
    padding: 20,
    alignItems: 'center',
  },
  img: {
    height: 200,
    backgroundColor: 'grey', // 이건 theme 적용이 불필요하면 그대로 둬도 OK
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    width: 'auto',
    maxWidth: '80%',
  },
  category: {
    marginRight: 'auto',
    alignSelf: 'flex-end',
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
    fontWeight: 'bold',
    fontSize: 16,
  },
});
