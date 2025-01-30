import { useState } from "react";

import Header from "./components/Header.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Display from "./components/Display.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

export default function App() {
  const { locale, hour12, timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [calendar, setCalendar] = useState({ locale, hour12: hour12 === true, timeZone });
  const [dateTimeIsSingleLine, setDateTimeIsSingleLine] = useState(false);
  return (
    <>
      <Header />
      <Toolbar
        calendar={calendar}
        setCalendar={setCalendar}
        dateTimeIsSingleLine={dateTimeIsSingleLine}
        setDateTimeIsSingleLine={setDateTimeIsSingleLine}
      />
      <Display {...calendar} dateTimeIsSingleLine={dateTimeIsSingleLine} />
      <Footer />
    </>
  );
}
