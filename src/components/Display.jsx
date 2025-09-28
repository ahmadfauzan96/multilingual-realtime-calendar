/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { bcp47Normalize } from "bcp-47-normalize";
import { getLocaleDirection } from "../languages-direction.js";
import { firstTimeExecutedDateTime, localeData } from "../util.js";
import { uni2zg } from "../rabbit.js";
import "./Display.css";

export default function Display({ locale, is12Hours, timeZone, dateTimeIsSingleLine }) {
  // * Single Line DateTime
  const dateTimeConfig = useMemo(
    () => ({ dateStyle: "full", timeStyle: "full", hour12: is12Hours, timeZone }),
    [is12Hours, timeZone]
  );
  const [dateTime, setDateTime] = useState(
    firstTimeExecutedDateTime.toLocaleString(locale, dateTimeConfig)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString(locale, dateTimeConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [locale, dateTimeConfig]);

  // * Double Line for Separate Date and Time
  // ? Date
  const dateConfig = useMemo(
    () => ({ weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone }),
    [timeZone]
  );
  const [date, setDate] = useState(
    firstTimeExecutedDateTime.toLocaleDateString(locale, dateConfig)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleDateString(locale, dateConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [locale, dateConfig]);

  // ? Time
  const timeConfig = useMemo(
    () => ({ hour: "numeric", minute: "2-digit", second: "2-digit", hour12: is12Hours, timeZone }),
    [is12Hours, timeZone]
  );
  const [time, setTime] = useState(
    firstTimeExecutedDateTime.toLocaleTimeString(locale, timeConfig)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString(locale, timeConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [locale, timeConfig]);

  // TODO : obtain language and script from locale to set the display class and other functions
  const { localeLang, localeScript } = localeData(locale);

  // TODO : convert Myanmar Unicode to Myanmar Zawgyi if locale="my-qaag-*" or locale="my-Qaag-*"
  const localeIsZawgyi =
    localeLang === "my" && (localeScript === "qaag" || localeScript === "Qaag");
  const convert2Zawgyi = data => (localeIsZawgyi ? uni2zg(data) : data);
  const dateTimeUni2Zg4Zg = convert2Zawgyi(dateTime);
  const dateUni2Zg4Zg = convert2Zawgyi(date);
  const timeUni2Zg4Zg = convert2Zawgyi(time);

  const displayClass =
    localeLang === "hy"
      ? "display-hy"
      : localeLang === "ja"
      ? "display-ja"
      : localeLang === "ko"
      ? "display-ko"
      : localeScript === "hans" || localeScript === "Hans"
      ? "display-zh-hans"
      : localeScript === "hant" || localeScript === "Hant"
      ? "display-zh-hant"
      : localeLang === "zh" || localeLang === "yue" || localeLang === "nan"
      ? "display-zh"
      : localeLang === "mn" && (localeScript === "mong" || localeScript === "Mong")
      ? "display-mn-mong"
      : localeLang === "bn" || localeScript === "beng" || localeScript === "Beng"
      ? "display-bn"
      : localeLang === "as"
      ? "display-as"
      : localeLang === "gu"
      ? "display-gu"
      : localeLang === "pa" && (localeScript !== "arab" || localeScript !== "Arab")
      ? "display-pa"
      : localeScript === "guru" || localeScript === "Guru"
      ? "display-pa-guru"
      : localeLang === "ta"
      ? "display-ta"
      : localeLang === "te"
      ? "display-te"
      : localeLang === "kn"
      ? "display-kn"
      : localeLang === "ml"
      ? "display-ml"
      : localeLang === "or"
      ? "display-or"
      : localeLang === "mni"
      ? "display-mni"
      : localeLang === "sat"
      ? "display-sat"
      : localeScript === "olck" || localeScript === "Olck"
      ? "display-olck"
      : localeLang === "si"
      ? "display-si"
      : localeLang === "bo" ||
        localeLang === "dz" ||
        localeLang === "sip" ||
        localeLang === "lbi" ||
        localeLang === "zau" ||
        localeLang === "scp" ||
        localeLang === "tsj" ||
        localeLang === "kkf" ||
        (localeLang === "bft" && (localeScript === "tibt" || localeScript === "Tibt")) ||
        (localeLang === "bft" && localeScript !== "arab" && localeScript !== "Arab") ||
        (localeLang === "jul" && (localeScript === "tibt" || localeScript === "Tibt")) ||
        (localeLang === "jul" && localeScript !== "deva" && localeScript !== "Deva") ||
        (localeLang === "xsr" && (localeScript === "tibt" || localeScript === "Tibt")) ||
        (localeLang === "xsr" && localeScript !== "deva" && localeScript !== "Deva")
      ? "display-bo"
      : localeLang === "lo"
      ? "display-lo"
      : localeLang === "km"
      ? "display-km"
      : localeLang === "my" || localeScript === "mymr" || localeScript === "Mymr"
      ? "display-my"
      : localeLang === "am"
      ? "display-am"
      : localeLang === "ti"
      ? "display-ti"
      : "display";
  // * Latin, Greek, Cyrillic, Hebrew, Arabic, Devanagari, Thai, and Georgian scripts
  // * are already covered by default "display" class

  return (
    <section className={displayClass} lang={locale} dir={getLocaleDirection(locale)}>
      <h3 className="display" lang="en" dir="ltr">
        Browser’s locale :{" "}
        <span className="locale">
          {locale + (bcp47Normalize(locale) !== locale ? " → " + bcp47Normalize(locale) : "")}
        </span>
      </h3>
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
