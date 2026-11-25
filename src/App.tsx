import { type JSX, lazy, useState } from "react";

import type { CalendarSettings, Data } from "../types.ts";
import { firstTimeExecutedDateTime, localeData, TIMEZONES } from "./util.ts";
import {
  UTCTimeZoneLongNames as UTC,
  GMTTimeZoneLongNames as GMT,
  languagesWith12HoursSystem as lang12Hours,
} from "./data.ts";

import Header from "./components/Header.tsx";
const Toolbar = lazy(() => import("./components/Toolbar.tsx"));
const Display = lazy(() => import("./components/Display.tsx"));
const RegionData = lazy(() => import("./components/RegionData.tsx"));
// const TimezoneTable = lazy(() => import("./components/TimezoneTable.tsx"));
import Footer from "./components/Footer.tsx";

import "./App.css";

export default function App(): JSX.Element {
  // TODO : Get the user’s locale, calendar, numbering system, and time zone
  let {
    locale,
    calendar: userCalendar,
    numberingSystem: userNumber,
    timeZone,
  } = new Intl.DateTimeFormat().resolvedOptions();

  // TODO : Construct a locale string based on the userLocale’s default calendar and number
  const { localeLangScript, localeReg, localeCalendar, localeNumber } = localeData(locale);
  locale =
    localeLangScript +
    (localeReg !== "" ? "-" + localeReg : "") +
    "-u-ca-" +
    (localeCalendar !== "" ? localeCalendar : userCalendar) +
    "-nu-" +
    (localeNumber !== "" ? localeNumber : userNumber);

  // TODO : Default to UTC, GMT, or the last element of the TIMEZONES array if timeZone is undefined
  if (!TIMEZONES.some(({ value }: Data): boolean => timeZone === value)) {
    const timeZoneLongName = (tz: string): string =>
      new Intl.DateTimeFormat(locale, { timeStyle: "long", timeZone: tz })
        .formatToParts(firstTimeExecutedDateTime)
        .find(({ type }) => type === "timeZoneName")?.value ?? "";

    timeZone =
      TIMEZONES.find(({ value: tz }: Data): boolean => UTC.includes(timeZoneLongName(tz)))?.value ??
      TIMEZONES.find(({ value: tz }: Data): boolean => GMT.includes(timeZoneLongName(tz)))?.value ??
      TIMEZONES.at(-1)?.value ??
      TIMEZONES.slice(-1)[0].value;
  }

  const [calendar, setCalendar] = useState<CalendarSettings>({
    locale,
    is12Hours: lang12Hours.some(({ value }: Data): boolean => value === localeLangScript),
    timeZone,
  });
  const [dateTimeIsSingleLine, setDateTimeIsSingleLine] = useState<boolean>(true);

  return (
    <>
      <Header />
      <Toolbar
        {...calendar}
        setCalendar={setCalendar}
        dateTimeIsSingleLine={dateTimeIsSingleLine}
        setDateTimeIsSingleLine={setDateTimeIsSingleLine}
      />
      <Display {...calendar} dateTimeIsSingleLine={dateTimeIsSingleLine} />
      <RegionData timeZone={timeZone} />
      {/* <TimezoneTable locale={localeLangScript} /> */}
      <Footer />
    </>
  );
}
