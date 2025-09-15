import { localeRegionData } from "../util.js";
import "./RegionData.css";

export default function RegionData() {
  const { name, code, flag, timeZones } = localeRegionData;
  const formattedTZNoun = "timezone" + (timeZones.length > 1 ? "s" : "");

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
        {timeZones.join(", ")}{" "}
        <strong>
          ({timeZones.length} {formattedTZNoun})
        </strong>
      </p>
    </section>
  );
}
