import { useState } from "react";
import { firstTimeExecutedDateTime, localeData, TIMEZONES } from "./util.js";
import { greenwichMeridianTimeZones, universalTimeZones } from "./timezones.js";
import { languagesWith24HoursSystem } from "./data.js";

import Header from "./components/Header.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Display from "./components/Display.jsx";
import RegionData from "./components/RegionData.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

export default function App() {
  let {
    locale: userLocale,
    calendar: userCalendar,
    numberingSystem: userNumber,
    timeZone,
  } = new Intl.DateTimeFormat().resolvedOptions();

  // TODO : Construct a locale string based on the userLocale’s default calendar and number
  const { localeLangScript, localeReg, localeCalendar, localeNumber } = localeData(userLocale);
  const locale =
    localeLangScript +
    (localeReg ? "-" + localeReg : "") +
    "-u-ca-" +
    (localeCalendar !== "" ? localeCalendar : userCalendar) +
    "-nu-" +
    (localeNumber !== "" ? localeNumber : userNumber);

  // TODO : Default to UTC, GMT, or the last element of the TIMEZONES array if timeZone is undefined
  if (!TIMEZONES.some(({ value }) => value === timeZone)) {
    const timeZoneShortName = timeZone =>
      new Intl.DateTimeFormat(userLocale, { timeStyle: "long", timeZone })
        .formatToParts(firstTimeExecutedDateTime)
        .find(({ type }) => type === "timeZoneName")?.value;

    timeZone =
      TIMEZONES.find(({ value }) => universalTimeZones.includes(timeZoneShortName(value)))?.value ??
      TIMEZONES.find(({ value }) => greenwichMeridianTimeZones.includes(timeZoneShortName(value)))
        ?.value ??
      TIMEZONES.slice(-1)[0].value;
  }

  const [calendar, setCalendar] = useState({
    locale,
    is12Hours: !languagesWith24HoursSystem.includes(localeLangScript),
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
