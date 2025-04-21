import React, {useEffect, useState} from 'react';
import {useTheme} from '../contexts/themeContext';
import {useCart} from '../contexts/CartContext';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RatingStars from '../components/RatingStars';
import DetailTabView from '../components/detailTabView/DetailTabView';
import {getDetail} from '../apis/placeApi';
import BookMarkBtn from '../components/BookMarkBtn';

const StoreOverview = ({placeInfo, placeSummary}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [openHoursMore, setOpenHoursMore] = useState(false);
  const handleToggle = () => setOpenHoursMore(prev => !prev);

  return (
    <View style={[styles.section]}>
      <View style={styles.headerRow}>
        <Text style={styles.storeName}>{placeInfo?.displayName?.text}</Text>
        <Text style={styles.categoryText}>
          {placeInfo?.primaryTypeDisplayName?.text}
        </Text>
        <BookMarkBtn place={placeSummary} />
      </View>

      <TouchableOpacity onPress={handleToggle} style={styles.openStatusRow}>
        <Text style={styles.text}>
          {placeInfo?.regularOpeningHours?.openNow ? '영업중' : '영업종료'}
        </Text>
        <Text style={styles.text}>{placeInfo?.hours}</Text>
      </TouchableOpacity>

      {openHoursMore && (
        <View>
          {placeInfo?.regularOpeningHours?.weekdayDescriptions.map(
            (desc, i) => (
              <Text key={i} style={styles.text}>
                {desc}
              </Text>
            ),
          )}
        </View>
      )}

      <Text style={styles.text}>{placeInfo?.formattedAddress}</Text>

      <View style={styles.ratingRow}>
        <RatingStars rating={placeInfo?.rating} />
        <Text style={styles.text}>{placeInfo?.rating}</Text>
        <Text style={styles.text}>({placeInfo?.userRatingCount})</Text>
      </View>
    </View>
  );
};

const DetailPage = ({route}) => {
  const {placeId} = route.params;
  const [loading, setLoading] = useState(true);
  const [placeInfo, setPlaceInfo] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [accessibilityInfo, setAccessibilityInfo] = useState([]);
  const certInfo = null;

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {addPlace} = useCart();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getDetail(placeId);
        setPlaceInfo(res.data?.info);
        setReviewInfo(res.data?.reviewSummary);
        setAccessibilityInfo(res.data?.toggle);
      } catch (error) {
        console.error('상세 정보 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [placeId]);

  const placeSummary = {
    id: placeInfo?.id,
    name: placeInfo?.displayName?.text,
    simpleAddress: placeInfo?.formattedAddress,
    category: placeInfo?.primaryTypeDisplayName?.text,
  };

  const handleAddPress = () => {
    addPlace(placeSummary);
    Alert.alert(
      '장소 추가됨',
      `${placeSummary.name}이(가) 루트에 추가되었습니다.`,
    );
  };

  const handleCallPress = () => {
    if (
      !placeInfo.nationalPhoneNumber ||
      placeInfo.nationalPhoneNumber.length === 0
    ) {
      Alert.alert('전화번호 없음', '전화번호 정보가 없습니다.');
      return;
    }

    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${placeInfo.nationalPhoneNumber}`);
    } else {
      Alert.alert('아이폰은 지원하지 않습니다.');
      Linking.openURL(`tel://${placeInfo.nationalPhoneNumber}`);
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
        <ScrollView contentContainerStyle={{paddingBottom: 120}}>
          <View style={styles.container}>
            {placeInfo?.certification && (
              <View style={styles.certBanner}>
                <Text style={{color: theme.colors.text}}>
                  {certInfo?.label}
                </Text>
              </View>
            )}

            <Image
              style={styles.img}
              source={{uri: placeInfo?.image}}
              resizeMode="cover"
            />

            {/* placeSummary prop 추가 */}
            <StoreOverview placeInfo={placeInfo} placeSummary={placeSummary} />

            <View style={{height: '100%'}}>
              <DetailTabView
                review={reviewInfo}
                accessibility={accessibilityInfo}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBtnContainer}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddPress}>
            <Text style={styles.addBtnText}>여행 추가</Text>
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
      fontWeight: '800',
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
    },
    callBtn: {
      backgroundColor: theme.colors.secondary,
      paddingVertical: 20,
      alignItems: 'center',
      flex: 1,
    },
    addBtn: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 20,
      alignItems: 'center',
      aspectRatio: 1.6,
    },
    callBtnText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.primary,
    },
    addBtnText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
    },
  });
