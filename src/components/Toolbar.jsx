/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { getFlagEmoji, localeData, TIMEZONES } from "../util.js";
import { CALENDAR_OPTIONS, LANGUAGES, REGIONS } from "../data.js";
import ToolbarRowRef from "./ToolbarRowRef.jsx";
import ToolbarRowState from "./ToolbarRowState.jsx";
import ToggleButton from "./ToggleButton.jsx";
import "./Toolbar.css";

export default function Toolbar({
  locale,
  hour12: is12Hours,
  timeZone,
  setCalendar,
  dateTimeIsSingleLine: isSingleLine,
  setDateTimeIsSingleLine: setIsSingleLine,
}) {
  const { localeLangScript, localeReg, localeCalendar, localeNumber } = localeData(locale);
  const { CALENDARS, NUMBERS } = CALENDAR_OPTIONS;

  const [toBeSelectedTimeZone, setToBeSelectedTimeZone] = useState(timeZone);

  const languageScriptRef = useRef();
  const regionRef = useRef();
  const calendarRef = useRef();
  const numberRef = useRef();
  const hour12Ref = useRef();

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
      newCalendar.hour12 = hour12Ref.current.checked;
      newCalendar.timeZone = toBeSelectedTimeZone;

      return newCalendar;
    });
  }

  return (
    <section className="toolbar">
      <form onSubmit={handleSaveCalendar}>
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
          {REGIONS.map(({ title, value }) => (
            <option key={value} value={value}>
              {title} {getFlagEmoji(value)}
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
