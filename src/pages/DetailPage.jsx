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
  const styles = getStyles(theme);

  const [openHoursMore, setOpenHoursMore] = useState(false);
  const handleToggle = () => setOpenHoursMore(prev => !prev);

  const bookMarkPlace = {
    id: storeInfo.id,
    name: storeInfo?.displayName?.text,
    simpleAddress: storeInfo?.formattedAddress,
    category: storeInfo?.primaryTypeDisplayName?.text,
  };

  return (
    <View style={[styles.section]}>
      <View style={styles.headerRow}>
        <Text style={styles.storeName}>{storeInfo?.displayName?.text}</Text>
        <Text style={styles.categoryText}>
          {storeInfo?.primaryTypeDisplayName?.text}
        </Text>
        <BookMarkBtn place={bookMarkPlace} />
      </View>

      <TouchableOpacity onPress={handleToggle} style={styles.openStatusRow}>
        <Text style={styles.text}>
          {storeInfo?.regularOpeningHours?.openNow ? '영업중' : '영업종료'}
        </Text>
        <Text style={styles.text}>{storeInfo?.hours}</Text>
      </TouchableOpacity>

      {openHoursMore && (
        <View>
          {storeInfo?.regularOpeningHours?.weekdayDescriptions.map(
            (desc, i) => (
              <Text key={i} style={styles.text}>
                {desc}
              </Text>
            ),
          )}
        </View>
      )}

      <Text style={styles.text}>{storeInfo?.formattedAddress}</Text>

      <View style={styles.ratingRow}>
        <RatingStars rating={storeInfo?.rating} />
        <Text style={styles.text}>{storeInfo?.rating}</Text>
        <Text style={styles.text}>({storeInfo?.userRatingCount})</Text>
      </View>
    </View>
  );
};

const DetailPage = ({route}) => {
  const {placeId} = route.params;
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState([]);
  const [reviewInfo, setReciewInfo] = useState([]);
  const certInfo = certConfig[storeInfo?.certification] || null;

  const {theme} = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getDetail(placeId);
        console.log(res.data);
        setStoreInfo(res.data?.googleMapPlaceDetail);
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
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
          <View style={styles.container}>
            {storeInfo?.certification && (
              <View style={styles.certBanner}>
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

        <View style={styles.bottomBtnContainer}>
          <TouchableOpacity style={styles.mapBtn}>
            <Text style={styles.mapBtnText}>구글맵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn} onPress={handleCallPress}>
            <Text style={styles.callBtnText}>전화 문의하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default DetailPage;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      gap: 10,
      flex: 1,
      height: '100%',
      backgroundColor: theme.colors.primary,
    },
    section: {
      padding: 20,
      gap: 4,
      borderWidth: 1,
      borderTopColor: theme.colors.secondary,
      borderBottomColor: theme.colors.secondary,
    },
    certBanner: {
      padding: 20,
      alignItems: 'center',
    },
    img: {
      height: 200,
      backgroundColor: 'grey',
    },
    headerRow: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'flex-start',
    },
    storeName: {
      color: theme.colors.secondary,
      fontWeight: 800,
      fontSize: 18,
      maxWidth: '80%',
    },
    categoryText: {
      color: theme.colors.primary,
      marginRight: 'auto',
      alignSelf: 'flex-end',
    },
    openStatusRow: {
      flexDirection: 'row',
    },
    text: {
      color: theme.colors.text,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomBtnContainer: {
      flexDirection: 'row',
      marginVertical: 1, //수정해야됨
    },
    callBtn: {
      backgroundColor: theme.colors.secondary,
      paddingVertical: 20,
      alignItems: 'center',
      flex: 6,
    },
    mapBtn: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 20,
      alignItems: 'center',
      flex: 1,
    },
    callBtnText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.primary,
    },
    mapBtnText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.accent,
    },
  });
