import { lazy, useState } from "react";
import { firstTimeExecutedDateTime, localeData, TIMEZONES } from "./util.js";
import {
  languagesWith12HoursSystem,
  UTCTimeZoneLongNames as UTC,
  GMTTimeZoneLongNames as GMT,
} from "./data.js";

import Header from "./components/Header.jsx";
const Toolbar = lazy(() => import("./components/Toolbar.jsx"));
const Display = lazy(() => import("./components/Display.jsx"));
const RegionData = lazy(() => import("./components/RegionData.jsx"));
import Footer from "./components/Footer.jsx";

import "./App.css";

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
    (localeReg ? "-" + localeReg : "") +
    "-u-ca-" +
    (localeCalendar !== "" ? localeCalendar : userCalendar) +
    "-nu-" +
    (localeNumber !== "" ? localeNumber : userNumber);

  // TODO : Default to UTC, GMT, or the last element of the TIMEZONES array if timeZone is undefined
  if (!TIMEZONES.some(({ value }) => value === timeZone)) {
    const timeZoneLongName = tz =>
      new Intl.DateTimeFormat(locale, { timeStyle: "long", timeZone: tz })
        .formatToParts(firstTimeExecutedDateTime)
        .find(({ type }) => type === "timeZoneName")?.value;

    timeZone =
      TIMEZONES.find(({ value: tz }) => UTC.includes(timeZoneLongName(tz)))?.value ??
      TIMEZONES.find(({ value: tz }) => GMT.includes(timeZoneLongName(tz)))?.value ??
      TIMEZONES.slice(-1)[0].value;
  }

  const [calendar, setCalendar] = useState({
    locale,
    is12Hours: languagesWith12HoursSystem.some(({ value }) => value === localeLangScript),
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
      <Footer />
    </>
  );
}
