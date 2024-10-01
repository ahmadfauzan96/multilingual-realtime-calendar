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

  return (
    <footer>
      <p>
        Created with ❤️ by <a href="https://github.com/ahmadfauzan96">Ahmad Fauzan Bagaskoro</a> ©{" "}
        {copyrightYear(2024)}
      </p>
      <p>
        24-hours/12-hours toggle by{" "}
        <a href="https://codepen.io/personable/pen/NWLZrV">Chris Hart</a> © {copyrightYear(2014)}
      </p>
    </footer>
  );
}
