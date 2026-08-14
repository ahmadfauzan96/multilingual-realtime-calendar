/**
 * @typedef {Object} NewAndOldTimeZone
 * @property {string} oldTz
 * @property {string} newTz
 * @property {string} regionalCode
 */

/** @type {Array<NewAndOldTimeZone>} */
export const compatibilityTimeZones = [
  { oldTz: "Africa/Asmera", newTz: "Africa/Asmara", regionalCode: "ER" },
  { oldTz: "Africa/Timbuktu", newTz: "Africa/Bamako", regionalCode: "ML" },
  { oldTz: "America/Buenos_Aires", newTz: "America/Argentina/Buenos_Aires", regionalCode: "AR" },
  { oldTz: "America/Catamarca", newTz: "America/Argentina/Catamarca", regionalCode: "AR" },
  {
    oldTz: "America/Argentina/ComodRivadavia",
    newTz: "America/Argentina/Catamarca",
    regionalCode: "AR",
  },
  { oldTz: "America/Atka", newTz: "America/Adak", regionalCode: "US" },
  { oldTz: "America/Coral_Harbour", newTz: "America/Atikokan", regionalCode: "CA" },
  { oldTz: "America/Cordoba", newTz: "America/Argentina/Cordoba", regionalCode: "AR" },
  { oldTz: "America/Ensenada", newTz: "America/Tijuana", regionalCode: "MX" },
  { oldTz: "America/Fort_Wayne", newTz: "America/Indiana/Indianapolis", regionalCode: "US" },
  { oldTz: "America/Godthab", newTz: "America/Nuuk", regionalCode: "GL" },
  { oldTz: "America/Indianapolis", newTz: "America/Indiana/Indianapolis", regionalCode: "US" },
  { oldTz: "America/Jujuy", newTz: "America/Argentina/Jujuy", regionalCode: "AR" },
  { oldTz: "America/Knox_IN", newTz: "America/Indiana/Knox", regionalCode: "US" },
  { oldTz: "America/Louisville", newTz: "America/Kentucky/Louisville", regionalCode: "US" },
  { oldTz: "America/Mendoza", newTz: "America/Argentina/Mendoza", regionalCode: "AR" },
  { oldTz: "America/Montreal", newTz: "America/Toronto", regionalCode: "CA" },
  { oldTz: "America/Nipigon", newTz: "America/Toronto", regionalCode: "CA" },
  { oldTz: "America/Pangnirtung", newTz: "America/Iqaluit", regionalCode: "CA" },
  { oldTz: "America/Porto_Acre", newTz: "America/Rio_Branco", regionalCode: "BR" },
  { oldTz: "America/Rainy_River", newTz: "America/Winnipeg", regionalCode: "CA" },
  { oldTz: "America/Rosario", newTz: "America/Argentina/Cordoba", regionalCode: "AR" },
  { oldTz: "America/Santa_Isabel", newTz: "America/Tijuana", regionalCode: "MX" },
  { oldTz: "America/Shiprock", newTz: "America/Denver", regionalCode: "US" },
  { oldTz: "America/Thunder_Bay", newTz: "America/Toronto", regionalCode: "CA" },
  { oldTz: "America/Virgin", newTz: "America/St_Thomas", regionalCode: "VI" },
  { oldTz: "America/Yellowknife", newTz: "America/Edmonton", regionalCode: "CA" },
  { oldTz: "Antarctica/South_Pole", newTz: "Antarctica/McMurdo", regionalCode: "AQ" },
  { oldTz: "Asia/Ashkhabad", newTz: "Asia/Ashgabat", regionalCode: "TM" },
  { oldTz: "Asia/Calcutta", newTz: "Asia/Kolkata", regionalCode: "IN" },
  { oldTz: "Asia/Choibalsan", newTz: "Asia/Ulaanbaatar", regionalCode: "MN" },
  { oldTz: "Asia/Chongqing", newTz: "Asia/Shanghai", regionalCode: "CN" },
  { oldTz: "Asia/Chungking", newTz: "Asia/Shanghai", regionalCode: "CN" },
  { oldTz: "Asia/Dacca", newTz: "Asia/Dhaka", regionalCode: "BD" },
  { oldTz: "Asia/Harbin", newTz: "Asia/Shanghai", regionalCode: "CN" },
  { oldTz: "Asia/Istanbul", newTz: "Europe/Istanbul", regionalCode: "TR" },
  { oldTz: "Asia/Kashgar", newTz: "Asia/Urumqi", regionalCode: "CN" },
  { oldTz: "Asia/Katmandu", newTz: "Asia/Kathmandu", regionalCode: "NP" },
  { oldTz: "Asia/Macao", newTz: "Asia/Macau", regionalCode: "MO" },
  { oldTz: "Asia/Rangoon", newTz: "Asia/Yangon", regionalCode: "MM" },
  { oldTz: "Asia/Saigon", newTz: "Asia/Ho_Chi_Minh", regionalCode: "VN" },
  { oldTz: "Asia/Tel_Aviv", newTz: "Asia/Jerusalem", regionalCode: "IL" },
  { oldTz: "Asia/Thimbu", newTz: "Asia/Thimphu", regionalCode: "BT" },
  { oldTz: "Asia/Ujung_Pandang", newTz: "Asia/Makassar", regionalCode: "ID" },
  { oldTz: "Asia/Ulan_Bator", newTz: "Asia/Ulaanbaatar", regionalCode: "MN" },
  { oldTz: "Atlantic/Faeroe", newTz: "Atlantic/Faroe", regionalCode: "FO" },
  { oldTz: "Atlantic/Jan_Mayen", newTz: "Arctic/Longyearbyen", regionalCode: "SJ" },
  { oldTz: "Australia/ACT", newTz: "Australia/Sydney", regionalCode: "AU" },
  { oldTz: "Australia/Canberra", newTz: "Australia/Sydney", regionalCode: "AU" },
  { oldTz: "Australia/Currie", newTz: "Australia/Hobart", regionalCode: "AU" },
  { oldTz: "Australia/LHI", newTz: "Australia/Lord_Howe", regionalCode: "AU" },
  { oldTz: "Australia/North", newTz: "Australia/Darwin", regionalCode: "AU" },
  { oldTz: "Australia/NSW", newTz: "Australia/Sydney", regionalCode: "AU" },
  { oldTz: "Australia/Queensland", newTz: "Australia/Brisbane", regionalCode: "AU" },
  { oldTz: "Australia/South", newTz: "Australia/Adelaide", regionalCode: "AU" },
  { oldTz: "Australia/Tasmania", newTz: "Australia/Hobart", regionalCode: "AU" },
  { oldTz: "Australia/Victoria", newTz: "Australia/Melbourne", regionalCode: "AU" },
  { oldTz: "Australia/West", newTz: "Australia/Perth", regionalCode: "AU" },
  { oldTz: "Australia/Yancowinna", newTz: "Australia/Broken_Hill", regionalCode: "AU" },
  { oldTz: "Brazil/Acre", newTz: "America/Rio_Branco", regionalCode: "BR" },
  { oldTz: "Brazil/DeNoronha", newTz: "America/Noronha", regionalCode: "BR" },
  { oldTz: "Brazil/East", newTz: "America/Sao_Paulo", regionalCode: "BR" },
  { oldTz: "Brazil/West", newTz: "America/Manaus", regionalCode: "BR" },
  // Legacy Canadian zones : START
  { oldTz: "Canada/Atlantic", newTz: "America/Halifax", regionalCode: "CA" },
  { oldTz: "Canada/Central", newTz: "America/Winnipeg", regionalCode: "CA" },
  { oldTz: "Canada/Eastern", newTz: "America/Toronto", regionalCode: "CA" },
  { oldTz: "Canada/East-Saskatchewan", newTz: "America/Regina", regionalCode: "CA" }, // undetected in SpiderMonkey
  { oldTz: "Canada/Mountain", newTz: "America/Edmonton", regionalCode: "CA" },
  { oldTz: "Canada/Newfoundland", newTz: "America/St_Johns", regionalCode: "CA" },
  { oldTz: "Canada/Pacific", newTz: "America/Vancouver", regionalCode: "CA" },
  { oldTz: "Canada/Saskatchewan", newTz: "America/Regina", regionalCode: "CA" },
  { oldTz: "Canada/Yukon", newTz: "America/Whitehorse", regionalCode: "CA" },
  // Legacy Canadian zones : END
  { oldTz: "CET", newTz: "Europe/Brussels", regionalCode: "BE" },
  { oldTz: "Chile/Continental", newTz: "America/Santiago", regionalCode: "CL" },
  { oldTz: "Chile/EasterIsland", newTz: "Pacific/Easter", regionalCode: "CL" },
  { oldTz: "CST", newTz: "America/Chicago", regionalCode: "US" },
  { oldTz: "CST6CDT", newTz: "America/Chicago", regionalCode: "US" },
  { oldTz: "Cuba", newTz: "America/Havana", regionalCode: "CU" },
  { oldTz: "DFT", newTz: "Europe/Brussels", regionalCode: "UN" }, // undetected in SpiderMonkey and V8
  { oldTz: "EET", newTz: "Europe/Athens", regionalCode: "GR" },
  { oldTz: "Egypt", newTz: "Africa/Cairo", regionalCode: "EG" },
  { oldTz: "Eire", newTz: "Europe/Dublin", regionalCode: "IE" },
  { oldTz: "EST", newTz: "America/Panama", regionalCode: "PA" },
  { oldTz: "EST5EDT", newTz: "America/New_York", regionalCode: "US" },
  { oldTz: "Europe/Belfast", newTz: "Europe/London", regionalCode: "GB" },
  { oldTz: "Europe/Kiev", newTz: "Europe/Kyiv", regionalCode: "UA" },
  { oldTz: "Europe/Nicosia", newTz: "Asia/Nicosia", regionalCode: "CY" },
  { oldTz: "Europe/Tiraspol", newTz: "Europe/Chisinau", regionalCode: "MD" },
  { oldTz: "Europe/Uzhgorod", newTz: "Europe/Kyiv", regionalCode: "UA" },
  { oldTz: "Europe/Zaporozhye", newTz: "Europe/Kyiv", regionalCode: "UA" },
  // Legacy UK zones : START
  { oldTz: "BST", newTz: "Europe/London", regionalCode: "GB" }, // undetected in SpiderMonkey
  // { oldTz: "BST", newTz: "Asia/Dhaka", regionalCode: "BD" }, // detected in V8
  { oldTz: "GB", newTz: "Europe/London", regionalCode: "GB" },
  { oldTz: "GB/Eire", newTz: "Europe/London", regionalCode: "GB" }, // undetected in SpiderMonkey and V8
  // Legacy UK zones : END
  { oldTz: "Hongkong", newTz: "Asia/Hong_Kong", regionalCode: "HK" },
  { oldTz: "HongKong", newTz: "Asia/Hong_Kong", regionalCode: "HK" },
  { oldTz: "HST", newTz: "Pacific/Honolulu", regionalCode: "US" },
  { oldTz: "Iceland", newTz: "Atlantic/Reykjavik", regionalCode: "IS" },
  { oldTz: "Iran", newTz: "Asia/Tehran", regionalCode: "IR" },
  { oldTz: "Israel", newTz: "Asia/Jerusalem", regionalCode: "IL" },
  { oldTz: "IST", newTz: "Europe/Dublin", regionalCode: "IE" }, // undetected in SpiderMonkey
  // { oldTz: "IST", newTz: "Asia/Calcutta", regionalCode: "IN" }, // detected in V8
  { oldTz: "Jamaica", newTz: "America/Jamaica", regionalCode: "JM" },
  { oldTz: "Japan", newTz: "Asia/Tokyo", regionalCode: "JP" },
  { oldTz: "Kwajalein", newTz: "Pacific/Kwajalein", regionalCode: "MH" },
  { oldTz: "Libya", newTz: "Africa/Tripoli", regionalCode: "LY" },
  { oldTz: "MET", newTz: "Europe/Brussels", regionalCode: "BE" },
  // Legacy Mexican zones : START
  { oldTz: "Mexico/BajaNorte", newTz: "America/Tijuana", regionalCode: "MX" },
  { oldTz: "Mexico/BajaSur", newTz: "America/Mazatlan", regionalCode: "MX" },
  { oldTz: "Mexico/General", newTz: "America/Mexico_City", regionalCode: "MX" },
  // Legacy Mexican zones : END
  { oldTz: "MST", newTz: "America/Phoenix", regionalCode: "US" },
  { oldTz: "MST7MDT", newTz: "America/Denver", regionalCode: "US" },
  { oldTz: "Navajo", newTz: "America/Denver", regionalCode: "US" },
  // Legacy New Zealand zones: START
  { oldTz: "NZ", newTz: "Pacific/Auckland", regionalCode: "NZ" },
  { oldTz: "NZ-CHAT", newTz: "Pacific/Chatham", regionalCode: "NZ" },
  // Legacy New Zealand zones: END
  { oldTz: "Pacific/Enderbury", newTz: "Pacific/Kanton", regionalCode: "KI" },
  { oldTz: "Pacific/Johnston", newTz: "Pacific/Honolulu", regionalCode: "UM" },
  { oldTz: "Pacific/Ponape", newTz: "Pacific/Pohnpei", regionalCode: "FM" },
  { oldTz: "Pacific/Samoa", newTz: "Pacific/Pago_Pago", regionalCode: "AS" },
  { oldTz: "Pacific/Truk", newTz: "Pacific/Chuuk", regionalCode: "FM" },
  { oldTz: "Pacific/Yap", newTz: "Pacific/Chuuk", regionalCode: "FM" },
  { oldTz: "Poland", newTz: "Europe/Warsaw", regionalCode: "PL" },
  { oldTz: "Portugal", newTz: "Europe/Lisbon", regionalCode: "PT" },
  { oldTz: "PRC", newTz: "Asia/Shanghai", regionalCode: "CN" },
  { oldTz: "PST", newTz: "America/Los_Angeles", regionalCode: "US" },
  { oldTz: "PST8PDT", newTz: "America/Los_Angeles", regionalCode: "US" },
  { oldTz: "ROC", newTz: "Asia/Taipei", regionalCode: "TW" },
  { oldTz: "ROK", newTz: "Asia/Seoul", regionalCode: "KR" },
  { oldTz: "Singapore", newTz: "Asia/Singapore", regionalCode: "SG" },
  { oldTz: "Turkey", newTz: "Europe/Istanbul", regionalCode: "TR" },
  // Legacy US zones : START
  { oldTz: "US/Alaska", newTz: "America/Anchorage", regionalCode: "US" },
  { oldTz: "US/Aleutian", newTz: "America/Adak", regionalCode: "US" },
  { oldTz: "US/Arizona", newTz: "America/Phoenix", regionalCode: "US" },
  { oldTz: "US/Central", newTz: "America/Chicago", regionalCode: "US" },
  { oldTz: "US/East-Indiana", newTz: "America/Indiana/Indianapolis", regionalCode: "US" },
  { oldTz: "US/Eastern", newTz: "America/New_York", regionalCode: "US" },
  { oldTz: "US/Hawaii", newTz: "Pacific/Honolulu", regionalCode: "US" },
  { oldTz: "US/Indiana-Starke", newTz: "America/Indiana/Knox", regionalCode: "US" },
  { oldTz: "US/Michigan", newTz: "America/Detroit", regionalCode: "US" },
  { oldTz: "US/Mountain", newTz: "America/Denver", regionalCode: "US" },
  { oldTz: "US/Pacific", newTz: "America/Los_Angeles", regionalCode: "US" },
  { oldTz: "US/Pacific-New", newTz: "America/Los_Angeles", regionalCode: "US" }, // undetected in SpiderMonkey
  // Legacy US zones : END
  { oldTz: "US/Samoa", newTz: "Pacific/Pago_Pago", regionalCode: "AS" },
  { oldTz: "WAT", newTz: "Africa/Kinshasa", regionalCode: "CD" }, // undetected in SpiderMonkey and V8
  { oldTz: "W-SU", newTz: "Europe/Moscow", regionalCode: "RU" }, // Soviet Union winter time (deprecated)
  { oldTz: "WET", newTz: "Europe/Lisbon", regionalCode: "PT" },
  { oldTz: "WEST", newTz: "Europe/Brussels", regionalCode: "BE" }, // undetected in SpiderMonkey and V8
  { oldTz: "WEDT", newTz: "Europe/Brussels", regionalCode: "BE" }, // undetected in SpiderMonkey and V8
  { oldTz: "Zulu", newTz: "UTC", regionalCode: "UN" },
];

