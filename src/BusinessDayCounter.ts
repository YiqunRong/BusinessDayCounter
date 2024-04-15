import type { HolidayRule } from "./HolidayRule";
import { generateHolidayDate } from "./HolidayRule";

class BusinessDayCounter {
  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    const firstDateday = firstDate.getDay();
    const secondDateday = secondDate.getDay();
    const inclusiveFirstDate = firstDate;
    const inclusiveSecondDate = secondDate;

    if (firstDateday === 5) {
      inclusiveFirstDate.setDate(firstDate.getDate() + 3);
    } else if (firstDateday === 6) {
      inclusiveFirstDate.setDate(firstDate.getDate() + 2);
    } else {
      inclusiveFirstDate.setDate(firstDate.getDate() + 1);
    }

    if (secondDateday === 1) {
      inclusiveSecondDate.setDate(secondDate.getDate() - 3);
    } else if (secondDateday === 0) {
      inclusiveSecondDate.setDate(secondDate.getDate() - 2);
    } else {
      inclusiveSecondDate.setDate(secondDate.getDate() - 1);
    }

    if (inclusiveFirstDate.getTime() > inclusiveSecondDate.getTime()) {
      return 0;
    }

    if (inclusiveFirstDate.getTime() === inclusiveSecondDate.getTime()) {
      return 1;
    }

    const diffDays = Math.floor(
      (inclusiveSecondDate.getTime() - inclusiveFirstDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (inclusiveFirstDate.getDay() <= inclusiveSecondDate.getDay()) {
      return Math.floor(diffDays / 7) * 5 + (diffDays % 7) + 1;
    }
    return Math.floor(diffDays / 7) * 5 + (diffDays % 7) - 1;
  }

  BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: (Date | HolidayRule)[]
  ): number {
    let weekdays = this.WeekdaysBetweenTwoDates(firstDate, secondDate);
    for (const publicHoliday of publicHolidays) {
      if (publicHoliday instanceof Date) {
        if (
          publicHoliday.getTime() >= firstDate.getTime() &&
          publicHoliday.getTime() <= secondDate.getTime()
        ) {
          if (publicHoliday.getDay() !== 0 && publicHoliday.getDay() !== 6) {
            weekdays--;
          }
        }
      } else {
        const startYear = firstDate.getFullYear();
        const endYear = secondDate.getFullYear();
        const years = Array.from(
          { length: endYear - startYear + 1 },
          (v, i) => startYear + i
        );
        for (const year of years) {
          const holidayDate = generateHolidayDate(publicHoliday, year);
          if (
            holidayDate.getTime() >= firstDate.getTime() &&
            holidayDate.getTime() <= secondDate.getTime()
          ) {
            if (holidayDate.getDay() !== 0 && holidayDate.getDay() !== 6) {
              weekdays--;
            }
          }
        }
      }
    }
    return weekdays;
  }
}

export default BusinessDayCounter;
