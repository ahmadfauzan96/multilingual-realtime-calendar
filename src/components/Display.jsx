/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Rabbit from "../rabbit";
import "./Display.css";

export default function Display({ locale, hour12 }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(
        new Date().toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [locale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [locale, hour12]);

  // * convert Myanmar Unicode to Myanmar Zawgyi if locale="my-qaag-*"
  const dateUni2Zg4Zg = locale.includes("qaag") ? Rabbit.uni2zg(date) : date;
  const timeUni2Zg4Zg = locale.includes("qaag") ? Rabbit.uni2zg(time) : time;

  return (
    <section lang={locale} dir="auto">
      <h1>
        <time dateTime={dateUni2Zg4Zg}>{dateUni2Zg4Zg}</time>
      </h1>
      <h1>
        <time dateTime={timeUni2Zg4Zg}>{timeUni2Zg4Zg}</time>
      </h1>
    </section>
  );
}
