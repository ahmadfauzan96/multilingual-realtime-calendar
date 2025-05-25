import { getTimezoneOffset } from "date-fns-tz";
import { countries, zones } from "moment-timezone/data/meta/latest.json";
import { compatibilityTimeZone } from "./compatibility-timezone";
import { getLocaleDirection } from "./languages-direction";
import { REGIONS } from "./data";

export const getFlagEmoji = regionalCode =>
  typeof regionalCode === "string"
    ? regionalCode
        .toUpperCase()
        .split("")
        // .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
        // .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        // .map(char => String.fromCodePoint(char.charCodeAt(0) + 0x1f1a5))
        .map(char => String.fromCodePoint(0x1f1a5 + char.charCodeAt(0)))
        .join("")
    : "(No flag for this region.)";

const date = new Date();
const timeZoneOffsetUTC = timeZone => {
  const tzOffset = getTimezoneOffset(timeZone, date);

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
      ? (tzHour > 0 ? "+" : "") + tzHour + ":" + formattedTzMinute
      : tzMinute !== 0
      ? (tzMinute > 0 ? "+" : "-") + "0:" + formattedTzMinute
      : "")
  );
};
const timeZoneOffsetLong = timeZone =>
  Intl.DateTimeFormat("en", { timeStyle: "long", timeZone })
    .formatToParts(date)
    .find(({ type }) => type === "timeZoneName").value;
const timeZoneOffsetFull = timeZone =>
  Intl.DateTimeFormat("en", { timeStyle: "full", timeZone })
    .formatToParts(date)
    .find(({ type }) => type === "timeZoneName").value;
const timeZoneRegion = timeZone => {
  const activeTimeZoneRegionalCode = zones[timeZone]?.countries[0] || "";
  // const activeTimeZoneRegion =
  //   activeTimeZoneRegionalCode !== "" ? countries[activeTimeZoneRegionalCode]?.name || "" : "";
  const activeTimeZoneRegion =
    activeTimeZoneRegionalCode !== ""
      ? REGIONS.find(({ value }) => value === activeTimeZoneRegionalCode)?.title || ""
      : "";

  const timeZoneIsDeprecated = compatibilityTimeZone.some(tz => tz.oldTimeZone === timeZone);

  const deprecatedTimeZoneRegionalCode =
    compatibilityTimeZone.find(tz => tz.oldTimeZone === timeZone)?.regionalCode || "";
  // const deprecatedTimeZoneRegion =
  //   deprecatedTimeZoneRegionalCode !== ""
  //     ? countries[deprecatedTimeZoneRegionalCode]?.name || ""
  //     : "";
  const deprecatedTimeZoneRegion =
    REGIONS.find(({ value }) => value === deprecatedTimeZoneRegionalCode)?.title || "";

  const deprecatedTimeZoneToActiveTimeZone =
    compatibilityTimeZone.find(tz => tz.oldTimeZone === timeZone)?.newTimeZone ||
    "unknown timezone";

  return activeTimeZoneRegion !== ""
    ? activeTimeZoneRegion + " " + getFlagEmoji(activeTimeZoneRegionalCode)
    : timeZoneIsDeprecated
    ? `${deprecatedTimeZoneRegion} ${getFlagEmoji(
        deprecatedTimeZoneRegionalCode
      )} (link to ${deprecatedTimeZoneToActiveTimeZone})`
    : timeZone === "UTC" || timeZone === "Etc/UTC"
    ? "Coordinated Universal Time"
    : timeZone === "GMT" ||
      timeZone === "GMT+0" ||
      timeZone === "GMT-0" ||
      timeZone === "GMT0" ||
      timeZone === "Greenwich" ||
      timeZone === "Etc/GMT" ||
      timeZone === "Etc/GMT+0" ||
      timeZone === "Etc/GMT0" ||
      timeZone === "Etc/Greenwich"
    ? "Greenwich Mean Time"
    : "Unspecified Region";
};
export const TIMEZONES = Intl.supportedValuesOf("timeZone").map(tz => ({
  title:
    `${tz} (${timeZoneOffsetUTC(tz)}|${timeZoneOffsetLong(tz)}|${timeZoneOffsetFull(tz)}), ` +
    timeZoneRegion(tz),
  value: tz,
}));

export const direction = lang => getLocaleDirection(lang);

const regionalCodeArray = zones[Intl.DateTimeFormat().resolvedOptions().timeZone]?.countries || [];
const regionalCodeDoesExist = regionalCodeArray.length > 0;
export const localeRegionData = {
  name: regionalCodeDoesExist ? countries[regionalCodeArray[0]].name : "No data",
  code: regionalCodeDoesExist ? countries[regionalCodeArray[0]].abbr : "No data",
  flag: regionalCodeDoesExist ? getFlagEmoji(regionalCodeArray[0]) : "No data",
  timeZones: regionalCodeDoesExist ? countries[regionalCodeArray[0]].zones : [],
};
