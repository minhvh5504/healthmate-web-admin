import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import VALIDATION_EN from './langs/en/validation.json';
import VALIDATION_VN from './langs/vi/validation.json';
import AUTH_EN from './langs/en/auth.json';
import AUTH_VN from './langs/vi/auth.json';
import DASHBOARD_EN from './langs/en/dashboard.json';
import DASHBOARD_VN from './langs/vi/dashboard.json';
import HOTEL_EN from './langs/en/hotel.json';
import HOTEL_VN from './langs/vi/hotel.json';
import BOOKING_EN from './langs/en/booking.json';
import BOOKING_VN from './langs/vi/booking.json';

const i18nInstance = i18n.createInstance();

i18nInstance.use(initReactI18next).init({
  resources: {
    en: {
      validation: VALIDATION_EN,
      auth: AUTH_EN,
      dashboard: DASHBOARD_EN,
      hotel: HOTEL_EN,
      booking: BOOKING_EN,
    },
    vi: {
      validation: VALIDATION_VN,
      auth: AUTH_VN,
      dashboard: DASHBOARD_VN,
      hotel: HOTEL_VN,
      booking: BOOKING_VN,
    },
  },
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['path', 'cookie', 'navigator'],
    lookupFromPathIndex: 0,
  },
  react: {
    useSuspense: false,
  },
});

export default i18nInstance;
