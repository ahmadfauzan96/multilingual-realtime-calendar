import { lazy, useState } from "react";
import { firstTimeExecutedDateTime, localeData, TIMEZONES } from "./util.js";
import {
  UTCTimeZoneLongNames as UTC,
  GMTTimeZoneLongNames as GMT,
  languagesWith12HoursSystem as lang12Hours,
} from "./data.js";

import Header from "./components/Header.jsx";
const Toolbar = lazy(() => import("./components/Toolbar.jsx"));
const Display = lazy(() => import("./components/Display.jsx"));
const RegionData = lazy(() => import("./components/RegionData.jsx"));
const TimezoneTable = lazy(() => import("./components/TimezoneTable.jsx"));
import Footer from "./components/Footer.jsx";

import "./App.css";

/**
 * @typedef {Object} CalendarSettings
 * @property {string} locale - The current locale.
 * @property {boolean} is12Hours - Whether to display time in 12-hour format.
 * @property {string} timeZone - The current time zone.
 */
export default function App() {
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
  if (!TIMEZONES.some(({ value }) => timeZone === value)) {
    /**
     * @param {string} tz -  IANA time zone identifier.
     * @return {string} The timezone long name.
     */
    const timeZoneLongName = tz =>
      new Intl.DateTimeFormat(locale, { timeStyle: "long", timeZone: tz })
        .formatToParts(firstTimeExecutedDateTime)
        .find(({ type }) => type === "timeZoneName")?.value;

    timeZone =
      TIMEZONES.find(({ value: tz }) => UTC.includes(timeZoneLongName(tz)))?.value ??
      TIMEZONES.find(({ value: tz }) => GMT.includes(timeZoneLongName(tz)))?.value ??
      TIMEZONES.at(-1).value;
  }

  const [calendar, setCalendar] = useState({
    locale,
    is12Hours: lang12Hours.some(({ value }) => value === localeLangScript),
    timeZone,
  });
  const [dateTimeIsSingleLine, setDateTimeIsSingleLine] = useState(true);

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
      <TimezoneTable locale={localeLangScript} />
      <Footer />
    </>
  );
}
