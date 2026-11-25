export interface CalendarProps {
  /** The current locale. */
  locale: string;
  /** Whether to display time in 12-hour format. */
  is12Hours: boolean;
  /** The current time zone. */
  timeZone: string;
}

// * data.ts
export interface Data {
  title: string;
  value: string;
}

export interface ValueToTitleMap {
  [value: Data["value"]]: Data["title"];
}
// export type ValueToTitleMap = Record<Data["value"], Data["title"]>;

export interface CalendarOptions {
  [option: string]: Data[];
}
// export type CalendarOptions = Record<string, Array<Data>>;

// * rabbit.ts
export interface ConversionRule {
  from: string;
  to: string;
}

// * timezones.ts
export interface Zone {
  oldTz: string;
  newTz: string;
  regionalCode: string;
}

// * util.ts
export interface LocaleData {
  localeLang: string;
  localeScript: string;
  localeLangScript: string;
  localeReg: string;
  localeCalendar: string;
  localeNumber: string;
}

export interface LocaleRegionData {
  name: string;
  code: string;
  flag: string;
  activeTimeZones: string[];
  deprecatedTimeZones: string[];
}