// ? JavaScript engines:
// * V8 (Chrome, Edge, Opera, Brave, Vivaldi, Ecosia, Node.js)
// * SpiderMonkey (Firefox, Gecko, Tor Browser)
// * JavaScriptCore (Safari, React Native, Bun)
// * Hermes (React Native)
// * JerryScript (IoT devices, Moddable, Mongoose OS)
// * QJS (Qt) - current
// * QtScript (Qt) - obsolete
// * Boa (IoT devices)
// * Carakan (Legacy Opera (10.50 - 12.18))
// * Chakra (Internet Explorer)
// * ChakraCore (Legacy Edge, Node-ChakraCore)
// * Mocha (NetScape) - obsolete
// * KJS (Konqueror) - obsolete
// * Rhino (Java-based Mozilla) - obsolete
// * SquirrelFish (Safari 4.0 - 4.1) - obsolete
// * SquirrelFish Extreme (Safari 4.1 - 5.1) - obsolete
// * Nashorn (Java-based Oracle) - obsolete
// * XS (Kinoma) - obsolete
// * JScript (Internet Explorer) - obsolete
// * ActionScript (Adobe Flash) - obsolete
// ? More info: https://en.wikipedia.org/wiki/List_of_JavaScript_engines

export const universalTimeZones = [
  "UTC",
  "Etc/UTC",
  "Etc/UCT",
  "Etc/Universal",
  "Etc/Zulu",
  "Zulu",
];

