import type { Dispatch, FormEvent, JSX, ReactNode, SetStateAction } from "react";
import { useRef, useState } from "react";

import type { CalendarProps, Data } from "../../types.ts";

import { CALENDAR_OPTIONS, LANGUAGES, REGIONS } from "../data.ts";
import { getFlagEmoji, localeData, TIMEZONES } from "../util.ts";

import ToolbarRowRef from "./ToolbarRowRef.tsx";
import ToolbarRowState from "./ToolbarRowState.tsx";
import ToggleButton from "./ToggleButton.tsx";

import "./Toolbar.css";

export interface ToolbarRowProps {
  /** The title of the row. */
  title: string;
  /** The label for the select element. */
  label: string;
  /** The default value for the select element. */
  defaultValue: string;
  /** The options for the select element. */
  children: ReactNode;
}

interface ToolbarProps extends CalendarProps {
  /** Function to update the calendar settings. */
  setCalendar: Dispatch<SetStateAction<CalendarProps>>;
  /** Whether to display date and time in a single line or double lines. */
  dateTimeIsSingleLine: boolean;
  /** Function to update the date and time display mode (either a single line or double lines). */
  setDateTimeIsSingleLine: Dispatch<SetStateAction<boolean>>;
}

export default function Toolbar({
  locale,
  is12Hours,
  timeZone,
  setCalendar,
  dateTimeIsSingleLine: isSingleLine,
  setDateTimeIsSingleLine: setIsSingleLine,
}: ToolbarProps): JSX.Element {
  const { localeLangScript, localeReg, localeCalendar, localeNumber } = localeData(locale);

  let { CALENDARS, NUMBERS } = CALENDAR_OPTIONS;
  const sortFunction = (a: Data, b: Data): number =>
    a.title.localeCompare(b.title, "en", { collation: "ducet" });
  CALENDARS = [
    CALENDARS[0],
    ...CALENDARS.slice(1)
      .sort(sortFunction)
      .filter(({ value }: Data): boolean => Intl.supportedValuesOf("calendar").includes(value)),
  ];
  NUMBERS = [
    NUMBERS[0],
    ...NUMBERS.slice(1)
      .sort(sortFunction)
      .filter(({ value }: Data): boolean =>
        Intl.supportedValuesOf("numberingSystem").includes(value),
      ),
  ];

  const [toBeSelectedTimeZone, setToBeSelectedTimeZone] = useState<string>(timeZone);

  const languageScriptRef = useRef<HTMLSelectElement>(null);
  const regionRef = useRef<HTMLSelectElement>(null);
  const calendarRef = useRef<HTMLSelectElement>(null);
  const numberRef = useRef<HTMLSelectElement>(null);
  const hour12Ref = useRef<HTMLInputElement>(null);

  function handleSaveCalendar(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setCalendar((prevCalendar: CalendarProps): CalendarProps => {
      const newCalendar: CalendarProps = { ...prevCalendar };
      // TODO : Set new language and region
      const newLanguageScript: string = languageScriptRef.current?.value ?? localeLangScript;
      const newRegion: string =
        regionRef.current && regionRef.current.value !== "" ? "-" + regionRef.current.value : "";

      // TODO : Set new calendar and number
      const calendarRefValue: string =
        calendarRef.current && calendarRef.current.value !== "" ? calendarRef.current.value : "";
      const numberRefValue: string =
        numberRef.current && numberRef.current.value !== "" ? numberRef.current.value : "";

      // TODO : Set new calendar option based on set calendar and number
      const newCalendarOption: string =
        calendarRefValue !== "" && numberRefValue !== ""
          ? "-u-ca-" + calendarRefValue + "-nu-" + numberRefValue
          : calendarRefValue === "" && numberRefValue !== ""
            ? "-u-nu-" + numberRefValue
            : calendarRefValue !== "" && numberRefValue === ""
              ? "-u-ca-" + calendarRefValue
              : "";

      // TODO : Set new calendar
      newCalendar.locale = newLanguageScript + newRegion + newCalendarOption;
      newCalendar.is12Hours = hour12Ref.current?.checked ?? prevCalendar.is12Hours;
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
          <button
            onClick={() => setIsSingleLine((isSingleLine: boolean): boolean => !isSingleLine)}
          >
            View in {isSingleLine ? "Double Lines" : "a Single Line"}
          </button>
        </div>
      </div>
    </section>
  );
}
