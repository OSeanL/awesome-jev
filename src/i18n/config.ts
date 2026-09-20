export const localeConfig = {
  en: {
    label: 'English',
    flag: 'us',
    languageTag: 'en',
    openGraphLocale: 'en_US',
    path: '',
    readme: 'README.md',
  },
  zh: {
    label: '简体中文',
    flag: 'cn',
    languageTag: 'zh-Hans',
    openGraphLocale: 'zh_CN',
    path: 'zh',
    readme: 'README.zh-Hans.md',
  },
  ja: {
    label: '日本語', flag: 'jp', languageTag: 'ja', openGraphLocale: 'ja_JP', path: 'ja', readme: 'README.ja.md',
  },
  ko: {
    label: '한국어', flag: 'kr', languageTag: 'ko', openGraphLocale: 'ko_KR', path: 'ko', readme: 'README.ko.md',
  },
  es: {
    label: 'Español', flag: 'es', languageTag: 'es', openGraphLocale: 'es_ES', path: 'es', readme: 'README.es.md',
  },
  'pt-br': {
    label: 'Português (Brasil)', flag: 'br', languageTag: 'pt-BR', openGraphLocale: 'pt_BR', path: 'pt-br', readme: 'README.pt-BR.md',
  },
} as const;

export type Locale = keyof typeof localeConfig;

export const defaultLocale: Locale = 'en';
export const locales = Object.keys(localeConfig) as Locale[];

export const isLocale = (value: string | undefined): value is Locale =>
  typeof value === 'string' && value in localeConfig;

export const getLocalePath = (locale: Locale) => localeConfig[locale].path
  ? `${localeConfig[locale].path}/`
  : '';