export const universalTimeZoneLongNames = [
  ...universalTimeZones,
  "SGH",
  "TCU",
  "Waqtiga UTC",
  "م ع و",
];

export const universalTimeZoneFullNames = [
  "Am Coordinated Universal",
  "Àm Uile-choitcheann Co-òrdanaichte",
  "Am Uilíoch Lárnach",
  "Am Uilíoch Lárnach (UTC)",
  "Amansan Kɔdinatɛde Berɛ",
  "Amansan Kɔdinatɛde Berɛ (UTC)",
  "Amser Cyffredniol Cydlynol",
  "amzer hollvedel kenurzhiet",
  "Àpapọ̀ Àkókò Àgbáyé",
  "Coordinated Universal Time",
  "CUT (waxtu iniwelsel yuñ boole)",
  "Eş Güdümlü Evrensel Zaman",
  "gecoördineerde wereldtijd",
  "Gekoördineerde universele tyd",
  "Giờ Phối hợp Quốc tế",
  "GMT",
  "Hadewa Lokaci na Duniya",
  "Hora coordinada universal",
  "hora universal coordinada",
  "Hora Universal Coordinada",
  "Hora Universal Coordinada (UTC)",
  "Horário Universal Coordenado",
  "isikhathi somhlaba esididiyelwe",
  "Koordinált világidő",
  "Koordinasiya edilmiş ümumdünya vaxtı",
  "Koordinatali universal vaqt",
  "Koordineeritud maailmaaeg",
  "Koordinerad universell tid",
  "Koordineret universaltid",
  "koordinert universaltid",
  "koordiněrowany swětowy cas",
  "Koordinierte Weltzeit",
  "koordinirano svjetsko vrijeme",
  "Koordinisano univerzalno vreme",
  "koordinovaný svetový čas",
  "koordinovaný světový čas",
  "koordinowany swětowy čas",
  "Mfumo wa kuratibu saa ulimwenguni",
  "Nhazi Oge Ụwa Niile",
  "Ora universale coordenada",
  "Ora universale e koordinuar",
  "Ora universale e koordinuar (UTC)",
  "Ora Universal Kordenadu",
  "Orario universale coordinato",
  "Orario universale coordinato (UTC)",
  "ordu unibertsal koordinatua",
  "pasaulio suderintasis laikas",
  "Saeta Gerdûnî ya Hevdemî",
  "Samræmdur alþjóðlegur tími",
  "Samskipað heimstíð",
  "Sa’aatii Idil-Addunyaa Qindaa’e",
  "taimi fakaemāmani",
  "Temp universal coordinà",
  "Tempo coordinato universale",
  "Temps universal coordinat",
  "temps universel coordonné",
  "Tempus coordinadu universale",
  "tiempo universal coordinado",
  "Timpul universal coordonat",
  "Tiqsimuyuntin Tupachisqa Hora",
  "TMG",
  "uniwersalny czas koordynowany",
  "Universālais koordinētais laiks",
  "univerzalni koordinirani čas",
  "Universal Tempore Coordinate",
  "UTC",
  "UTC-yleisaika",
  "Utgaşdyrylýan ähliumumy wagt",
  "Wā Aonui Kōtuitui",
  "Waktu Universal Selaras",
  "Waktu Universal Terkoordinasi",
  "Waqtiga Isku-xiran ee Caalamka",
  "Wektu Universal Kakoordhinasi",
  "Xexeme gaƒoƒoɖoanyi me",
  "Συντονισμένη Παγκόσμια Ώρα",
  "Бирдиктүү дүйнөлүк убакыт",
  "Бөтендөнья килештерелгән вакыты",
  "Дүниежүзілік үйлестірілген уақыт",
  "Координисано универзално време",
  "Координисано универзално вријеме",
  "Координирано универсално време",
  "Координировано светско време",
  "Координировано светско време (UTC)",
  "Олон улсын зохицуулалттай цаг",
  "Пӗтӗм тӗнчери координацилене вӑхӑчӗ",
  "Універсальны каардынаваны час",
  "Вақти ҷаҳонии ҳамоҳангсозӣ",
  "Всемирное координированное время",
  "за всесвітнім координованим часом",
  "Համաշխարհային կոորդինացված ժամանակ",
  "זמן אוניברסלי מתואם",
  "التوقيت العالمي المنسق",
  "زمان هماهنگ جهانی",
  "کوآرڈینیٹڈ یونیورسل ٹائم",
  "کوآرڈنیٹڈ یونیورسل وَکھ",
  "گڏيل دنياوي وقت",
  "گرینیچ",
  "همغږى نړیوال وخت",
  "وقت یونیورسال کوآرڈینیٹڈ",
  "ߖߊ߯ߓߊ߫ ߕߎߡߘߊ߫ ߘߏ߲߬ߖߟߎ߬ߡߊ߬ߣߍ߲",
  "ܥܕܢܘܬܐ ܬܒܠܝܬܐ ܡܛܟܘܣܬܐ",
  "कोऑर्डनैटिड यूनवर्सल वख",
  "कोऑर्डिनेटेड युनिभर्सल टाइम",
  "कोऑर्डिनेटेड युनिभर्सल टाइम (UTC)",
  "गदि॒यल आलमी वक्तु",
  "गदि॒यल आलमी वक्तु (UTC)",
  "गदि॒यल सार्वभौम समय",
  "समन्वित विश्व समय",
  "समन्वित वैश्विक वेळ",
  "समन्वित वैश्विक समय",
  "समन्वित सार्वभौम समय",
  "समन्वितः वैश्विक समय:",
  "কোওর্দিনেটেদ য়ুনিভর্সেল টাইম",
  "কোওর্দিনেটেদ য়ুনিভর্সেল টাইম",
  "সমন্বিত সাৰ্বজনীন সময়",
  "সমন্বিত সার্বজনীন সময়",
  "স্থানাংকিত আন্তর্জাতিক সময়",
  "স্থানাংকিত আন্তর্জাতিক সময়",
  "સંકલિત યુનિવર્સલ સમય",
  "સંયોજિત વૈશ્વિક સમય",
  "સંયોજિત વૈશ્વિક સમય (UTC)",
  "ਕੋਔਰਡੀਨੇਟੇਡ ਵਿਆਪਕ ਵੇਲਾ",
  "ସମନ୍ୱିତ ସାର୍ବଜନୀନ ସମୟ",
  "ஒருங்கிணைந்த சர்வதேச நேரம்",
  "సమన్వయ సార్వజనీన సమయం",
  "ಸಂಘಟಿತ ಸಾರ್ವತ್ರಿಕ ಸಮಯ",
  "സംയോജിത സർവകാലിക സമയം",
  "കോർഡിനേറ്റഡ് യൂണിവേഴ്‌സൽ സമയം",
  "සමන්විත සර්වජනක කාලය",
  "සමකක්ෂ සාර්ව වේලාව",
  "เวลาสากลเชิงพิกัด",
  "ເວລາສາກົນປະສານ",
  "ເວລາສາກົນເຊີງພິກັດ",
  "ម៉ោង​សកល",
  "ម៉ោងសកលដែលមានការសម្រួល",
  "ညှိထားသည့် ကမ္ဘာ့ စံတော်ချိန်",
  "ཇི་ཨེམ་ཊི་",
  "ᱡᱤᱮᱢᱴᱤ",
  "ᱠᱚᱨᱰᱤᱱᱮᱴᱮᱰ ᱭᱩᱱᱤᱣᱟᱨᱥᱟᱞ ᱚᱠᱛᱚ",
  "მსოფლიო კოორდინირებული დრო",
  "ᎢᎩᏠᏱ ᏂᎦᏓ ᎠᏟᎢᎵᏒ",
  "የአለም ተዋዋይ ሰዓት",
  "የተቀነባበረ ሁለገብ ሰዓት",
  "ዝተሳነየ ኣድማሳዊ ግዜ",
  "协调世界时",
  "协调世界时间",
  "協調世界時",
  "協調世界時間",
  "協定世界時",
  "世界標準時間",
  "협정 세계시",
  "ꋧꃅꎕꏦꄮꈉ",
];

