'use client';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'EN',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    icon: '🇺🇸',
  },
  {
    value: 'vi',
    label: 'Tiếng Việt',
    countryCode: 'VN',
    adapterLocale: 'vi',
    numberFormat: { code: 'vi-VN', currency: 'VND' },
    icon: '🇻🇳',
  },
  {
    value: 'zh',
    label: '中文',
    countryCode: 'CN',
    adapterLocale: 'zh',
    numberFormat: { code: 'zh-CN', currency: 'CNY' },
    icon: '🇨🇳',
  },
];
