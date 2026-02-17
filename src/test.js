// import { LANGUAGES } from "./data";

// ? TEST : get default calendar, number, and hour cycles for each languages
// for (const { title, value } of LANGUAGES) {
//   const { calendar, numberingSystem, hourCycle, hour12 } = Intl.DateTimeFormat(value, {
//     dateStyle: "full",
//     timeStyle: "full",
//   }).resolvedOptions();
//   console.log(value, "|", title, "->", calendar, "|", numberingSystem, "|", hourCycle, "|", hour12);
// }

// ? TEST : put default calendar and number of each languages to respective arrays
// let calendarsArray = [];
// let numbersArray = [];
// let hourCycleArray = [];
// for (const { value } of LANGUAGES) {
//   const { calendar, numberingSystem, hourCycle } = Intl.DateTimeFormat(value, {
//     dateStyle: "full",
//     timeStyle: "full",
//   }).resolvedOptions();
//   if (!calendarsArray.includes(calendar)) {
//     calendarsArray.push(calendar);
//   }
//   if (!numbersArray.includes(numberingSystem)) {
//     numbersArray.push(numberingSystem);
//   }
//   if (hourCycle && !hourCycleArray.includes(hourCycle)) {
//     hourCycleArray.push(hourCycle);
//   }
// }
// console.log(calendarsArray, numbersArray, hourCycleArray); // * calendarsArray and numbersArray are never empty

// ? TEST : Display UTC time zone names in each languages in long and full formats
// for (const { title, value } of LANGUAGES) {
//   const UTCTzName = timeStyle =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "UTC" })
//       .formatToParts(date)
//       .find(({ type }) => type === "timeZoneName").value;
//   console.log(value, "|", title, "|", UTCTzName("long"), "|", UTCTzName("full"));
// }

// ? TEST : Display GMT time zone names in each languages in long and full formats
// for (const { title, value } of LANGUAGES) {
//   const GMTTzName = timeStyle =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "GMT" })
//       .formatToParts(date)
//       .find(({ type }) => type === "timeZoneName").value;
//   console.log(value, "|", title, "|", GMTTzName("long"), "|", GMTTzName("full"));
// }

// for (const { title, value } of LANGUAGES) {
//   const GMTTzName = timeStyle =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "Africa/Abidjan" })
//       .formatToParts(date)
//       .find(({ type }) => type === "timeZoneName").value;
//   console.log(value, "|", title, "|", GMTTzName("long"), "|", GMTTzName("full"));
// }

// for (const { title, value } of LANGUAGES) {
//   const GMTTzName = timeStyle =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "Atlantic/Reykjavik" })
//       .formatToParts(date)
//       .find(({ type }) => type === "timeZoneName").value;
//   console.log(value, "|", title, "|", GMTTzName("long"), "|", GMTTzName("full"));
// }
