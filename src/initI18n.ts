import { initReactI18next } from 'react-i18next';
import commonDe from '@/locales/de.json';
import commonEn from '@/locales/en.json';
import i18n from 'i18next';

export const translationPromise = i18n.use(initReactI18next).init({
    resources: {
        en: {
            common: commonEn,
        },
        de: {
            common: commonDe,
        },
    },
    defaultNS: 'common',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        // Since react already escapes the values, we don't need to do it again
        escapeValue: false,
    },
});
