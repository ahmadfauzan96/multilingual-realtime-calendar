/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import { getFlagEmoji, localeData, TIMEZONES } from "../util.js";
import { CALENDAR_OPTIONS, LANGUAGES, REGIONS } from "../data.js";
// ? for testing timezone names in various languages
// import { tzLongNameIntl, tzFullNameIntl, getFlagEmoji, localeData, TIMEZONES } from "../util.js";
// import { CALENDAR_OPTIONS, LANGUAGE_MAP, LANGUAGES, REGIONS } from "../data.js";
// import { getLocaleDirection } from "../languages-direction.js";

import ToolbarRowRef from "./ToolbarRowRef.jsx";
import ToolbarRowState from "./ToolbarRowState.jsx";
import ToggleButton from "./ToggleButton.jsx";

import "./Toolbar.css";
// ? for testing timezone names in various languages
// import "./Display.css";

export default function Toolbar({
  locale,
  is12Hours,
  timeZone,
  setCalendar,
  dateTimeIsSingleLine: isSingleLine,
  setDateTimeIsSingleLine: setIsSingleLine,
}) {
  const { localeLangScript, localeReg, localeCalendar, localeNumber } = localeData(locale);
  // ? for testing timezone names in various languages
  // const { localeLang, localeScript, localeLangScript, localeReg, localeCalendar, localeNumber } =
  //   localeData(locale);
  //   const displayClass =
  //   localeLang === "hy"
  //     ? "display-hy"
  //     : localeLang === "ja"
  //     ? "display-ja"
  //     : localeLang === "ko"
  //     ? "display-ko"
  //     : localeScript === "hans" || localeScript === "Hans"
  //     ? "display-zh-hans"
  //     : localeScript === "hant" || localeScript === "Hant"
  //     ? "display-zh-hant"
  //     : localeLang === "zh" || localeLang === "yue" || localeLang === "nan"
  //     ? "display-zh"
  //     : localeLang === "mn" && (localeScript === "mong" || localeScript === "Mong")
  //     ? "display-mn-mong"
  //     : localeLang === "bn" || localeScript === "beng" || localeScript === "Beng"
  //     ? "display-bn"
  //     : localeLang === "as"
  //     ? "display-as"
  //     : localeLang === "gu"
  //     ? "display-gu"
  //     : localeLang === "pa" && (localeScript !== "arab" || localeScript !== "Arab")
  //     ? "display-pa"
  //     : localeScript === "guru" || localeScript === "Guru"
  //     ? "display-pa-guru"
  //     : localeLang === "ta"
  //     ? "display-ta"
  //     : localeLang === "te"
  //     ? "display-te"
  //     : localeLang === "kn"
  //     ? "display-kn"
  //     : localeLang === "ml"
  //     ? "display-ml"
  //     : localeLang === "or"
  //     ? "display-or"
  //     : localeLang === "mni"
  //     ? "display-mni"
  //     : localeLang === "sat"
  //     ? "display-sat"
  //     : localeScript === "olck" || localeScript === "Olck"
  //     ? "display-olck"
  //     : localeLang === "si"
  //     ? "display-si"
  //     : localeLang === "bo" ||
  //       localeLang === "dz" ||
  //       localeLang === "sip" ||
  //       localeLang === "lbi" ||
  //       localeLang === "zau" ||
  //       localeLang === "scp" ||
  //       localeLang === "tsj" ||
  //       localeLang === "kkf" ||
  //       (localeLang === "bft" && (localeScript === "tibt" || localeScript === "Tibt")) ||
  //       (localeLang === "bft" && localeScript !== "arab" && localeScript !== "Arab") ||
  //       (localeLang === "jul" && (localeScript === "tibt" || localeScript === "Tibt")) ||
  //       (localeLang === "jul" && localeScript !== "deva" && localeScript !== "Deva") ||
  //       (localeLang === "xsr" && (localeScript === "tibt" || localeScript === "Tibt")) ||
  //       (localeLang === "xsr" && localeScript !== "deva" && localeScript !== "Deva")
  //     ? "display-bo"
  //     : localeLang === "lo"
  //     ? "display-lo"
  //     : localeLang === "km"
  //     ? "display-km"
  //     : localeLang === "my" || localeScript === "mymr" || localeScript === "Mymr"
  //     ? "display-my"
  //     : localeLang === "am"
  //     ? "display-am"
  //     : localeLang === "ti"
  //     ? "display-ti"
  //     : "display";

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
      newCalendar.is12Hours = hour12Ref.current.checked;
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

      {/* // ? Testing LXGW Wenkai TC font to Simplified Chinese */}
      {/* <h2>Timezone Names in Simplified Chinese</h2>
      <table className="display-zh" style={{ textAlign: "start" }}>
        <thead>
          <tr>
            <th>Value</th>
            <th>English (Short)</th>
            <th>English (Long)</th>
            <th lang="zh-Hans">简体中文 (短)</th>
            <th lang="zh-Hans">简体中文 (长)</th>
          </tr>
        </thead>
        <tbody>
          {TIMEZONES.map(({ value }) => (
            <tr key={value}>
              <td>{value}</td>
              <td>{tzLongNameIntl("en", value)}</td>
              <td>{tzFullNameIntl("en", value)}</td>
              <td lang="zh-Hans">{tzLongNameIntl("zh-Hans", value)}</td>
              <td lang="zh-Hans">{tzFullNameIntl("zh-Hans", value)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* // ? Testing LXGW Wenkai TC font to Traditional Chinese */}
      {/* <h2>Timezone Names in Traditional Chinese</h2>
      <table className="display-zh" style={{ textAlign: "start" }}>
        <thead>
          <tr>
            <th>Value</th>
            <th>English (Short)</th>
            <th>English (Long)</th>
            <th lang="zh-Hant">繁體中文 (短)</th>
            <th lang="zh-Hant">繁體中文 (長)</th>
          </tr>
        </thead>
        <tbody>
          {TIMEZONES.map(({ value }) => (
            <tr key={value}>
              <td>{value}</td>
              <td>{tzLongNameIntl("en", value)}</td>
              <td>{tzFullNameIntl("en", value)}</td>
              <td lang="zh-Hant">{tzLongNameIntl("zh-Hant", value)}</td>
              <td lang="zh-Hant">{tzFullNameIntl("zh-Hant", value)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* // ? Testing Klee One font to Japanese */}
      {/* <h2>Timezone Names in Japanese</h2>
      <table className="display-ja" style={{ textAlign: "start" }}>
        <thead>
          <tr>
            <th>Value</th>
            <th>English (Short)</th>
            <th>English (Long)</th>
            <th lang="ja">日本語 (低)</th>
            <th lang="ja">日本語 (長)</th>
          </tr>
        </thead>
        <tbody>
          {TIMEZONES.map(({ value }) => (
            <tr key={value}>
              <td>{value}</td>
              <td>{tzLongNameIntl("en", value)}</td>
              <td>{tzFullNameIntl("en", value)}</td>
              <td lang="ja">{tzLongNameIntl("ja", value)}</td>
              <td lang="ja">{tzFullNameIntl("ja", value)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* // ? Testing various languages */}
      {/* <h2>Timezone Names in {LANGUAGE_MAP[localeLangScript]}</h2>
      <table className={displayClass} style={{ textAlign: "start" }}>
        <thead>
          <tr>
            <th>Value</th>
            <th>English (Short)</th>
            <th>English (Long)</th>
            {localeLangScript !== "en" && (
              <>
                <th>{localeLangScript}</th>
                <th>{LANGUAGE_MAP[localeLangScript]}</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {TIMEZONES.map(({ value }) => (
            <tr key={value}>
              <td>{value}</td>
              <td>{tzLongNameIntl("en", value)}</td>
              <td>{tzFullNameIntl("en", value)}</td>
              {localeLangScript !== "en" && (
                <>
                  <td lang={localeLangScript} dir={getLocaleDirection(localeLangScript)}>
                    {tzLongNameIntl(localeLangScript, value)}
                  </td>
                  <td lang={localeLangScript} dir={getLocaleDirection(localeLangScript)}>
                    {tzFullNameIntl(localeLangScript, value)}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table> */}
    </section>
  );
}
