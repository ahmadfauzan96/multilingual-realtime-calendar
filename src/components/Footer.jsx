import "./Footer.css";

export default function Footer() {
  /**
   * @param {number} createdYear - The year the copyright was created.
   * @return {string} The copyright year range, or the copyright year if the project is newly made.
   */
  function copyrightYear(createdYear) {
    const currentYear = new Date().getFullYear();
    return currentYear > createdYear
      ? createdYear + "-" + currentYear
      : currentYear === createdYear
        ? currentYear.toString()
        : "Not created yet.";
  }

  return (
    <footer>
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
