/* eslint-disable react/prop-types */
import { localeRegionData } from "../util.js";
import "./RegionData.css";

export default function RegionData({ timeZone }) {
  const { name, code, flag, timeZones } = localeRegionData(timeZone);
  const tzAmount = timeZones.length === 1 && timeZones[0] === "" ? 0 : timeZones.length;
  const formattedTZNoun = "timezone" + (tzAmount > 1 ? "s" : "");

  return (
    <section className="region-data">
      <h2>
        Your location data (based on your locale timezone, <em>not</em> your IP address)
      </h2>
      <p>
        {name} | {code} | {flag}
      </p>
      <br />

      <h2>Available {formattedTZNoun} in your region</h2>
      <p>
        {tzAmount > 0 ? timeZones.join(", ") + " " : "No timezone data"}
        {tzAmount > 0 && (
          <strong>
            ({tzAmount} {formattedTZNoun})
          </strong>
        )}
      </p>
    </section>
  );
}
