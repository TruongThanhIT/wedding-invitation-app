import type { WeddingConfigType } from '@/types';

export type WeddingSiteMode = 'vn' | 'cn';

export const CURRENT_SITE_MODE: WeddingSiteMode =
  (process.env.NEXT_PUBLIC_SITE_MODE as WeddingSiteMode) || 'vn';

export const WEDDING_CONFIG_VN: WeddingConfigType = {
  date: new Date('2027-01-06T11:00:00+07:00'),
  bride: {
    name: 'Thanh',
    fullName: 'Trương Huỳnh Thụy Thái Thanh',
    photo: '/assets/images/bride.png',
  },
  groom: {
    name: 'Zhe',
    fullName: 'Zhe Ji',
    photo: '/assets/images/groom.png',
  },
  venue: {
    ceremony: {
      name: 'Tư Gia (gần Cầu Xã Vạt)',
      address: '95 Ấp An Hòa Nhì, Xã Tân Phú Trung, Tỉnh Đồng Tháp',
      time: '08:00 AM',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=10.2761941,105.7877176',
    },
    reception: {
      name: 'Nhà hàng Vạn Kim Long',
      address: '124 ĐT 848 Ấp Phú Long, Xã Tân Dương, Tỉnh Đồng Tháp',
      time: '11:00 AM',
      placeId: 'ChIJVQcY2lB_CjERkFlEkG-BOWc',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E1%BA%A8m+th%E1%BB%B1c+V%E1%BA%A1n+Kim+Long&query_place_id=ChIJVQcY2lB_CjERkFlEkG-BOWc',
    },
  },
  showRsvp: true,
  defaultLanguage: 'vi',
};

export const WEDDING_CONFIG_CN: WeddingConfigType = {
  date: new Date('2026-12-24T18:00:00+08:00'),
  bride: {
    name: 'Mia',
    fullName: 'Mia Truong',
    photo: '/assets/images/bride.png',
  },
  groom: {
    name: 'Joe',
    fullName: 'Zhe Ji',
    photo: '/assets/images/groom.png',
  },
  venue: {
    ceremony: {
      name: 'Groom Family Celebration',
      address: 'Xianyang, Shaanxi, China',
      time: '06:00 PM',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Xianyang+Shaanxi+China',
    },
    reception: {
      name: 'Wedding Banquet Hall',
      address: 'Xianyang, Shaanxi, China',
      time: '08:00 PM',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Xianyang+Shaanxi+China',
    },
  },
  showRsvp: false,
  defaultLanguage: 'zh',
};

export const WEDDING_CONFIG: WeddingConfigType =
  CURRENT_SITE_MODE === 'cn' ? WEDDING_CONFIG_CN : WEDDING_CONFIG_VN;
