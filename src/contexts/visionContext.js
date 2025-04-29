import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VisionContext = createContext();

export const VisionProvider = ({children}) => {
  const [visionMode, setVisionMode] = useState('normal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisionMode = async () => {
      try {
        const savedVisionMode = await AsyncStorage.getItem('visionSetting');
        if (savedVisionMode) {
          setVisionMode(savedVisionMode);
        } else {
          setVisionMode('normal');
        }
      } catch (error) {
        console.error('AsyncStorage 시각정보 로드 중 오류 ', error);
      } finally {
        setLoading(false); // 로딩 상태 완료
      }
    };

    loadVisionMode();
  }, []);

  const updateVisionMode = async mode => {
    try {
      setVisionMode(mode);
      await AsyncStorage.setItem('visionSetting', mode);
    } catch (error) {
      console.error('Error saving vision mode to AsyncStorage', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <VisionContext.Provider value={{visionMode, updateVisionMode}}>
      {children}
    </VisionContext.Provider>
  );
};

// useVision 훅을 사용해서 context에 접근
export const useVision = () => {
  return useContext(VisionContext);
};
