/* eslint-disable react/prop-types */
// ? for testing timezone names in various languages
import {
  tzLongNameIntl,
  tzFullNameIntl,
  tzLongName,
  tzFullName,
  localeData,
  TIMEZONES,
} from "../util.js";
import { LANGUAGE_MAP } from "../data.js";
import { getDirection } from "../languages-direction.js";
import { displayClass } from "../display-class.js";
import "./Display.css";

/**
 * @param {{locale: string}} props
 */
export default function TimezoneTable({ locale }) {
  const { localeLang, localeScript, localeLangScript } = localeData(locale);

  return (
    <>
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
              <td>{tzLongName(value)}</td>
              <td>{tzFullName(value)}</td>
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
              <td>{tzLongName(value)}</td>
              <td>{tzFullName(value)}</td>
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
              <td>{tzLongName(value)}</td>
              <td>{tzFullName(value)}</td>
              <td lang="ja">{tzLongNameIntl("ja", value)}</td>
              <td lang="ja">{tzFullNameIntl("ja", value)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* // ? Testing various languages */}
      <h2>Timezone Names in {LANGUAGE_MAP[localeLangScript]}</h2>
      <table className={displayClass(localeLang, localeScript)} style={{ textAlign: "start" }}>
        <thead>
          <tr>
            <th>Value</th>
            <th>en</th>
            <th>English</th>
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
              <td>{tzLongName(value)}</td>
              <td>{tzFullName(value)}</td>
              {localeLangScript !== "en" && (
                <>
                  <td lang={localeLangScript} dir={getDirection(localeLangScript)}>
                    {tzLongNameIntl(localeLangScript, value)}
                  </td>
                  <td lang={localeLangScript} dir={getDirection(localeLangScript)}>
                    {tzFullNameIntl(localeLangScript, value)}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
