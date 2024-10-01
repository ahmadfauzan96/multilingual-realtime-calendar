import { useState } from "react";

import Header from "./components/Header.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Display from "./components/Display.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

export default function App() {
  const [calendar, setCalendar] = useState({ locale: "id-ID", hour12: false });
  return (
    <>
      <Header />
      <Toolbar calendar={calendar} setCalendar={setCalendar} />
      <Display locale={calendar.locale} hour12={calendar.hour12} />
      <Footer />
    </>
  );
}
