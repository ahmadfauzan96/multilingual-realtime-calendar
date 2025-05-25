/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { direction } from "../util.js";
import Rabbit from "../rabbit.js";
import "./Display.css";

export default function Display({ locale, hour12, timeZone, dateTimeIsSingleLine }) {
  // * Single Line DateTime
  const [dateTime, setDateTime] = useState("");
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

  // * Double Line for Separate Date and Time
  const [date, setDate] = useState("");
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

  const [time, setTime] = useState("");
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

  // * convert Myanmar Unicode to Myanmar Zawgyi if locale="my-qaag-*" or locale="my-Qaag-*"
  const localeIsZawgyi = locale.startsWith("my-qaag") || locale.startsWith("my-Qaag");
  const convert2Zawgyi = data => (localeIsZawgyi ? Rabbit.uni2zg(data) : data);
  const dateTimeUni2Zg4Zg = convert2Zawgyi(dateTime);
  const dateUni2Zg4Zg = convert2Zawgyi(date);
  const timeUni2Zg4Zg = convert2Zawgyi(time);

  const cssClass = locale.startsWith("hy")
    ? "display-hy"
    : locale.startsWith("ja")
    ? "display-ja"
    : locale.startsWith("ko")
    ? "display-ko"
    : locale.includes("hans") || locale.includes("Hans")
    ? "display-zh-hans"
    : locale.includes("hant") || locale.includes("Hant")
    ? "display-zh-hant"
    : locale.startsWith("zh") || locale.startsWith("yue") || locale.startsWith("nan")
    ? "display-zh"
    : locale.startsWith("mn-mong") || locale.startsWith("mn-Mong")
    ? "display-mn-mong"
    : locale.startsWith("mn") && locale.split("")[2] === "-"
    ? "display-mn"
    : locale.startsWith("bn")
    ? "display-bn"
    : locale.startsWith("as")
    ? "display-as"
    : locale.startsWith("gu")
    ? "display-gu"
    : locale.startsWith("pa-guru") || locale.startsWith("pa-Guru")
    ? "display-pa-guru"
    : locale.startsWith("pa")
    ? "display-pa"
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
    : locale.startsWith("sat")
    ? "display-sat"
    : locale.includes("olck") || locale.includes("Olck")
    ? "display-olck"
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
    : locale.startsWith("my") || locale.includes("mymr") || locale.includes("Mymr")
    ? "display-my"
    : locale.startsWith("am")
    ? "display-am"
    : locale.startsWith("ti")
    ? "display-ti"
    : "display";
  // * Latin, Greek, Cyrillic, Hebrew, Arabic, Devanagari, Thai, and Georgian scripts
  // * are already covered by default "display" class

  return (
    <section className={cssClass} lang={locale} dir={direction(locale)}>
      {dateTimeIsSingleLine ? (
        <h1 className="single-line">
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
