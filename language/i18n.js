import I18n, { getLanguages } from 'react-native-i18n';
import en from './en';  //英文
import zh from './zh';  //中文
import th from './th';  //泰国
import jp from './jp';  //日本


I18n.defaultLocale = 'en';
I18n.fallbacks = true;

// I18n.locale = 'en';
I18n.translations = {
	zh,
	en,
	th,
	jp
};

export { I18n, getLanguages };