export const greenwichMeridianTimeZones = [
  "Etc/GMT",
  "Etc/GMT+0",
  "Etc/GMT0",
  "Etc/Greenwich",
  "Factory",
  "GMT",
  "GMT+0",
  "GMT-0",
  "GMT0",
  "Greenwich",
];

export const greenwichMeridianTimeZoneLongNames = [
  ...greenwichMeridianTimeZones,
  "MAG",
  "SGH",
  "TMG",
  "UTC",
  "WAT",
  "[GMT]",
  "Вақти GMT",
  "Гринуич",
  "جی ایم ٹی",
  "غرينتش",
  "گرینویچ",
  "گرینیچ",
  "م ع و",
  "ߜ߭ߕߖ",
  "जी एम टी",
  "जी.एम.टी.",
  "जीएमटी",
  "জি এম টি",
  "ജിഎംടി",
  "ග්‍රිමවේ",
  "ཇི་ཨེམ་ཊི་",
  "ម៉ោង​សកល",
  "ᱡᱤᱮᱢᱴᱤ",
  "ጂ ኤም ቲ",
  "ꋧꃅꎕꏦꄮꈉ",
];

export const greenwichMeridianTimeZoneFullNames = [
  "Àm Uile-choitcheann Co-òrdanaichte",
  "Am Uilíoch Lárnach",
  "Amansan Kɔdinatɛde Berɛ",
  "Amser Cyffredniol Cydlynol",
  "amzer hollvedel kenurzhiet",
  "Àpapọ̀ Àkókò Àgbáyé",
  "CUT (waxtu iniwelsel yuñ boole)",
  "Coordinated Universal Time",
  "Gekoördineerde universele tyd",
  "gecoördineerde wereldtijd",
  "Giờ Phối hợp Quốc tế",
  "GMT",
  "Greenwich gaskka áigi",
  "Greenwich Mean Berɛ",
  "Greenwich Mean Time",
  "Greenwich Mean Time (GMT)",
  "Greenwich middeltid",
  "Griničko vrijeme",
  "Grinvich o‘rtacha vaqti",
  "Gwzlinzveihci Byauhcunj Sizgenh",
  "Eş Güdümlü Evrensel Zaman",
  "Hadewa Lokaci na Duniya",
  "Hora coordinada universal",
  "Hora Média de Greenwich",
  "Hora Mitjana de Greenwich",
  "hora universal coordinada",
  "Horário Universal Coordenado",
  "isikhathi somhlaba esididiyelwe",
  "koordinált világidő",
  "Koordinatali universal vaqt",
  "Koordinasiya edilmiş ümumdünya vaxtı",
  "Koordineeritud maailmaaeg",
  "koordinerad universell tid",
  "Koordineret universaltid",
  "koordinert universaltid",
  "koordiněrowany swětowy cas",
  "Koordinierte Weltzeit",
  "Koordinisano univerzalno vreme",
  "koordinirano svjetsko vrijeme",
  "koordinovaný svetový čas",
  "koordinovaný světový čas",
  "koordinowany swětowy čas",
  "Lokacin Greenwich a Ingila",
  "Mëttler Greenwich-Zäit",
  "Mfumo wa kuratibu saa ulimwenguni",
  "Nhazi Oge Ụwa Niile",
  "ora al meridian de Greenwich",
  "Ora de Greenwhich",
  "Ora e Grinuiçit",
  "Ora Universal Kordenadu",
  "Ora universale e koordinuar",
  "ordu unibertsal koordinatua",
  "Palogare ya nako ya ngwaga le ngwaga ya Greenwich",
  "pasaulio suderintasis laikas",
  "Qrinviç Orta Vaxtı",
  "Saeta Gerdûnî ya Hevdemî",
  "Saeta Navînî ya Greenwichê",
  "Samræmdur alþjóðlegur tími",
  "Samskipað heimstíð",
  "Sa’aatii Idil-Addunyaa Qindaa’e",
  "Srednje vreme po Griniču",
  "taimi fakaemāmani",
  "Temp universal coordinà",
  "Tempo coordinato universale",
  "Temps universal coordinat",
  "temps universel coordonné",
  "Tempus coordinadu universale",
  "tiempo universal coordinado",
  "Timpul universal coordonat",
  "Tiqsimuyuntin Tupachisqa Hora",
  "TMG",
  "Universal Tempore Coordinate",
  "Universālais koordinētais laiks",
  "uniwersalnego czasu",
  "univerzalni koordinirani čas",
  "uniwersalny czas koordynowany",
  "UTC",
  "UTC-yleisaika",
  "Utgaşdyrylýan ähliumumy wagt",
  "Wā Aonui Kōtuitui",
  "Waktu Greenwich",
  "Waktu Min Greenwich",
  "Waktu Universal Selaras",
  "Waktu Universal Terkoordinasi",
  "Waqtiga Isku-xiran ee Caalamka",
  "Wektu Rerata Greenwich",
  "Wektu Universal Kakoordhinasi",
  "Xexeme gaƒoƒoɖoanyi me",
  "Συντονισμένη Παγκόσμια Ώρα",
  "Бирдиктүү дүйнөлүк убакыт",
  "Бөтендөнья килештерелгән вакыты",
  "Дүниежүзілік үйлестірілген уақыт",
  "Гриничко средње вријеме",
  "Гринвич вақти",
  "Гринвич уақыты",
  "Гринвичийн цаг",
  "Гринвичица юкъара хан",
  "Гринвичы рӕстӕмбис рӕстӕг",
  "Координирано универсално време",
  "Координисано универзално време",
  "Координисано универзално вријеме",
  "Олон улсын зохицуулалттай цаг",
  "Пӗтӗм тӗнчери координацилене вӑхӑчӗ",
  "Средње време по Гриничу",
  "Вақти ҷаҳонии ҳамоҳангсозӣ",
  "Всемирное координированное время",
  "за всесвітнім координованим часом",
  "Універсальны каардынаваны час",
  "זמן אוניברסלי מתואם",
  "זמן אוניברסלי מתואם",
  "التوقيت العالمي المنسق",
  "توقيت غرينتش",
  "زمان هماهنگ جهانی",
  "کوآرڈینیٹڈ یونیورسل ٹائم",
  "کوآرڈنیٹڈ یونیورسل وَکھ",
  "گریٖن وِچ میٖن ٹایِم",
  "گرين وچ مين ٽائيم",
  "گرینیچ",
  "گڏيل دنياوي وقت",
  "گىرىنۋىچ ۋاقتى",
  "همغږى نړیوال وخت",
  "وقت گرینویچ",
  "ߖߊ߯ߓߊ߫ ߕߎߡߘߊ߫ ߘߏ߲߬ߖߟߎ߬ߡߊ߬ߣߍ߲",
  "ܥܕܢܘܬܐ ܬܒܠܝܬܐ ܡܛܟܘܣܬܐ",
  "Համաշխարհային կոորդինացված ժամանակ",
  "कोऑर्डनैटिड यूनवर्सल वख",
  "गदि॒यल आलमी वक्तु",
  "ग्रीनविच ओसत वख",
  "ग्रीनविच मध्य वेळ",
  "ग्रीनविच मीन टाइम",
  "ग्रीनविच मीन वक़्तु",
  "ग्रीनविच मीन वक़्तु",
  "ग्रीनिच प्रमाण वेळ",
  "समन्वित विश्व समय",
  "समन्वित वैश्विक वेळ",
  "समन्वित वैश्विक समय",
  "समन्वितः वैश्विक समय:",
  "समन्वितः वैश्विक समयः",
  "কোওর্দিনেটেদ য়ুনিভর্সেল টাইম",
  "কোওর্দিনেটেদ য়ুনিভর্সেল টাইম",
  "গ্রিনৱিচ মিন টাইম",
  "সমন্বিত সাৰ্বজনীন সময়",
  "সমন্বিত সাৰ্বজনীন সময়",
  "স্থানাংকিত আন্তর্জাতিক সময়",
  "স্থানাংকিত আন্তর্জাতিক সময়",
  "ਕੋਔਰਡੀਨੇਟੇਡ ਵਿਆਪਕ ਵੇਲਾ",
  "ਗ੍ਰੀਨਵਿਚ ਮੀਨ ਵੇਲਾ",
  "સંકલિત યુનિવર્સલ સમય",
  "ସମନ୍ୱିତ ସାର୍ବଜନୀନ ସମୟ",
  "ஒருங்கிணைந்த சர்வதேச நேரம்",
  "సమన్వయ సార్వజనీన సమయం",
  "ಸಂಘಟಿತ ಸಾರ್ವತ್ರಿಕ ಸಮಯ",
  "കോർഡിനേറ്റഡ് യൂണിവേഴ്‌സൽ സമയം",
  "සමකක්ෂ සාර්ව වේලාව",
  "เวลาสากลเชิงพิกัด",
  "ເວລາສາກົນເຊີງພິກັດ",
  "ម៉ោងសកលដែលមានការសម្រួល",
  "ညှိထားသည့် ကမ္ဘာ့ စံတော်ချိန်",
  "ဂရင်းနစ် စံတော်ချိန်",
  "ཇི་ཨེམ་ཊི་",
  "ᱠᱚᱨᱰᱤᱱᱮᱴᱮᱰ ᱭᱩᱱᱤᱣᱟᱨᱥᱟᱞ ᱚᱠᱛᱚ",
  "ᱜᱨᱤᱱᱣᱤᱪ ᱢᱤᱱ ᱚᱠᱛᱚ",
  "የተቀነባበረ ሁለገብ ሰዓት",
  "ዝተሳነየ ኣድማሳዊ ግዜ",
  "ᎢᎩᏠᏱ ᏂᎦᏓ ᎠᏟᎢᎵᏒ",
  "მსოფლიო კოორდინირებული დრო",
  "协调世界时",
  "協定世界時",
  "协调世界时间",
  "協調世界時間",
  "格林尼治标准时间",
  "格林威治标准时间",
  "格林威治標準時間",
  "世界標準時間",
  "협정 세계시",
  "ꋧꃅꎕꏦꄮꈉ",
];

