import React, {useEffect, useState} from 'react';
import {useTheme} from '../contexts/themeContext';
import {useCart} from '../contexts/CartContext';
import {
  ActivityIndicator,
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
import SoundButton from '../components/SoundButton';
import Header from '../components/Header';
import FullScreenLoader from '../components/Loading/FullScreenLoader';
import {useNavigation} from '@react-navigation/native';
import {useVision} from '../contexts/visionContext';

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
  const navigation = useNavigation();
  const {placeId} = route.params;
  const [loading, setLoading] = useState(true);
  const [placeInfo, setPlaceInfo] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [accessibilityInfo, setAccessibilityInfo] = useState([]);
  const [soundList, setSoundList] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const {visionMode} = useVision();

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const {addPlace} = useCart();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getDetail(placeId);
        setPlaceInfo(res.data?.info || []);
        setReviewInfo(res.data?.reviewSummary || []);
        setAccessibilityInfo(res.data?.toggle || []);
        setSoundList(res.data?.soundList || []);
        setPhotos(res.data?.photos || []);
      } catch (error) {
        Alert.alert('오류가 발생했어요.');
        navigation.goBack();
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
    return <FullScreenLoader />;
  } else {
    return (
      <View style={{flex: 1}}>
        <Header
          title={
            accessibilityInfo ? '관광공사 인증 시각장애 이용 가능 장소' : null
          }
          titleSize={14}
        />
        <SoundButton categories={soundList} />
        <ScrollView contentContainerStyle={{paddingBottom: 120}}>
          <View style={styles.container}>
            {visionMode !== '전맹' && (
              <View style={{position: 'relative', height: 200}}>
                {imageLoading && (
                  <View style={styles.imageLoader}>
                    <ActivityIndicator
                      size="large"
                      color={theme.colors.textOnPrimary}
                    />
                  </View>
                )}
                <Image
                  style={styles.img}
                  source={{uri: photos[0]}}
                  resizeMode="cover"
                  onLoadEnd={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                  }}
                />
              </View>
            )}

            <StoreOverview placeInfo={placeInfo} placeSummary={placeSummary} />

            <View
              style={{
                height: '100%',
                backgroundColor: theme.colors.background,
              }}>
              <DetailTabView
                review={reviewInfo}
                accessibility={accessibilityInfo}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBtnContainer}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddPress}
            accessibilityRole="button"
            accessibilityLabel="이 장소를 여행 루트에 추가하기">
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
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingBottom: 100,
    },
    section: {
      padding: 20,
      gap: 4,
    },
    img: {
      height: 200,
    },
    imageLoader: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-end',
    },
    storeName: {
      color: theme.colors.secondary,
      fontWeight: '800',
      fontSize: 18,
      maxWidth: '80%',
    },
    categoryText: {
      color: theme.colors.textOnPrimary,
      marginRight: 'auto',
    },
    openStatusRow: {
      flexDirection: 'row',
    },
    text: {
      color: theme.colors.textOnPrimary,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    bottomBtnContainer: {
      flexDirection: 'row',
    },
    callBtn: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 20,
      alignItems: 'center',
      flex: 1,
    },
    addBtn: {
      backgroundColor: theme.colors.secondary,
      paddingVertical: 20,
      alignItems: 'center',
      aspectRatio: 1.6,
    },
    callBtnText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.textOnPrimary,
    },
    addBtnText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.primary,
    },
  });
