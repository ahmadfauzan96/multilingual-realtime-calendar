// import { LANGUAGES } from "./data.ts";
// const config: Intl.DateTimeFormatOptions = {
//   dateStyle: "full",
//   timeStyle: "full",
// };

// ? TEST : get default calendar, number, and hour cycles for each languages
// for (const [index, { title, value }] of LANGUAGES.entries()) {
//   const { calendar, numberingSystem, hourCycle, hour12 } = Intl.DateTimeFormat(
//     value,
//     config,
//   ).resolvedOptions();
//   console.log(
//     value,
//     "|",
//     title,
//     "->",
//     calendar,
//     "|",
//     numberingSystem,
//     "|",
//     hourCycle,
//     "|",
//     hour12,
//     "|",
//     index,
//   );
// }

// ? TEST : put default calendar and number of each languages to respective arrays
// let calendarsArray: string[] = [];
// let numbersArray: string[] = [];
// let hourCycleArray: string[] = [];
// for (const { value } of LANGUAGES) {
//   const { calendar, numberingSystem, hourCycle } = Intl.DateTimeFormat(
//     value,
//     config,
//   ).resolvedOptions();
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
// console.log(
//   calendarsArray,
//   calendarsArray.length,
//   numbersArray,
//   numbersArray.length,
//   hourCycleArray,
//   hourCycleArray.length,
// ); // * calendarsArray and numbersArray are never empty

// ? TEST : Display UTC time zone names in each languages in long and full formats
// for (const [index, { title, value }] of LANGUAGES.entries()) {
//   const UTCTzName = (timeStyle: Intl.DateTimeFormatOptions["timeStyle"]): string =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "UTC" })
//       .formatToParts(Date.now())
//       .find(({ type }) => type === "timeZoneName")?.value ??
//     Intl.DateTimeFormat(value).resolvedOptions().timeZone;
//   console.log(value, "|", title, "|", UTCTzName("long"), "|", UTCTzName("full"), "|", index);
// }

// ? TEST : Display GMT time zone names in each languages in long and full formats
// for (const [index, { title, value }] of LANGUAGES.entries()) {
//   const GMTTzName = (timeStyle: Intl.DateTimeFormatOptions["timeStyle"]): string =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "GMT" })
//       .formatToParts(Date.now())
//       .find(({ type }) => type === "timeZoneName")?.value ??
//     Intl.DateTimeFormat(value).resolvedOptions().timeZone;
//   console.log(value, "|", title, "|", GMTTzName("long"), "|", GMTTzName("full"), "|", index);
// }

// for (const [index, { title, value }] of LANGUAGES.entries()) {
//   const GMTTzName = (timeStyle: Intl.DateTimeFormatOptions["timeStyle"]): string =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "Africa/Abidjan" })
//       .formatToParts(Date.now())
//       .find(({ type }) => type === "timeZoneName")?.value ??
//     Intl.DateTimeFormat(value).resolvedOptions().timeZone;
//   console.log(value, "|", title, "|", GMTTzName("long"), "|", GMTTzName("full"), "|", index);
// }

// for (const [index, { title, value }] of LANGUAGES.entries()) {
//   const GMTTzName = (timeStyle: Intl.DateTimeFormatOptions["timeStyle"]): string =>
//     new Intl.DateTimeFormat(value, { timeStyle, timeZone: "Atlantic/Reykjavik" })
//       .formatToParts(Date.now())
//       .find(({ type }) => type === "timeZoneName")?.value ??
//     Intl.DateTimeFormat(value).resolvedOptions().timeZone;
//   console.log(value, "|", title, "|", GMTTzName("long"), "|", GMTTzName("full"), "|", index);
// }