// ? TEST : Check which time zone aliases are accepted but not canonical (helped by ChatGPT)
// const acceptedTimeZoneAliases = compatibilityTimeZones
//   .map(({ oldTz }) => oldTz)
//   .filter(tz => {
//     try {
//       new Intl.DateTimeFormat("en", { timeZone: tz });
//       return !new Set(Intl.supportedValuesOf("timeZone")).has(tz); // * accepted but not canonical
//     } catch {
//       return false; // ! not supported at all
//     }
//   });
// console.log("Accepted deprecated/alias zones:", acceptedTimeZoneAliases);

// console.log("Total deprecated time zones:", compatibilityTimeZones.length);

// ? TEST : output time zone names that are not supported by the browser
// console.log(
//   Intl.supportedValuesOf("timeZone").filter(
//     timeZone => !new Intl.DateTimeFormat("en", { timeZone }).resolvedOptions().timeZone // ? helped by ChatGPT
//   )
// ); // * should be an empty array in modern browser

// ? TEST : output time zone names that are not supported by the browser
// const tzArray = Intl.supportedValuesOf("timeZone");
// const tzName = timeZone =>
//   new Intl.DateTimeFormat("dz", { timeStyle: "full", timeZone }).resolvedOptions();
// console.log(tzArray.filter(tz => !tzArray.includes(tzName(tz).timeZone))); // * should be an empty array in modern browser

