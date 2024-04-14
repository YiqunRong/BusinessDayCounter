//example
import BusinessDayCounter from "./BusinessDayCounter";
import { HolidayRule } from "./HolidayRule";
const businessDayCounter = new BusinessDayCounter();
const firstDate = new Date("2013-10-07");
const secondDate = new Date("2014-01-01");
const holidayList = [
  { type: "fixed", month: 4, day: 25 }, // Anzac Day
  { type: "adjusted", month: 1, day: 1 }, // New Year's Day
  { type: "floating", month: 6, week: 2, weekday: 1 }, // Queen's Birthday
] as HolidayRule[];
const result = businessDayCounter.BusinessDaysBetweenTwoDates(
  firstDate,
  secondDate,
  holidayList,
);

console.log(`BusinessDaysBetween 2013-10-07 and 2014-01-01 is ${result}`);
