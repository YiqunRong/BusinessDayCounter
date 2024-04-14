import BusinessDayCounter from "../src/BusinessDayCounter";
import type { HolidayRule } from "../src/HolidayRule";

describe("BusinessDayCounter", () => {
  describe("WeekdaysBetweenTwoDates", () => {
    it("should return 0 when first date is greater than second date", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2021-01-01");
      const secondDate = new Date("2020-01-01");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(0);
    });
    it("should return 0 when first date is equal to second date", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2021-01-01");
      const secondDate = new Date("2021-01-01");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(0);
    });
    it("should return correct days if both first day and second day are Saturday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2024-04-13");
      const secondDate = new Date("2024-04-20");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(5);
    });
    it("should return correct days if first day is Sunday and second day are Tursaday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2024-04-14");
      const secondDate = new Date("2024-04-18");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(3);
    });
    it("should return correct days if first day is Friday and second day are Monday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2024-04-12");
      const secondDate = new Date("2024-04-15");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(0);
    });

    it("should return correct days if first day is Monday and second day are Monday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2024-04-8");
      const secondDate = new Date("2024-04-15");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(4);
    });

    it("should return correct days if first day is Friday and second day are Friday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2024-04-12");
      const secondDate = new Date("2024-04-19");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(4);
    });

    it("should return correct days if first day is Saturday and second day are Tuesday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2013-10-05");
      const secondDate = new Date("2013-10-14");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(5);
    });

    it("should return correct days if first day is Sunday and second day is Wedsday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2013-10-07");
      const secondDate = new Date("2014-01-01");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(61);
    });

    it("should return correct days if first day is Sunday and second day is Wedsday", () => {
      const businessDayCounter = new BusinessDayCounter();
      const firstDate = new Date("2013-10-05");
      const secondDate = new Date("2013-01-07");
      const result = businessDayCounter.WeekdaysBetweenTwoDates(
        firstDate,
        secondDate,
      );
      expect(result).toBe(0);
    });
  });

  describe("BusinessDaysBetweenTwoDates", () => {
    describe("with holidayList of Dates", () => {
      it("should return correct days if first day is Sunday and second day is Wedsday with holidayList", () => {
        const businessDayCounter = new BusinessDayCounter();
        const firstDate = new Date("2013-10-07");
        const secondDate = new Date("2013-10-09");
        const holidayList = [
          new Date("2013-12-25"),
          new Date("2013-12-26"),
          new Date("2014-01-01"),
        ];
        const result = businessDayCounter.BusinessDaysBetweenTwoDates(
          firstDate,
          secondDate,
          holidayList,
        );
        expect(result).toBe(1);
      });

      it("should return correct days if first day is Tuesday and second day is Friday with holidayList", () => {
        const businessDayCounter = new BusinessDayCounter();
        const firstDate = new Date("2013-12-24");
        const secondDate = new Date("2013-12-27");
        const holidayList = [
          new Date("2013-12-25"),
          new Date("2013-12-26"),
          new Date("2014-01-01"),
        ];
        const result = businessDayCounter.BusinessDaysBetweenTwoDates(
          firstDate,
          secondDate,
          holidayList,
        );
        expect(result).toBe(0);
      });

      it("should return correct days if first day is Sunday and second day is Wedsday with holidayList", () => {
        const businessDayCounter = new BusinessDayCounter();
        const firstDate = new Date("2013-10-07");
        const secondDate = new Date("2014-01-01");
        const holidayList = [
          new Date("2013-12-25"),
          new Date("2013-12-26"),
          new Date("2014-01-01"),
        ];
        const result = businessDayCounter.BusinessDaysBetweenTwoDates(
          firstDate,
          secondDate,
          holidayList,
        );
        expect(result).toBe(59);
      });
    });
    describe("with holidayList of HolidayRules", () => {
      it("should return correct days if first day is Monday and second day is Wedsday with holidayList", () => {
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
        expect(result).toBe(61);
      });
    });
  });
});
