/* eslint-disable react/prop-types */
import { useRef } from "react";
import { CALENDAR_OPTIONS, getFlagEmoji, LANGUAGES, REGIONS } from "../util.js";
import ToolbarRow from "./ToolbarRow.jsx";
import "./Toolbar.css";

export default function Toolbar({ calendar, setCalendar }) {
  let [localeNoCalendarOption, localeCalendarOption] = calendar.locale.split("-u-");
  const localeArray = localeNoCalendarOption.split("-");
  const localeLang =
    localeArray.length === 2
      ? localeArray[0]
      : localeArray.slice(0, localeArray.length - 1).join("-");
  const localeReg = localeArray.slice(-1)[0];
  localeCalendarOption = localeCalendarOption ?? "";
  const is12Hours = calendar.hour12;

  const languageRef = useRef();
  const regionRef = useRef();
  const calendarOptionRef = useRef();
  const hour12Ref = useRef();

  function handleSaveLocale(e) {
    e.preventDefault();
    setCalendar(prevLocale => {
      const newLocale = { ...prevLocale };
      const newLanguage = languageRef.current.value;
      const newRegion = regionRef.current.value;
      const newCalendarOption =
        calendarOptionRef.current && calendarOptionRef.current.value !== ""
          ? "-u-" + calendarOptionRef.current.value
          : "";

      newLocale.locale = newLanguage + "-" + newRegion + newCalendarOption;
      newLocale.hour12 = hour12Ref.current.checked;

      return newLocale;
    });
  }

  return (
    <section className="container">
      <form onSubmit={handleSaveLocale}>
        <ToolbarRow ref={languageRef} title="Language" label="language" defaultValue={localeLang}>
          {LANGUAGES.map(({ title, value }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </ToolbarRow>

        <ToolbarRow ref={regionRef} title="Region" label="region" defaultValue={localeReg}>
          {REGIONS.map(({ title, value }) => (
            <option key={value} value={value}>
              {title} {getFlagEmoji(value)}
            </option>
          ))}
        </ToolbarRow>

        <ToolbarRow
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
        </ToolbarRow>

        <div className="row">
          <div className="col-25">
            <div className="can-toggle can-toggle--size-small">
              <input
                id="hour12"
                name="hour12"
                type="checkbox"
                defaultChecked={is12Hours}
                ref={hour12Ref}
              />
              <label htmlFor="hour12">
                <div className="can-toggle__switch" data-checked="12H" data-unchecked="24H"></div>
              </label>
            </div>
          </div>
          <div className="col-75">
            <button>Set Locale!</button>
          </div>
        </div>
      </form>
    </section>
  );
}
