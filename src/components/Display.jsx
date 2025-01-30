/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { direction } from "../util.js";
import Rabbit from "../rabbit.js";
import "./Display.css";

export default function Display({ locale, hour12, timeZone, dateTimeIsSingleLine }) {
  const [dateTime, setDateTime] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(
        new Date().toLocaleString(locale, {
          dateStyle: "full",
          timeStyle: "full",
          hour12,
          timeZone,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [locale, hour12, timeZone]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(
        new Date().toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [locale, timeZone]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12,
          timeZone,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [locale, hour12, timeZone]);

  // * convert Myanmar Unicode to Myanmar Zawgyi if locale="my-qaag-*"
  const isZawgyi = locale.startsWith("my-qaag");
  const dateTimeUni2Zg4Zg = isZawgyi ? Rabbit.uni2zg(dateTime) : dateTime;
  const dateUni2Zg4Zg = isZawgyi ? Rabbit.uni2zg(date) : date;
  const timeUni2Zg4Zg = isZawgyi ? Rabbit.uni2zg(time) : time;

  const cssLocaleClass = locale.startsWith("hy")
    ? "display-hy"
    : locale.startsWith("ja")
    ? "display-ja"
    : locale.startsWith("ko")
    ? "display-ko"
    : locale.startsWith("zh-hans") || locale.startsWith("yue-hans") || locale.startsWith("nan-hans")
    ? "display-zh-hans"
    : locale.startsWith("zh-hant") || locale.startsWith("yue-hant") || locale.startsWith("nan-hant")
    ? "display-zh-hant"
    : locale.startsWith("mn-mong")
    ? "display-mn-mong"
    : locale.startsWith("bn")
    ? "display-bn"
    : locale.startsWith("as")
    ? "display-as"
    : locale.startsWith("gu")
    ? "display-gu"
    : locale.startsWith("pa-guru")
    ? "display-pa-guru"
    : locale.startsWith("ta")
    ? "display-ta"
    : locale.startsWith("te")
    ? "display-te"
    : locale.startsWith("kn")
    ? "display-kn"
    : locale.startsWith("ml")
    ? "display-ml"
    : locale.startsWith("or")
    ? "display-or"
    : locale.startsWith("si")
    ? "display-si"
    : locale.startsWith("bo")
    ? "display-bo"
    : locale.startsWith("dz")
    ? "display-dz"
    : locale.startsWith("lo")
    ? "display-lo"
    : locale.startsWith("km")
    ? "display-km"
    : locale.startsWith("my")
    ? "display-my"
    : locale.startsWith("am")
    ? "display-am"
    : locale.startsWith("ti")
    ? "display-ti"
    : "";
  const cssClass = cssLocaleClass !== "" ? cssLocaleClass : "display";

  return (
    <section className={cssClass} lang={locale} dir={direction(locale)}>
      {dateTimeIsSingleLine ? (
        <h1>
          <time dateTime={dateTimeUni2Zg4Zg}>{dateTimeUni2Zg4Zg}</time>
        </h1>
      ) : (
        <>
          <h1>
            <time dateTime={dateUni2Zg4Zg}>{dateUni2Zg4Zg}</time>
          </h1>
          <h1>
            <time dateTime={timeUni2Zg4Zg}>{timeUni2Zg4Zg}</time>
          </h1>
        </>
      )}
    </section>
  );
}
