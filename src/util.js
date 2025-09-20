import { getTimezoneOffset } from "date-fns-tz";
import { zones } from "moment-timezone/data/meta/latest.json";
import { REGION_MAP } from "./data";
import {
  compatibilityTimeZones,
  greenwichMeridianTimeZones,
  universalTimeZones,
} from "./timezones";

// ? Flag Emoji
export const getFlagEmoji = regionalCode =>
  typeof regionalCode === "string"
    ? regionalCode.length === 2
      ? regionalCode
          .toUpperCase()
          .split("")
          // .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
          // .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
          // .map(char => String.fromCodePoint(char.charCodeAt(0) + 0x1f1a5))
          .map(char => String.fromCodePoint(0x1f1a5 + char.charCodeAt(0)))
          .join("")
      : ""
    : typeof regionalCode === "number"
    ? "(No flag for this region.)"
    : undefined;

// ? Timezones
const firstTimeExecutedDateTime = new Date();

function tzOffsetUTC(timeZone) {
  // * timezone offset in milliseconds
  const tzOffset = getTimezoneOffset(timeZone, firstTimeExecutedDateTime);

  // * Hour
  const tzHourResult = tzOffset / (60 * 60 * 1000);
  const tzHour =
    tzOffset > 0 ? Math.floor(tzHourResult) : tzOffset < 0 ? Math.ceil(tzHourResult) : tzHourResult;

  // * Minute
  const tzMinute = (tzOffset % (60 * 60 * 1000)) / (60 * 1000);
  const absTzMinute = Math.abs(tzMinute);
  const formattedTzMinute = absTzMinute < 10 ? "0" + absTzMinute : absTzMinute.toString();

  return (
    "UTC" +
    (tzHour !== 0
      ? (tzHour > 0 ? "+" : "") + tzHour + (tzMinute !== 0 ? ":" + formattedTzMinute : "")
      : tzMinute !== 0
      ? (tzMinute > 0 ? "+" : "-") + "0:" + formattedTzMinute
      : "")
  );
}

const tzNameLong = timeZone =>
  Intl.DateTimeFormat("en", { timeStyle: "long", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName").value;

const tzNameFull = timeZone =>
  Intl.DateTimeFormat("en", { timeStyle: "full", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName").value;

function tzRegion(timeZone) {
  const activeTimeZoneRegionalCode = zones[timeZone]?.countries[0];

  // * Original code
  // const activeTimeZoneRegion =
  //   activeTimeZoneRegionalCode !== "" ? countries[activeTimeZoneRegionalCode]?.name || "" : "";
  // const activeTimeZoneRegion =
  //   activeTimeZoneRegionalCode !== ""
  //     ? REGIONS.find(({ value }) => value === activeTimeZoneRegionalCode)?.title || ""
  //     : "";
  // * Improved performance by creating a map object (helped by IBM Granite AI)
  // const activeTimeZoneRegion = countries[activeTimeZoneRegionalCode]?.name || "";
  const activeTimeZoneRegion = REGION_MAP[activeTimeZoneRegionalCode];

  const timeZoneIsDeprecated = compatibilityTimeZones.some(tz => tz.oldTimeZone === timeZone);
  const { newTimeZone: deprecatedTZToActiveTZ, regionalCode: deprecatedTimeZoneRegionalCode } =
    compatibilityTimeZones.find(({ oldTimeZone }) => oldTimeZone === timeZone) || {
      oldTimeZone: "unknown timezone",
      newTimeZone: "unknown timezone",
      regionalCode: undefined,
    };

  // * Original code
  // const deprecatedTimeZoneRegion =
  //   deprecatedTimeZoneRegionalCode !== ""
  //     ? countries[deprecatedTimeZoneRegionalCode]?.name || ""
  //     : "";
  // const deprecatedTimeZoneRegion =
  //   REGIONS.find(({ value }) => value === deprecatedTimeZoneRegionalCode)?.title || "";
  // * Improved performance by creating a map object (helped by IBM Granite AI)
  // const deprecatedTimeZoneRegion = countries[deprecatedTimeZoneRegionalCode]?.name || "";
  const deprecatedTimeZoneRegion = REGION_MAP[deprecatedTimeZoneRegionalCode];

  // * Improved performance by reducing the number of return statements (helped by IBM Granite AI)
  let region;
  if (activeTimeZoneRegion) {
    region = `${activeTimeZoneRegion} ${getFlagEmoji(activeTimeZoneRegionalCode)}`;
  } else if (timeZoneIsDeprecated && deprecatedTimeZoneRegion) {
    region = `${deprecatedTimeZoneRegion} ${getFlagEmoji(
      deprecatedTimeZoneRegionalCode
    )} (link to ${deprecatedTZToActiveTZ})`;
  } else {
    region = universalTimeZones.includes(timeZone)
      ? "Coordinated Universal Time"
      : greenwichMeridianTimeZones.includes(timeZone)
      ? "Greenwich Meridian Time"
      : "Unspecified Region";
  }
  return region;
}

export const TIMEZONES = Intl.supportedValuesOf("timeZone").map(tz => ({
  title: `${tz} (${tzOffsetUTC(tz)} | ${tzNameLong(tz)} | ${tzNameFull(tz)}), ` + tzRegion(tz),
  value: tz,
}));

// ? Locale Region Data
export function localeData(locale) {
  const [localeNoCalendarOption, localeCalendarOption] = locale.includes("-u-")
    ? locale.split("-u-")
    : [locale, ""];

  const localeLangScriptReg = localeNoCalendarOption.split("-");
  const localeLang = localeLangScriptReg[0];
  const localeScript =
    localeLangScriptReg[1] && localeLangScriptReg[1].length === 4 ? localeLangScriptReg[1] : "";
  const localeLangScript = localeLang + (localeScript ? "-" + localeScript : "");
  const localeReg =
    localeLangScriptReg[1] && localeLangScriptReg[1].length === 2
      ? localeLangScriptReg[1]
      : localeLangScriptReg[2] && localeLangScriptReg[2].length === 2
      ? localeLangScriptReg[2]
      : "";

  const calendarOption = localeCalendarOption ? localeCalendarOption.split("-") : [];

  const prefixLength = calendarOption.length >= 3 ? 3 : 2;
  const localeCalendar =
    calendarOption[0] === "ca"
      ? calendarOption.length === 2 || calendarOption[2] === "nu"
        ? calendarOption[1]
        : calendarOption.slice(1, prefixLength).join("-")
      : "";
  const localeNumber = calendarOption.some(str => str === "nu") ? calendarOption.slice(-1)[0] : "";

  return { localeLang, localeScript, localeLangScript, localeReg, localeCalendar, localeNumber };
}
