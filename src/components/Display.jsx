/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { bcp47Normalize } from "bcp-47-normalize";
import { getDirection } from "../languages-direction.js";
import { firstTimeExecutedDateTime, localeData } from "../util.js";
import { uni2zg } from "../rabbit.js";
import { displayClass } from "../display-class.js";
import "./Display.css";

/**
 * @typedef {Object} DisplayProps
 * @property {boolean} dateTimeIsSingleLine - Whether the date and time are displayed in a single line.
 */
/** @typedef {DisplayProps & import("../App.jsx").CalendarSettings} Props */
/** @param {Props} props */
export default function Display({ locale, is12Hours, timeZone, dateTimeIsSingleLine }) {
  // * Single Line DateTime
  const dateTimeConfig = useMemo(
    () => ({ dateStyle: "full", timeStyle: "full", hour12: is12Hours, timeZone }),
    [is12Hours, timeZone],
  );
  const [dateTime, setDateTime] = useState(
    firstTimeExecutedDateTime.toLocaleString(locale, dateTimeConfig),
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
    [timeZone],
  );
  const [date, setDate] = useState(
    firstTimeExecutedDateTime.toLocaleDateString(locale, dateConfig),
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
    [is12Hours, timeZone],
  );
  const [time, setTime] = useState(
    firstTimeExecutedDateTime.toLocaleTimeString(locale, timeConfig),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString(locale, timeConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [locale, timeConfig]);

  // TODO : obtain language and script from locale to set the display class and other functions
  const { localeLang, localeScript, localeLangScript } = localeData(locale);

  // TODO : convert Myanmar Unicode to Myanmar Zawgyi if locale="my-Qaag-*"
  /**
   * @param {string} text
   */
  const convert2Zawgyi = text => (localeLangScript === "my-Qaag" ? uni2zg(text) : text);
  const dateTimeUni2Zg4Zg = convert2Zawgyi(dateTime);
  const dateUni2Zg4Zg = convert2Zawgyi(date);
  const timeUni2Zg4Zg = convert2Zawgyi(time);

  return (
    <section className={displayClass(localeLang, localeScript)}>
      <h3 className="display">
        Browser’s locale :{" "}
        <span className="locale">
          {locale + (bcp47Normalize(locale) !== locale ? " → " + bcp47Normalize(locale) : "")}
        </span>
      </h3>
      {dateTimeIsSingleLine ? (
        <h1 className="single-line" lang={locale} dir={getDirection(locale)}>
          <time dateTime={dateTimeUni2Zg4Zg}>{dateTimeUni2Zg4Zg}</time>
        </h1>
      ) : (
        <>
          <h1 lang={locale} dir={getDirection(locale)}>
            <time dateTime={dateUni2Zg4Zg}>{dateUni2Zg4Zg}</time>
          </h1>
          <h1 lang={locale} dir={getDirection(locale)}>
            <time dateTime={timeUni2Zg4Zg}>{timeUni2Zg4Zg}</time>
          </h1>
        </>
      )}
    </section>
  );
}
