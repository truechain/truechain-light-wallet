import I18n, { getLanguages } from 'react-native-i18n';
import en from './en';
import zh from './zh';

I18n.defaultLocale = 'en';
I18n.fallbacks = true;

// I18n.locale = 'en';
I18n.translations = {
	zh,
	en
};

export { I18n, getLanguages };
