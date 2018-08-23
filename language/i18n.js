import I18n, { getLanguages } from 'react-native-i18n';
import en from './en'; //英文
import zh from './zh'; //中文
import th from './th'; //泰国
import ja from './ja'; //日本
import vi from './vi'; //越南语

I18n.defaultLocale = 'en';
I18n.fallbacks = true;

// I18n.locale = 'en';
I18n.translations = {
	zh,
	en,
	th,
	ja,
	vi
};

const languagePackAll_Data = {
	zh: I18n.t('my.sysSetting.language.changeToChinese'),
	en: I18n.t('my.sysSetting.language.changeToEnglish'),
	th: I18n.t('my.sysSetting.language.changeToThai'),
	ja: I18n.t('my.sysSetting.language.changeToJp'),
	vi: I18n.t('my.sysSetting.language.changeToVi'),

};

export { I18n, getLanguages, languagePackAll_Data };
