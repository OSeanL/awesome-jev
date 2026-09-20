import { defaultLocale, isLocale, localeConfig, locales, type Locale } from './config';
import en from './messages/en';
import zh from './messages/zh';
import ja from './messages/ja';
import ko from './messages/ko';
import es from './messages/es';
import ptBr from './messages/pt-br';

const messages = { en, zh, ja, ko, es, 'pt-br': ptBr } as const;

export const getLocale = (value: string | undefined): Locale => isLocale(value) ? value : defaultLocale;
export const getMessages = (locale: Locale) => messages[locale];
export { defaultLocale, localeConfig, locales, type Locale };
