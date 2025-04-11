//DatailPage에서 사용
export const storeInfo = {
  id: 1,
  image:
    'https://img.freepik.com/free-photo/nature-animals_1122-1999.jpg?semt=ais_hybrid&w=740',
  name: '행복한식당',
  status: '영업 중',
  hours: '10:00 - 21:00',
  weeklyHours: {
    월: '10:00 - 21:00',
    화: '10:00 - 21:00',
    수: '10:00 - 21:00',
    목: '10:00 - 21:00',
    금: '10:00 - 21:00',
    토: '10:00 - 20:00',
    일: '휴무',
  },
  address: '부산광역시 해운대구 해운대로 123',
  rating: 4.5,
  reviewCount: 86,
  certification: 'kto', // 'kto' | 'hodeum' | null
  tel: '01012345678',
};

export const reviewInfo = {
  advantages: '직원들이 매우 친절하고 음식이 맛있어요.',
  disadvantages: '대기 시간이 길고 주차 공간이 부족해요.',
  accessibility:
    '입구에 경사로가 있어 휠체어 접근이 편하고, 내부 공간이 넓어요.',
};

export const accessibilityInfo = {
  description:
    '이 식당은 편안하고 아늑한 분위기에서 다양한 메뉴를 즐길 수 있는 캐주얼 다이닝 공간입니다. 신선한 재료를 사용한 음식과 친절한 서비스로 방문객들의 만족도를 높이고 있으며, 가족 모임이나 친구들과의 식사, 연인과의 데이트 장소로도 안성맞춤입니다. 내부는 깔끔하게 정돈되어 있고 테이블 간 간격도 넉넉해 쾌적한 식사 환경을 제공합니다. 주차 공간도 마련되어 있어 차량 이용 시에도 편리합니다.',
  brailleBlock: '입구에서부터 카운터까지 점자 블록이 설치',
  braillePanel: '점자 안내판 표시',
};
