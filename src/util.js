import { getTimezoneOffset } from "date-fns-tz";
import {
  getCountryForTimezone,
  getCountry,
  getTimezone,
  getTimezonesForCountry,
} from "countries-and-timezones";
import { REGION_MAP } from "./data";
import {
  // compatibilityTimeZones,
  greenwichMeridianTimeZones,
  universalTimeZones,
} from "./timezones";

const MINUTE_IN_MILLISECONDS = 60 * 1000;
const HOUR_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS;

export const firstTimeExecutedDateTime = new Date();

// ? Locale Data
/**
 * @typedef {Object} LocaleData
 * @property {string} localeLang
 * @property {string} localeScript
 * @property {string} localeLangScript
 * @property {string} localeReg
 * @property {string} localeCalendar
 * @property {string} localeNumber
 */
/**
 * @param {string} locale -  The locale string.
 * @return {LocaleData} Language, script, region, calendar, and numbering system information.
 */
export function localeData(locale) {
  const {
    locale: lcl,
    calendar,
    numberingSystem,
  } = new Intl.DateTimeFormat(locale).resolvedOptions();
  const {
    language: localeLang,
    script: localeScript = "",
    region: localeReg = "",
    calendar: localeCalendar = calendar,
    numberingSystem: localeNumber = numberingSystem,
  } = new Intl.Locale(lcl, { calendar: calendar, numberingSystem: numberingSystem });
  const localeLangScript = localeLang + (localeScript !== "" ? "-" + localeScript : "");

  return { localeLang, localeScript, localeLangScript, localeReg, localeCalendar, localeNumber };
}

// ? Flag Emoji
/**
 * @param {string} regionalCode -  The regional code.
 * @return {string} The flag emoji for the given regional code, if any.
 */
export const getFlagEmoji = regionalCode =>
  regionalCode.length === 2
    ? regionalCode
        .toUpperCase()
        .split("")
        // .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
        .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        // .map(char => String.fromCodePoint(char.charCodeAt(0) + 0x1f1a5))
        // .map(char => String.fromCodePoint(0x1f1a5 + char.charCodeAt(0)))
        .join("")
    : regionalCode.length === 3
      ? "(No flag for this region.)"
      : "";

// ? Timezones
/**
 * @param {string} timeZone -  IANA time zone identifier.
 * @return {string} The timezone offset from UTC in the format of "UTC±H" or "UTC±H:MM".
 */
function tzOffsetFromUTC(timeZone) {
  // * timezone offset from UTC in milliseconds
  const tzOffset = getTimezoneOffset(timeZone, firstTimeExecutedDateTime);

  // * Hour
  const tzOffsetHour = tzOffset / HOUR_IN_MILLISECONDS;
  const tzHour =
    tzOffset > 0
      ? Math.floor(tzOffsetHour).toString()
      : tzOffset < 0
        ? Math.ceil(tzOffsetHour).toString()
        : tzOffsetHour.toString();

  // * Minute
  const tzOffsetMinute = (tzOffset % HOUR_IN_MILLISECONDS) / MINUTE_IN_MILLISECONDS;
  const absTzOffsetMinute = Math.abs(tzOffsetMinute);
  const tzMinute =
    absTzOffsetMinute < 10 ? "0" + absTzOffsetMinute.toString() : absTzOffsetMinute.toString();

  // * With countries-and-timezones
  const dstOffset = getTimezone(timeZone)?.dstOffsetStr;
  const utcOffset = getTimezone(timeZone)?.utcOffsetStr;
  const offsetRegex = /(?<=[+-])0|:(?<=:)00|\+00:00|-00:00/g;
  const offset =
    dstOffset &&
    utcOffset &&
    (dstOffset === utcOffset
      ? "UTC" + utcOffset.replace(offsetRegex, "")
      : `UTC${utcOffset.replace(offsetRegex, "")} (UTC) | UTC${dstOffset.replace(offsetRegex, "")} (DST)`);

  return (
    offset ??
    "UTC" +
      (tzOffsetHour !== 0
        ? (tzOffsetHour > 0 ? "+" : "") + tzHour + (tzOffsetMinute !== 0 ? ":" + tzMinute : "")
        : tzOffsetMinute !== 0
          ? (tzOffsetMinute > 0 ? "+" : "-") + "0:" + tzMinute
          : "")
  );
}

/**
 * @param {string} locale -  The locale code.
 * @param {string} timeZone -  IANA time zone identifiers.
 * @return {string} The timezone long name in the given locale.
 */
