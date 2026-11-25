import { getTimezoneOffset } from "date-fns-tz";
import type { CountryCode, Timezone, TimezoneName } from "countries-and-timezones";
import {
  getCountryForTimezone,
  getCountry,
  getTimezone,
  getTimezonesForCountry,
} from "countries-and-timezones";

import { REGION_MAP } from "./data.ts";
import {
  // compatibilityTimeZones,
  greenwichMeridianTimeZones,
  universalTimeZones,
} from "./timezones.ts";
// import type { Zone } from "../types.ts";
import type { Data, LocaleData, LocaleRegionData } from "../types.ts";

export const firstTimeExecutedDateTime: Date = new Date();
const userLocale: string = new Intl.DateTimeFormat().resolvedOptions().locale;

// ? Locale Data
export const localeData = (locale: string): LocaleData => {
  const { language, script, region } = new Intl.Locale(locale);
  const { calendar, numberingSystem } = new Intl.DateTimeFormat(locale).resolvedOptions();
  return {
    localeLang: language,
    localeScript: script ?? "",
    localeLangScript: language + (script ? "-" + script : ""),
    localeReg: region ?? "",
    localeCalendar: calendar,
    localeNumber: numberingSystem,
  };
};

// ? Flag Emoji
/** The flag emoji for the given regional code, if any. */
export const getFlagEmoji = (regionalCode: string): string =>
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
 * @param timeZone -  IANA time zone identifier.
 * @return The timezone offset from UTC in the format of "UTC±H" or "UTC±H:MM".
 */
const tzOffsetFromUTC = (timeZone: string): string => {
  // ? With countries-and-timezones (can return undefined)
  const offsetRegex: RegExp = /[+-]00:00|(?<=[+-])0|:00/g;
  const tz: Timezone | null = getTimezone(timeZone);
  const dstOffset: string | undefined = tz?.dstOffsetStr.replace(offsetRegex, "");
  const utcOffset: string | undefined = tz?.utcOffsetStr.replace(offsetRegex, "");
  const offset: string | undefined =
    dstOffset &&
    utcOffset &&
    (dstOffset === utcOffset ? "UTC" + utcOffset : `UTC${utcOffset} (UTC) | UTC${dstOffset} (DST)`);

  // ? With date-fns-tz
  const MINUTE_IN_MILLISECONDS: number = 60 * 1000;
  const HOUR_IN_MILLISECONDS: number = 60 * MINUTE_IN_MILLISECONDS;

  // * timezone offset from UTC in milliseconds
  const tzOffsetMillisecond: number = getTimezoneOffset(timeZone, firstTimeExecutedDateTime);

  // * Hour
  const tzOffsetHour: number = tzOffsetMillisecond / HOUR_IN_MILLISECONDS;
  const tzHour: string =
    tzOffsetMillisecond > 0
      ? Math.floor(tzOffsetHour).toString()
      : tzOffsetMillisecond < 0
        ? Math.ceil(tzOffsetHour).toString()
        : tzOffsetHour.toString();

  // * Minute
  const tzOffsetMinute: number =
    (tzOffsetMillisecond % HOUR_IN_MILLISECONDS) / MINUTE_IN_MILLISECONDS;
  const absTzOffsetMinute: number = Math.abs(tzOffsetMinute);
  const tzMinute: string =
    absTzOffsetMinute < 10 ? "0" + absTzOffsetMinute.toString() : absTzOffsetMinute.toString();

  // * timezone offset from UTC in "±H" or "±H:MM"
  const tzOffset: string =
    tzOffsetHour !== 0
      ? (tzOffsetHour > 0 ? "+" : "") + tzHour + (tzOffsetMinute !== 0 ? ":" + tzMinute : "")
      : tzOffsetMinute !== 0
        ? (tzOffsetMinute > 0 ? "+" : "-") + "0:" + tzMinute
        : "";

  // * POSIX-style Signs of Timezone Name
  const posixOffset = (tz: string): string =>
    tz.replace("Etc/GMT", "").replace(/\+|-/g, (match: string) => (match === "+" ? "-" : "+"));

  return offset && offset.length >= 3
    ? offset
    : "UTC" + (timeZone.startsWith("Etc/GMT") ? posixOffset(timeZone) : tzOffset);
};

