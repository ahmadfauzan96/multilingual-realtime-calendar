import { useState } from "react";
import { localeData } from "./util.js";

import Header from "./components/Header.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Display from "./components/Display.jsx";
import RegionData from "./components/RegionData.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

export default function App() {
  const {
    locale: userLocale,
    calendar: userCalendar,
    numberingSystem: userNumber,
    timeZone,
  } = Intl.DateTimeFormat().resolvedOptions();

  const { localeLang, localeLangScript, localeReg, localeCalendar, localeNumber } =
    localeData(userLocale);
  const locale =
    localeLangScript +
    (localeReg ? "-" + localeReg : "") +
    "-u-ca-" +
    (localeCalendar || userCalendar || "gregory") +
    "-nu-" +
    (localeNumber || userNumber || "latn");

  const languagesWith24HoursSystem = ["es", "fr", "id", "it", "nl", "pl"];

  const [calendar, setCalendar] = useState({
    locale,
    is12Hours: !languagesWith24HoursSystem.includes(localeLang),
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
