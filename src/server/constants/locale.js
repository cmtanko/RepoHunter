import Config from '../config/config';
import localeEnglish from '../constants/locale_en';

let localeType = {
  'en': localeEnglish,
};

export default localeType[Config.locale];