export const tzLongNameIntl = (locale: string, timeZone: string): string =>
  new Intl.DateTimeFormat(locale, { timeStyle: "long", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName")?.value ?? "";

export const tzFullNameIntl = (locale: string, timeZone: string): string =>
  new Intl.DateTimeFormat(locale, { timeStyle: "full", timeZone })
    .formatToParts(firstTimeExecutedDateTime)
    .find(({ type }) => type === "timeZoneName")?.value ?? "";

export const tzLongName: (timeZone: string) => string = tzLongNameIntl.bind(null, "en");
export const tzFullName: (timeZone: string) => string = tzFullNameIntl.bind(null, "en");

/**
 * @param timeZone -  IANA time zone identifier.
 * @return The region in which the timezone applies.
 */
const tzRegion = (timeZone: string): string => {
  const regionalCode: CountryCode | "" =
    getCountryForTimezone(timeZone, { deprecated: true })?.id ?? "";
  const timeZoneRegion: string = REGION_MAP[regionalCode];

  // const deprecatedTZToActiveTZ: string =
  //   compatibilityTimeZones.find(({ oldTz }: Zone): boolean => timeZone === oldTz)?.newTz ?? "";
  const deprecatedTZToActiveTZ: TimezoneName | "" = getTimezone(timeZone)?.aliasOf ?? "";

  // ? if the timezone has an alias (or if newTz exists), it is deprecated
  const timeZoneIsDeprecated: boolean = deprecatedTZToActiveTZ !== "";

  const flagEmoji = (reg: string): string => {
    const userLocaleArray: string[] = userLocale.split("-");

    // const userRegion: string = userLocaleArray.at(-1) ?? "";
    // const userRegion: string = userLocaleArray.slice(-1)[0];
    const userRegion: string = userLocaleArray[userLocaleArray.length - 1];

    return reg === "TW" && userRegion === "CN"
      ? getFlagEmoji(userRegion)
      : reg !== ""
        ? getFlagEmoji(reg)
        : "";
  };

  return regionalCode !== ""
    ? timeZoneRegion +
        " " +
        flagEmoji(regionalCode) +
        (timeZoneIsDeprecated ? ` (link to ${deprecatedTZToActiveTZ})` : "")
    : universalTimeZones.includes(timeZone)
      ? "Coordinated Universal Time"
      : greenwichMeridianTimeZones.includes(timeZone)
        ? "Greenwich Meridian Time"
        : timeZone.startsWith("Etc/GMT")
          ? "POSIX-style Signs of Timezone Name"
          : "Unspecified Region";
};

export const TIMEZONES: Data[] = Intl.supportedValuesOf("timeZone").map<Data>((tz: string) => ({
  title: `${tz} (${tzOffsetFromUTC(tz)} | ${tzLongName(tz)} | ${tzFullName(tz)}), ` + tzRegion(tz),
  value: tz,
}));

// ? Locale Region Data from given Timezone
export const localeRegionData = (timeZone: string): LocaleRegionData => {
  // ? This is just for testing purposes, to simulate different timezones
  // ? In real usage, the timezone should be obtained from the user’s locale or settings
  // * To test a specific timezone, uncomment the following line and set the desired timezone
  // const localeTimeZone: string = "Pacific/Auckland";
  // * To get a random timezone from the list of supported timezones, uncomment the following lines
  // const tzArray: string[] = Intl.supportedValuesOf("timeZone");
  // const localeTimeZone: string = tzArray[Math.floor(Math.random() * tzArray.length)];

  // * The actual code starts here
  const regionalCode: CountryCode | "" =
    // getCountryForTimezone(localeTimeZone, { deprecated: true })?.id ?? "";
    getCountryForTimezone(timeZone, { deprecated: true })?.id ?? "";
  const region: string = getCountry(regionalCode, { deprecated: true })?.name ?? "No region data";
  const mappedRegion: string = regionalCode !== "" ? REGION_MAP[regionalCode] : "No region data";

  const name: string = region === mappedRegion ? region : mappedRegion;
  const code: string = regionalCode !== "" ? regionalCode : "No regional code";
  const flag: string = regionalCode !== "" ? getFlagEmoji(regionalCode) : "No flag data";

  const isDeprecated = (tz: TimezoneName): boolean => getTimezone(tz)?.deprecated === true;
  const timeZones: TimezoneName[] =
    getTimezonesForCountry(regionalCode, { deprecated: true })?.map<TimezoneName>(
      ({ name }: Timezone) => name,
    ) ?? [];
  const activeTimeZones: TimezoneName[] = timeZones.filter(
    (tz: TimezoneName): boolean => !isDeprecated(tz),
  );
  const deprecatedTimeZones: TimezoneName[] = timeZones.filter((tz: TimezoneName): boolean =>
    isDeprecated(tz),
  );

  return { name, code, flag, activeTimeZones, deprecatedTimeZones };
};

/** Regex to identify the presence of a time zone specifier in a date string */
export const tzPattern: RegExp =
  /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
