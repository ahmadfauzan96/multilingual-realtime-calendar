/* eslint-disable react/prop-types */
import { localeRegionData } from "../util.js";
import "./RegionData.css";

/** @param {{timeZone: string}} props */
export default function RegionData({ timeZone }) {
  const { name, code, flag, activeTimeZones, deprecatedTimeZones } = localeRegionData(timeZone);

  const activeTzAmount =
    activeTimeZones.length === 1 && activeTimeZones[0] === "" ? 0 : activeTimeZones.length;
  const formattedActiveTZNoun = "timezone" + (activeTzAmount > 1 ? "s" : "");

  const deprecatedTzAmount =
    deprecatedTimeZones.length === 1 && deprecatedTimeZones[0] === ""
      ? 0
      : deprecatedTimeZones.length;
  const formattedDeprecatedTZNoun = "timezone" + (deprecatedTzAmount > 1 ? "s" : "");

  return (
    <section className="region-data">
      <h2>
        Your location data (based on your locale timezone, <em>not</em> your IP address)
      </h2>
      <p>
        {name} | {code} | {flag}
      </p>
      <br />

      <h2>Active {formattedActiveTZNoun} in your region</h2>
      <p>
        {activeTzAmount > 0 ? activeTimeZones.join(", ") + " " : "No active timezone data"}
        {activeTzAmount > 0 && (
          <strong>
            ({activeTzAmount} {formattedActiveTZNoun})
          </strong>
        )}
      </p>
      <br />

      <h2>Deprecated {formattedDeprecatedTZNoun} in your region</h2>
      <p>
        {deprecatedTzAmount > 0
          ? deprecatedTimeZones.join(", ") + " "
          : "No deprecated timezone data"}
        {deprecatedTzAmount > 0 && (
          <strong>
            ({deprecatedTzAmount} {formattedDeprecatedTZNoun})
          </strong>
        )}
      </p>
    </section>
  );
}
