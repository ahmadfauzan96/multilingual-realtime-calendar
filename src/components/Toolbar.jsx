/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import { getFlagEmoji, localeData, TIMEZONES } from "../util.js";
import { CALENDAR_OPTIONS, LANGUAGES, REGIONS } from "../data.js";

import ToolbarRowRef from "./ToolbarRowRef.jsx";
import ToolbarRowState from "./ToolbarRowState.jsx";
import ToggleButton from "./ToggleButton.jsx";

import "./Toolbar.css";

/**
 * @typedef {Object} ToolbarProps
 * @property {React.Dispatch<React.SetStateAction<import("../App.jsx").CalendarSettings>>} setCalendar - Function to update the calendar settings.
 * @property {boolean} dateTimeIsSingleLine - Whether the date and time are displayed in a single line.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setDateTimeIsSingleLine - Function to update the date/time display mode.
 */
/** @typedef {ToolbarProps & import("../App.jsx").CalendarSettings} Props */
/** @param {Props} props */
export default function Toolbar({
  locale,
  is12Hours,
  timeZone,
  setCalendar,
  dateTimeIsSingleLine: isSingleLine,
  setDateTimeIsSingleLine: setIsSingleLine,
}) {
  const { localeLangScript, localeReg, localeCalendar, localeNumber } = localeData(locale);

  let { CALENDARS, NUMBERS } = CALENDAR_OPTIONS;
  CALENDARS = [
    CALENDARS[0],
    ...CALENDARS.slice(1).sort((a, b) =>
      a.title.localeCompare(b.title, "en", { collation: "ducet" }),
    ),
  ];
  NUMBERS = [
    NUMBERS[0],
    ...NUMBERS.slice(1).sort((a, b) =>
      a.title.localeCompare(b.title, "en", { collation: "ducet" }),
    ),
  ];

  const [toBeSelectedTimeZone, setToBeSelectedTimeZone] = useState(timeZone);

  const languageScriptRef = useRef();
  const regionRef = useRef();
  const calendarRef = useRef();
  const numberRef = useRef();
  const hour12Ref = useRef();

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function handleSaveCalendar(e) {
    e.preventDefault();
    setCalendar(prevCalendar => {
      const newCalendar = { ...prevCalendar };
      // TODO : Set new language and region
      const newLanguageScript = languageScriptRef.current.value;
      const newRegion =
        regionRef.current && regionRef.current.value !== "" ? "-" + regionRef.current.value : "";

      // TODO : Set new calendar and number
      const calendarRefValue =
        calendarRef.current && calendarRef.current.value !== "" ? calendarRef.current.value : "";
      const numberRefValue =
        numberRef.current && numberRef.current.value !== "" ? numberRef.current.value : "";

      // TODO : Set new calendar option based on set calendar and number
      const newCalendarOption =
        calendarRefValue !== "" && numberRefValue !== ""
          ? "-u-ca-" + calendarRefValue + "-nu-" + numberRefValue
          : calendarRefValue === "" && numberRefValue !== ""
            ? "-u-nu-" + numberRefValue
            : calendarRefValue !== "" && numberRefValue === ""
              ? "-u-ca-" + calendarRefValue
              : "";

      // TODO : Set new calendar
      newCalendar.locale = newLanguageScript + newRegion + newCalendarOption;
      newCalendar.is12Hours = hour12Ref.current.checked;
      newCalendar.timeZone = toBeSelectedTimeZone;

      return newCalendar;
    });
  }

  return (
    <section className="toolbar">
      <form onSubmit={e => handleSaveCalendar(e)}>
        <ToolbarRowRef
          ref={languageScriptRef}
          title="Language"
          label="language"
          defaultValue={localeLangScript}
        >
          {LANGUAGES.map(({ title, value }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </ToolbarRowRef>

        <ToolbarRowRef ref={regionRef} title="Region" label="region" defaultValue={localeReg}>
          {[REGIONS[0], ...REGIONS.slice(1)].map(({ title, value }) => (
            <option key={value} value={value}>
              {title +
                (value === "TW" && localeReg === "CN"
                  ? " " + getFlagEmoji(localeReg)
                  : value !== ""
                    ? " " + getFlagEmoji(value)
                    : "")}
            </option>
          ))}
        </ToolbarRowRef>

        <ToolbarRowRef
          ref={calendarRef}
          title="Calendar"
          label="calendar"
          defaultValue={localeCalendar}
        >
          {CALENDARS.map(({ title, value }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </ToolbarRowRef>

        <ToolbarRowRef ref={numberRef} title="Number" label="number" defaultValue={localeNumber}>
          {NUMBERS.map(({ title, value }) => (
            <option key={value} value={value}>
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
          <button onClick={() => setIsSingleLine(isSingleLine => !isSingleLine)}>
            View in {isSingleLine ? "Double Lines" : "a Single Line"}
          </button>
        </div>
      </div>
    </section>
  );
}
