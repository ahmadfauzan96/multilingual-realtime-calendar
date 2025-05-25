import { localeRegionData } from "../util.js";
import "./Footer.css";

export default function Footer() {
  function copyrightYear(createdYear) {
    const currentYear = new Date().getFullYear();
    return currentYear > createdYear
      ? createdYear + "-" + currentYear
      : currentYear === createdYear
      ? currentYear.toString()
      : "Not created yet.";
  }

  const { name, code, flag, timeZones } = localeRegionData;
  const timeZoneDoesExist = timeZones.length > 0;
  const timeZonesArePlural = timeZones.length > 1;

  return (
    <footer>
      <h2>
        Your location data (based on your locale timezone, <em>not</em> your IP address)
      </h2>
      <p>
        Region: {name}; Regional Code: {code}; Flag: {flag}
      </p>
      <br />

      <h2>Available timezone{timeZonesArePlural && "s"} in your region</h2>
      <p>{timeZoneDoesExist ? timeZones.join(", ") : "No timezone data"}</p>
      <br />

      <p>
        Created with ❤️ by{" "}
        <a href="https://github.com/ahmadfauzan96" target="_blank">
          Ahmad Fauzan Bagaskoro
        </a>{" "}
        © {copyrightYear(2024)}
      </p>
      <p>
        24-hours/12-hours toggle by{" "}
        <a href="https://codepen.io/personable/pen/NWLZrV" target="_blank">
          Chris Hart
        </a>{" "}
        © {copyrightYear(2014)}
      </p>
    </footer>
  );
}
