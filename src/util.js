import { getTimezoneOffset } from "date-fns-tz";
import { countries, zones } from "moment-timezone/data/meta/latest.json";
import { REGION_MAP } from "./data";
import {
  compatibilityTimeZones,
  greenwichMeridianTimeZones,
  universalTimeZones,
} from "./timezones";

const HOURS_IN_MILLISECONDS = 60 * 60 * 1000;
const MINUTES_IN_MILLISECONDS = 60 * 1000;

export const firstTimeExecutedDateTime = new Date();

// ? Locale Data
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
  const localeNumber = calendarOption.some(str => str === "nu") ? calendarOption.at(-1) : "";

  return { localeLang, localeScript, localeLangScript, localeReg, localeCalendar, localeNumber };
}

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
      : "";

// ? Timezones
function tzOffsetFromUTC(timeZone) {
  // * timezone offset from UTC in milliseconds
  const tzOffset = getTimezoneOffset(timeZone, firstTimeExecutedDateTime);

  // * Hour
  const tzOffsetHour = tzOffset / HOURS_IN_MILLISECONDS;
  const tzHour =
    tzOffset > 0
      ? Math.floor(tzOffsetHour).toString()
      : tzOffset < 0
        ? Math.ceil(tzOffsetHour).toString()
        : tzOffsetHour.toString();

  // * Minute
  const tzOffsetMinute = (tzOffset % HOURS_IN_MILLISECONDS) / MINUTES_IN_MILLISECONDS;
  const absTzOffsetMinute = Math.abs(tzOffsetMinute).toString();
  const tzMinute = +absTzOffsetMinute < 10 ? "0" + absTzOffsetMinute : absTzOffsetMinute;

  return (
    "UTC" +
    (tzOffsetHour !== 0
      ? (tzOffsetHour > 0 ? "+" : "") + tzHour + (tzOffsetMinute !== 0 ? ":" + tzMinute : "")
      : tzOffsetMinute !== 0
        ? (tzOffsetMinute > 0 ? "+" : "-") + "0:" + tzMinute
        : "")
  );
}

export const tzLongNameIntl = (locale, timeZone) =>
  new Intl.DateTimeFormat(locale, { timeStyle: "long", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName").value;

export const tzFullNameIntl = (locale, timeZone) =>
  new Intl.DateTimeFormat(locale, { timeStyle: "full", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName").value;

const tzLongName = tzLongNameIntl.bind(null, "en");
const tzFullName = tzFullNameIntl.bind(null, "en");

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
  // const activeTimeZoneRegion = countries[activeTimeZoneRegionalCode]?.name;
  const activeTimeZoneRegion = REGION_MAP[activeTimeZoneRegionalCode];

  const timeZoneIsDeprecated = compatibilityTimeZones.some(tz => tz.oldTimeZone === timeZone);
  const { newTimeZone: deprecatedTZToActiveTZ, regionalCode: deprecatedTimeZoneRegionalCode } =
    compatibilityTimeZones.find(({ oldTimeZone }) => timeZone === oldTimeZone) ?? {
      newTimeZone: Intl.DateTimeFormat("en", { timeZone }).resolvedOptions().timeZone,
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
  let region;
  if (activeTimeZoneRegion) {
    region = `${activeTimeZoneRegion} ${getFlagEmoji(activeTimeZoneRegionalCode)}`;
  } else if (timeZoneIsDeprecated && deprecatedTimeZoneRegion) {
    region = `${deprecatedTimeZoneRegion} ${getFlagEmoji(
      deprecatedTimeZoneRegionalCode,
    )} (link to ${deprecatedTZToActiveTZ})`;
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
    compatibilityTimeZones.find(tz => tz.oldTimeZone === localeTimeZone)?.regionalCode;

  const name = REGION_MAP[regionalCode] ?? "No region data";
  // const name = countries[regionalCode]?.name ?? "No region data";
  const code = regionalCode ?? "No regional code";
  const flag =
    getFlagEmoji(regionalCode) !== "" && getFlagEmoji(regionalCode) !== "(No flag for this region.)"
      ? getFlagEmoji(regionalCode)
      : "No flag data";
  const timeZones = countries[regionalCode]?.zones ?? (localeTimeZone ? [localeTimeZone] : []);

  return { name, code, flag, timeZones };
}
