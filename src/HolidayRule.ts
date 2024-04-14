export interface HolidayRule {
  type: "fixed" | "adjusted" | "floating";
  month: number;
  day?: number; // For fixed and adjusted
  week?: number; // For floating
  weekday?: number; // For floating
}

const getFixedHoliday = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day);
};

const getAdjustedHoliday = (year: number, month: number, day: number): Date => {
  const date = new Date(year, month - 1, day);
  if (date.getDay() === 0) {
    date.setDate(date.getDate() + 1);
  } else if (date.getDay() === 6) {
    date.setDate(date.getDate() + 2);
  }
  return date;
};

const getFloatingHoliday = (
  year: number,
  month: number,
  week: number,
  weekday: number
): Date => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const firstDesiredDay = ((weekday - dayOfWeek + 7) % 7) + 1;
  return new Date(year, month - 1, firstDesiredDay + (week - 1) * 7);
};

export const generateHolidayDate = (
  holidayRule: HolidayRule,
  year: number
): Date => {
  const { type, month, day, week, weekday } = holidayRule;
  switch (type) {
    case "fixed":
      if (!day) throw new Error("Fixed holiday must have a day.");
      return getFixedHoliday(year, month, day);
    case "adjusted":
      if (!day) throw new Error("Adjusted holiday must have a day.");
      return getAdjustedHoliday(year, month, day);
    case "floating":
      if (!week || !weekday)
        throw new Error("Floating holiday must have both week and weekday.");
      return getFloatingHoliday(year, month, week, weekday);
    default:
      throw new Error("HolidayRule type not recognized.");
  }
};
