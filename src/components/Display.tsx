import { type JSX, useEffect, useMemo, useState } from "react";
import { bcp47Normalize } from "bcp-47-normalize";

import type { CalendarProps } from "../../types.ts";

import { getDirection } from "../languages-direction.ts";
import { firstTimeExecutedDateTime, localeData } from "../util.ts";
import { uni2zg } from "../rabbit.ts";
import { displayClass } from "../display-class.ts";

import "./Display.css";

interface DisplayProps extends CalendarProps {
  /** Whether to display date and time in a single line or double lines. */
  dateTimeIsSingleLine: boolean;
}

export default function Display({
  locale,
  is12Hours,
  timeZone,
  dateTimeIsSingleLine,
}: DisplayProps): JSX.Element {
  // * Single Line DateTime
  const dateTimeConfig = useMemo<Intl.DateTimeFormatOptions>(
    () => ({
      dateStyle: "full",
      timeStyle: "full",
      hour12: is12Hours,
      timeZone,
    }),
    [is12Hours, timeZone],
  );
  const [dateTime, setDateTime] = useState<string>(
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
  const dateConfig = useMemo<Intl.DateTimeFormatOptions>(
    () => ({
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone,
    }),
    [timeZone],
  );
  const [date, setDate] = useState<string>(
    firstTimeExecutedDateTime.toLocaleDateString(locale, dateConfig),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleDateString(locale, dateConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [locale, dateConfig]);

  // ? Time
  const timeConfig = useMemo<Intl.DateTimeFormatOptions>(
    () => ({
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: is12Hours,
      timeZone,
    }),
    [is12Hours, timeZone],
  );
  const [time, setTime] = useState<string>(
    firstTimeExecutedDateTime.toLocaleTimeString(locale, timeConfig),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString(locale, timeConfig));
    }, 1000);
    return () => clearInterval(interval);
  }, [locale, timeConfig]);

  // TODO : obtain language and script from locale to set the display class and other functions
  const { localeLang, localeScript } = localeData(locale);

  // TODO : convert Myanmar Unicode to Myanmar Zawgyi if script="Qaag"
  const convert2Zawgyi = (text: string): string => (localeScript === "Qaag" ? uni2zg(text) : text);
  const dateTimeUni2Zg4Zg: string = convert2Zawgyi(dateTime);
  const dateUni2Zg4Zg: string = convert2Zawgyi(date);
  const timeUni2Zg4Zg: string = convert2Zawgyi(time);

  // TODO : get user locale
  const userLocale: string = new Intl.DateTimeFormat().resolvedOptions().locale;

  return (
    <section className={displayClass(localeLang, localeScript)}>
      <h3 className="display">
        User’s locale :{" "}
        <span className="locale">
          {userLocale +
            (bcp47Normalize(userLocale) !== userLocale ? " → " + bcp47Normalize(userLocale) : "")}
        </span>
        <br />
        Display’s locale :{" "}
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