// ? TEST : check whether locale or user’s time zone is supported by the browser
// console.log(
//   Intl.supportedValuesOf("timeZone").includes(Intl.DateTimeFormat().resolvedOptions().timeZone)
// ); // * should be true in modern browser

// ? TEST : input oldTz to obtain newTz
// let outputOld = 0;
// let outputInvalid = 0;
// for (const { oldTz, newTz } of compatibilityTimeZones) {
//   try {
//     const output = Intl.DateTimeFormat("en", { timeZone: oldTz }).resolvedOptions().timeZone;
//     switch (output) {
//       case newTz:
//         console.log(oldTz, "->", output);
//         break;

//       case oldTz:
//         console.log(oldTz);
//         outputOld++;
//         break;

//       default:
//         console.log(oldTz, "->", output, "(expected:", newTz + ")");
//         break;
//     }
//   } catch (error) {
//     console.log(oldTz, "->", error.message);
//     outputInvalid++;
//   }
// }
// console.log("Total matched old time zones:", outputOld);
// console.log("Total invalid old time zones:", outputInvalid);

// ? TEST : input newTz to obtain oldTz
// let outputOld = 0;
// let outputInvalid = 0;
// for (const { oldTz, newTz } of compatibilityTimeZones) {
//   try {
//     const output = Intl.DateTimeFormat("en", { timeZone: newTz }).resolvedOptions().timeZone;
//     switch (output) {
//       case newTz:
//         console.log(newTz, "<-", oldTz);
//         break;

//       case oldTz:
//         console.log(output, "->", newTz);
//         outputOld++;
//         break;

//       default:
//         console.log(oldTz, "->", output, "(expected:", newTz + ")");
//         break;
//     }
//   } catch (error) {
//     console.log(oldTz, "->", error.message);
//     outputInvalid++;
//   }
// }
// console.log("Total matched old time zones:", outputOld);
// console.log("Total invalid old time zones:", outputInvalid);
