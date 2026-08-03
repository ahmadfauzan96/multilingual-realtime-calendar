import { isRtlLang } from "rtl-detect";

// ? ref: http://en.wikipedia.org/wiki/Right-to-left
const right2LeftLanguages = [
  "aao" /* Algerian Saharan Arabic */,
  "abv" /* 'العربية البحرانية', Bahrani Arabic */,
  "acm" /* 'اللهجة العراقية', Gelet/South Mesopotamian Arabic */,
  "acq" /* 'لهجة تعزية عدنية', Southern Yemeni Arabic */,
  "acw" /* 'حجازي', Hejazi Arabic */,
  "acx" /* 'اللهجة العمانية', Omani Arabic */,
  "adf" /* Dhofari Arabic */,
  "ae" /* Avestan */,
  "aeb" /* 'تونسي', Tunisian Arabic */,
  "aec" /* 'صعيدى', Saʽīdi (Upper Egyptian) Arabic */,
  "afb" /* 'خليجي / اللهجة الخليجية', Gulf Arabic */,
  "aju" /* 'العربية المغربية الدارجة', Judeo-Moroccan Arabic */,
  "apc" /* 'شامي', Levantine Arabic */,
  "apd" /* 'لهجة سودانية', Sudanese Arabic */,
  "ar" /* 'العربية', Arabic */,
  "arb" /* 'العربية الفصحى الحديثة', Modern Standard Arabic */,
  "arc" /* Aramaic */,
  "arq" /* 'الدارجة الجزائرية', Algerian Arabic */,
  "ars" /* 'نجدي', Najdi Arabic */,
  "ary" /* 'العربية المغربية الدارجة', Moroccan Arabic */,
  "arz" /* 'مصرى', Egyptian Arabic */,
  "avl" /* Levantine Bedawi Arabic */,
  "ayh" /* 'اللهجة الحضرمية', Hadhrami Arabic */,
  "ayl" /* 'ليبي', Libyan Arabic */,
  "ayn" /* Sanʽani Arabic */,
  "ayp" /* 'لهجة موصلية', Qeltu/North Mesopotamian Arabic */,
  "bcc" /* 'بلوچی مکرانی', Southern Balochi */,
  "bqi" /* 'بختياري', Bakhtiari */,
  "ckb" /* 'Soranî / سورانی', Sorani */,
  "dv" /*  'ދިވެހި', Dhivehi */,
  "fa" /* 'فارسی', Persian */,
  "glk" /* 'گیلکی', Gilaki */,
  "he" /* 'עברית', Hebrew */,
  "jye" /* 'תימנית-יהודית', Judeo-Yemeni Arabic */,
  "ks" /* 'کٲشُر', Kashmiri */,
  "mey" /* 'حسانية', Hassaniya Arabic */,
  "mid" /* 'ࡋࡉࡔࡀࡍࡀ ࡖ ࡌࡀࡍࡃࡀࡉࡉࡀ', Modern Mandaic */,
  "myz" /* 'ࡋࡉࡔࡀࡍࡀ ࡖ ࡌࡀࡍࡃࡀࡉࡉࡀ', Classical Mandaic */,
  "mzn" /* 'مازِرونی', Mazanderani */,
  "nqo" /* N’Ko */,
  "pnb" /* 'پنجابی', Western Punjabi */,
  "prs" /* 'دری', Darī */,
  "ps" /* 'پښتو', Pashto, */,
  "sd" /* 'سنڌي', Sindhi */,
  "shu" /* 'لهجة تشادية', Chadian Arabic */,
  "skr" /* 'سرائیکی', Saraiki, */,
  "sqr" /* 'العربية الصقلية', Sicilian Arabic, */,
  "ssh" /* 'اللهجة الشحية', Shihhi Arabic, */,
  "syr" /* 'ܠܫܢܐ ܣܘܪܝܝܐ', Syriac, */,
  "ug" /* 'Uyghurche / Уйғурчә / ئۇيغۇرچە', Uyghur */,
  "ur" /* 'اردو', Urdu */,
  "xaa" /* 'العربية الأندلسية', Andalusian Arabic */,
  "yhd" /* 'ערבית יהודית / عربية يهودية', Judeo-Iraqi Arabic */,
  "yi" /* 'ייִדיש', Yiddish */,
];
// ? Table of scripts in Unicode: https://en.wikipedia.org/wiki/Script_(Unicode)
// * Any language written in a right-to-left script from the array below should be written from right to left
const right2LeftScripts = [
  "Arab",
  "Aran",
  "Hebr",
  "Thaa",
  "Nkoo",
  "Tfng",
  "Adlm",
  "Gara",
  "Samr",
  "Mand",
  "Mend",
  "Rohg",
  // * Ancient scripts
  "Armi",
  "Avst",
  "Chrs",
  "Cprt",
  "Elym",
  "Hatr",
  "Hung",
  "Khar",
  "Lydi",
  "Mani",
  "Merc",
  "Mero",
  "Narb",
  "Nbat",
  "Orkh",
  "Palm",
  "Phli",
  "Phlp",
  "Phnx",
  "Prti",
  "Sarb",
  "Sidt",
  "Sogo",
  "Syrc",
  "Syre",
  "Syrj",
  "Syrn",
  "Yezi",
];
// * An originally right-to-left language should be written in a left-to-right script
// * given such script is available in the array below
const left2RightScripts = [
  // * Latin, Greek, and Cyrillic scripts
  "Latn",
  "Grek",
  "Cyrl",
  "Cyrs",
  // * Indonesian Scripts
  "Bali",
  "Batk",
  "Bugi",
  "Java",
  "Maka",
  "Rjng",
  "Sund",
  // * Southeast Asian Scripts
  "Khmr",
  "Lana",
  "Laoo",
  "Mymr",
  "Qaag",
  "Talu",
  "Tavt",
  "Thai",
  // * South Asian Scripts
  "Beng",
  "Deva",
  "Gujr",
  "Guru",
  "Knda",
  "Mlym",
  "Mtei",
  "Olck",
  "Onao",
  "Orya",
  "Sinh",
  "Sora",
  "Taml",
  "Telu",
  "Tibt",
  "Wara",
  "Wcho",
  // * East Asian Scripts
  "Hang",
  "Hani",
  "Hans",
  "Hant",
  "Hira",
  "Hntl",
  "Hrkt",
  "Jamo",
  "Jpan",
  "Kana",
  "Mong",
];

/**
 * Determine whether the language is right-to-left language.
 * @param {string} lang -  The language code.
 */
const isRight2LeftLanguage = lang => right2LeftLanguages.includes(lang);
/**
 * Determine whether the script is written from right to left.
 * @param {string} script -  The script used to write any language.
 */
const isRight2LeftScript = script => right2LeftScripts.includes(script);
/**
 * Determine whether the script is written from left to right.
 * @param {string} script -  The script used to write any language.
 */
const isLeft2RightScript = script => left2RightScripts.includes(script);

// TODO: Getting direction automatically according to locale used
/**
 * @param {string} locale -  The locale string.
 * @return {"rtl" | "ltr"} The text direction.
 */
export function getDirection(locale) {
  const { language, script = "" } = new Intl.Locale(locale);
  return isRtlLang(language) ||
    (isRight2LeftLanguage(language) && !isLeft2RightScript(script)) ||
    isRight2LeftScript(script)
    ? "rtl"
    : "ltr";
}
