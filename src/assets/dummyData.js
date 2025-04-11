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
    '시각장애인을 위한 점자 안내가 마련되어 있으며, 주요 통로에 장애물 없이 이동이 가능합니다.',
  brailleBlock: '입구에서부터 카운터까지 점자 블록이 설치',
  braillePanel: '점자 안내판 표시',
};
