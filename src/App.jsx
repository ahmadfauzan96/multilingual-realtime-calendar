import { useState } from "react";

import Header from "./components/Header.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Display from "./components/Display.jsx";
import RegionData from "./components/RegionData.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

export default function App() {
  const { locale, hour12, timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [calendar, setCalendar] = useState({ locale, hour12: hour12 === true, timeZone });
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
      <RegionData />
      <Footer />
    </>
  );
}
