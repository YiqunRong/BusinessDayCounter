import { generateHolidayDate, HolidayRule } from "../src/HolidayRule";
describe("HolidayRules", () => {
  describe("generateHolidayDate", () => {
    it("should return fixed holiday date", () => {
      const holidayRule = {
        type: "fixed",
        month: 1,
        day: 1,
      } as HolidayRule;
      const year = 2021;
      const result = generateHolidayDate(holidayRule, year);
      const expectedDay = new Date("2021-01-01");
      expect(result.getDate()).toStrictEqual(expectedDay.getDate());
    });
    it("should return adjusted holiday date", () => {
      const holidayRule = {
        // New Year's Day
        type: "adjusted",
        month: 1,
        day: 1,
      } as HolidayRule;
      const year = 2021;
      const result = generateHolidayDate(holidayRule, year);
      const expectedDay = new Date("2021-01-01");
      expect(result.getDate()).toStrictEqual(expectedDay.getDate());
    });
    it("should return floating holiday date", () => {
      const holidayRule = {
        // first Monday of the first week of January 2021
        type: "floating",
        month: 1,
        week: 1,
        weekday: 1,
      } as HolidayRule;
      const year = 2021;
      const result = generateHolidayDate(holidayRule, year);
      const expectedDay = new Date("2021-01-04");
      expect(result.getDate()).toStrictEqual(expectedDay.getDate());
    });
  });
});