export const tzLongNameIntl = (locale, timeZone) =>
  new Intl.DateTimeFormat(locale, { timeStyle: "long", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName").value;

/**
 * @param {string} locale -  The locale code.
 * @param {string} timeZone -  IANA time zone identifiers.
 * @return {string} The timezone full name in the given locale.
 */
export const tzFullNameIntl = (locale, timeZone) =>
  new Intl.DateTimeFormat(locale, { timeStyle: "full", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName").value;

/**
 * @param {string} timeZone -  IANA time zone identifiers.
 * @return {string} The timezone long name in English.
 */
export const tzLongName = tzLongNameIntl.bind(null, "en");
/**
 * @param {string} timeZone -  IANA time zone identifiers.
 * @return {string} The timezone full name in English.
 */
export const tzFullName = tzFullNameIntl.bind(null, "en");

/**
 * @param {string} timeZone -  IANA time zone identifier.
 * @return {string} The region associated with the given time zone, if any.
 */
function tzRegion(timeZone) {
  // * Active Time Zone
  const activeTimeZoneRegionalCode =
    getCountryForTimezone(timeZone, { deprecated: true })?.id ?? "";
  const activeTimeZoneRegion = REGION_MAP[activeTimeZoneRegionalCode];

  // * Deprecated Time Zone
  // const timeZoneIsDeprecated = compatibilityTimeZones.some(({ oldTz }) => timeZone === oldTz);
  // const { newTz: deprecatedTZToActiveTZ, regionalCode: deprecatedTimeZoneRegionalCode } =
  // compatibilityTimeZones.find(({ oldTz }) => timeZone === oldTz) ?? {
  //   newTz: Intl.DateTimeFormat("en", { timeZone }).resolvedOptions().timeZone,
  //   regionalCode: "",
  // };
  const timeZoneIsDeprecated = getTimezone(timeZone).deprecated === true;
  const deprecatedTZToActiveTZ =
    getTimezone(timeZone)?.aliasOf ??
    Intl.DateTimeFormat("en", { timeZone }).resolvedOptions().timeZone;
  const deprecatedTimeZoneRegionalCode =
    getCountryForTimezone(timeZone, { deprecated: true })?.id ?? "";
  const deprecatedTimeZoneRegion = REGION_MAP[deprecatedTimeZoneRegionalCode];

  /**
   * @param {string} reg
   * @return {string}
   */
  const flagEmoji = reg => {
    const userRegion = new Intl.DateTimeFormat().resolvedOptions().locale.split("-").at(-1) ?? "";
    return reg === "TW" && userRegion.length === 2 && userRegion === "CN"
      ? getFlagEmoji(userRegion)
      : reg !== ""
        ? getFlagEmoji(reg)
        : "";
  };

  // * Improved performance by reducing the number of return statements (helped by IBM Granite AI)
  let region = "";
  if (activeTimeZoneRegionalCode !== "") {
    region = activeTimeZoneRegion + " " + flagEmoji(activeTimeZoneRegionalCode);
  } else if (timeZoneIsDeprecated && deprecatedTimeZoneRegionalCode !== "") {
    region =
      deprecatedTimeZoneRegion +
      " " +
      flagEmoji(deprecatedTimeZoneRegionalCode) +
      ` (link to ${deprecatedTZToActiveTZ})`;
  } else {
    region = universalTimeZones.includes(timeZone)
      ? "Coordinated Universal Time"
      : greenwichMeridianTimeZones.includes(timeZone)
        ? "Greenwich Meridian Time"
        : timeZone.startsWith("Etc/GMT")
          ? "POSIX-style Signs of Timezone Name"
          : "Unspecified Region";
  }
  return region;
}

/** @type {import("./data").Data} */
export const TIMEZONES = Intl.supportedValuesOf("timeZone").map(tz => ({
  title: `${tz} (${tzOffsetFromUTC(tz)} | ${tzLongName(tz)} | ${tzFullName(tz)}), ` + tzRegion(tz),
  value: tz,
}));

// ? Locale Region Data from given Timezone
/**
 * @typedef {Object} LocaleRegionData
 * @property {string} name - The region name.
 * @property {string} code - The regional code.
 * @property {string} flag - The flag emoji for the region.
 * @property {string[]} activeTimeZones - An array of active timezones associated with the given time zone.
 * @property {string[]} deprecatedTimeZones - An array of deprecated timezones associated with the given time zone.
 */

/**
 * @param {string} timeZone -  IANA time zone identifier.
 * @returns {LocaleRegionData} Region name, regional code, flag emoji, and an array of timezones associated to the given time zone.
 */
export function localeRegionData(timeZone) {
  // ? This is just for testing purposes, to simulate different timezones
  // ? In real usage, the timezone should be obtained from the user's locale or settings
  // * To test a specific timezone, uncomment the following line and set the desired timezone
  // const localeTimeZone = "Pacific/Auckland";
  // * To get a random timezone from the list of supported timezones, uncomment the following lines
  // const tzArray = Intl.supportedValuesOf("timeZone");
  // const localeTimeZone = tzArray[Math.floor(Math.random() * tzArray.length)];

  // * The actual code starts here
  const localeTimeZone = timeZone;

  const { id: regionalCode } = getCountryForTimezone(localeTimeZone, { deprecated: true }) ?? {
    id: "",
  };
  const { name: region } = getCountry(regionalCode, { deprecated: true }) ?? {
    name: "No region data",
  };
  const mappedRegion = regionalCode !== "" ? REGION_MAP[regionalCode] : "No region data";

  const name = region === mappedRegion ? region : mappedRegion;
  const code = regionalCode !== "" ? regionalCode : "No regional code";
  const flag = regionalCode !== "" ? getFlagEmoji(regionalCode) : "No flag data";
  const timeZones =
    getTimezonesForCountry(regionalCode, { deprecated: true })?.map(({ name }) => name) ?? [];
  const activeTimeZones = timeZones.filter(tz => !getTimezone(tz).deprecated);
  const deprecatedTimeZones = timeZones.filter(tz => getTimezone(tz).deprecated === true);

  return { name, code, flag, activeTimeZones, deprecatedTimeZones };
}
