import { getTimezoneOffset } from "date-fns-tz";
import { countries, zones } from "moment-timezone/data/meta/latest.json";
import { REGION_MAP } from "./data";
import {
  compatibilityTimeZones,
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

  return (
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
  const activeTimeZoneRegionalCode = zones[timeZone]?.countries[0] ?? "";

  // * Original code
  // const activeTimeZoneRegion =
  //   activeTimeZoneRegionalCode !== "" ? countries[activeTimeZoneRegionalCode]?.name || "" : "";
  // const activeTimeZoneRegion =
  //   activeTimeZoneRegionalCode !== ""
  //     ? REGIONS.find(({ value }) => value === activeTimeZoneRegionalCode)?.title || ""
  //     : "";
  // * Improved performance by creating a map object (helped by IBM Granite AI)
  // const activeTimeZoneRegion = countries[activeTimeZoneRegionalCode]?.name;
  const activeTimeZoneRegion = REGION_MAP[activeTimeZoneRegionalCode];

  const timeZoneIsDeprecated = compatibilityTimeZones.some(({ oldTz }) => timeZone === oldTz);
  const { newTz: deprecatedTZToActiveTZ, regionalCode: deprecatedTimeZoneRegionalCode } =
    compatibilityTimeZones.find(({ oldTz }) => timeZone === oldTz) ?? {
      newTz: Intl.DateTimeFormat("en", { timeZone }).resolvedOptions().timeZone,
      regionalCode: "",
    };

  // * Original code
  // const deprecatedTimeZoneRegion =
  //   deprecatedTimeZoneRegionalCode !== ""
  //     ? countries[deprecatedTimeZoneRegionalCode]?.name || ""
  //     : "";
  // const deprecatedTimeZoneRegion =
  //   REGIONS.find(({ value }) => value === deprecatedTimeZoneRegionalCode)?.title || "";
  // * Improved performance by creating a map object (helped by IBM Granite AI)
  // const deprecatedTimeZoneRegion = countries[deprecatedTimeZoneRegionalCode]?.name;
  const deprecatedTimeZoneRegion = REGION_MAP[deprecatedTimeZoneRegionalCode];

  // * Improved performance by reducing the number of return statements (helped by IBM Granite AI)
  let region = "";
  const userRegion = new Intl.DateTimeFormat().resolvedOptions().locale.split("-").at(-1) ?? "";
  const flagEmoji = reg =>
    typeof reg === "string" && reg === "TW" && userRegion === "CN"
      ? getFlagEmoji(userRegion)
      : typeof reg === "string" && reg !== ""
        ? getFlagEmoji(reg)
        : "";
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
 * @property {string[]} timeZones - An array of timezones associated with the given time zone.
 */
/**
 * @param {string} timeZone -  IANA time zone identifier.
 * @returns {LocaleRegionData} Region name, regional code, flag emoji, and an array of timezones associated to the given time zone.
 */
export function localeRegionData(timeZone) {
  // ! For testing purposes
  // console.log(timeZone);
  // ? This is just for testing purposes, to simulate different timezones
  // ? In real usage, the timezone should be obtained from the user's locale or settings
  // * To test a specific timezone, uncomment the following line and set the desired timezone
  // const localeTimeZone = "Pacific/Auckland";
  // * To get a random timezone from the list of supported timezones, uncomment the following lines
  // const tzArray = Intl.supportedValuesOf("timeZone");
  // const localeTimeZone = tzArray[Math.floor(Math.random() * tzArray.length)];

  // * The actual code starts here
  const localeTimeZone = timeZone;

  const regionalCode =
    zones[localeTimeZone]?.countries[0] ??
    compatibilityTimeZones.find(({ oldTz }) => localeTimeZone === oldTz)?.regionalCode;

  const name = typeof regionalCode === "string" ? REGION_MAP[regionalCode] : "No region data";
  // const name = countries[regionalCode]?.name ?? "No region data";
  const code =
    typeof regionalCode === "string" && regionalCode !== "" ? regionalCode : "No regional code";
  const flag =
    typeof regionalCode === "string" &&
    regionalCode !== "" &&
    getFlagEmoji(regionalCode).length === 4
      ? getFlagEmoji(regionalCode)
      : "No flag data";
  const timeZones =
    typeof regionalCode === "string"
      ? countries[regionalCode]?.zones
      : localeTimeZone !== undefined
        ? [localeTimeZone]
        : [];

  return { name, code, flag, timeZones };
}
