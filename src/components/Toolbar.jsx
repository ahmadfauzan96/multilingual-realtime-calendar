/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { CALENDAR_OPTIONS, getFlagEmoji, LANGUAGES, REGIONS, TIMEZONES } from "../util.js";
import ToolbarRowRef from "./ToolbarRowRef.jsx";
import ToolbarRowState from "./ToolbarRowState.jsx";
import ToggleButton from "./ToggleButton.jsx";
import "./Toolbar.css";

export default function Toolbar({
  calendar,
  setCalendar,
  dateTimeIsSingleLine,
  setDateTimeIsSingleLine,
}) {
  const { locale, hour12: is12Hours, timeZone } = calendar;
  const [localeNoCalendarOption, localeCalendarOption] = locale.includes("-u-")
    ? locale.split("-u-")
    : [locale, ""];
  const localeLangReg = localeNoCalendarOption.split("-");
  const localeLang =
    localeLangReg.length <= 2
      ? localeLangReg.length === 2 && localeLangReg[1].length === 2
        ? localeLangReg[0]
        : localeLangReg.join("-")
      : localeLangReg.slice(0, localeLangReg.length - 1).join("-");
  const localeReg =
    localeLangReg.length >= 2
      ? localeLangReg.slice(-1)[0].length === 2
        ? localeLangReg.slice(-1)[0]
        : ""
      : "";

  const [toBeSelectedTimeZone, setToBeSelectedTimeZone] = useState(
    TIMEZONES.find(({ value }) => value === timeZone)?.value || "Asia/Jakarta"
  );

  const languageRef = useRef();
  const regionRef = useRef();
  const calendarOptionRef = useRef();
  const hour12Ref = useRef();

  function handleSaveCalendar(e) {
    e.preventDefault();
    setCalendar(prevCalendar => {
      const newCalendar = { ...prevCalendar };
      const newLanguage = languageRef.current.value;
      const newRegion =
        regionRef.current && regionRef.current.value !== "" ? "-" + regionRef.current.value : "";
      const newCalendarOption =
        calendarOptionRef.current && calendarOptionRef.current.value !== ""
          ? "-u-" + calendarOptionRef.current.value
          : "";

      newCalendar.locale = newLanguage + newRegion + newCalendarOption;
      newCalendar.hour12 = hour12Ref.current.checked;
      newCalendar.timeZone = toBeSelectedTimeZone;

      return newCalendar;
    });
  }

  return (
    <section className="toolbar">
      <form onSubmit={handleSaveCalendar}>
        <ToolbarRowRef
          ref={languageRef}
          title="Language"
          label="language"
          defaultValue={localeLang}
        >
          {LANGUAGES.map(({ title, value }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </ToolbarRowRef>

        <ToolbarRowRef ref={regionRef} title="Region" label="region" defaultValue={localeReg}>
          {REGIONS.map(({ title, value }) => (
            <option key={value} value={value}>
              {title} {getFlagEmoji(value)}
            </option>
          ))}
        </ToolbarRowRef>

        <ToolbarRowRef
          ref={calendarOptionRef}
          title="Calendar Option"
          label="calendar-option"
          defaultValue={localeCalendarOption}
        >
          {CALENDAR_OPTIONS.map(({ title, value }) => (
            <option key={title} value={value}>
              {title}
            </option>
          ))}
        </ToolbarRowRef>

        <ToolbarRowState
          setState={setToBeSelectedTimeZone}
          title="Time Zone"
          label="timezone"
          defaultValue={toBeSelectedTimeZone}
        >
          {TIMEZONES.map(({ title, value }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </ToolbarRowState>

        <div className="row">
          <div className="col-25">
            <ToggleButton
              ref={hour12Ref}
              label="hour12"
              defaultChecked={is12Hours}
              checkedTitle="12h"
              uncheckedTitle="24h"
            />
          </div>
          <div className="col-75">
            <button>Apply Calendar Settings</button>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-25" />
        <div className="col-75">
          <button onClick={() => setDateTimeIsSingleLine(isSingleLine => !isSingleLine)}>
            View in {dateTimeIsSingleLine ? "Double" : "a Single"} Line
            {dateTimeIsSingleLine && "s"}
          </button>
        </div>
      </div>
    </section>
  );
}
