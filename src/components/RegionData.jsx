/* eslint-disable react/prop-types */
import { countries, zones } from "moment-timezone/data/meta/latest.json";
import { compatibilityTimeZones } from "../timezones.js";
import { REGION_MAP } from "../data.js";
import { getFlagEmoji } from "../util.js";
import "./RegionData.css";

export default function RegionData({ timeZone }) {
  // ! For testing purposes
  // console.log(timeZone);
  // ? This is just for testing purposes, to simulate different timezones
  // ? In real usage, the timezone should be obtained from the user's locale or settings
  // * To test a specific timezone, uncomment the following line and set the desired timezone
  // const localeTimeZone = "Pacific/Auckland";
  // * To get a random timezone from the list of supported timezones, uncomment the following lines
  // const tzArray = Intl.supportedValuesOf("timeZone");
  // const localeTimeZone = tzArray[Math.floor(Math.random() * tzArray.length)];

  // * The code starts here
  const localeTimeZone = timeZone;

  const regionalCode =
    zones[localeTimeZone]?.countries[0] ||
    compatibilityTimeZones.find(tz => tz.oldTimeZone === localeTimeZone)?.regionalCode;

  const name = REGION_MAP[regionalCode] ?? "No region data";
  const code = regionalCode ?? "No regional code";
  const flag = getFlagEmoji(regionalCode) ?? "No flag data";
  const timeZones = countries[regionalCode]?.zones ?? (localeTimeZone ? [localeTimeZone] : [""]);

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
