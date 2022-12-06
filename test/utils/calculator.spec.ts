import { Calculator } from "../../src/utils/calculator";
import { describe, it, expect, beforeEach } from "vitest";

declare module "vitest" {
  export interface TestContext {
    calculator: Calculator;
  }
}

beforeEach((context) => {
  const calculator = new Calculator();
  context.calculator = calculator;
});

describe("Calculator", () => {
  it("should initialize with the value 0", ({ calculator }) => {
    expect(calculator.value).toBe(0);
  });

  describe("Utils", () => {
    it("should trim every floating point number to 1 decimal point for addtion", ({
      calculator,
    }) => {
      calculator.add(0.33333333333);
      expect(calculator.value).toBe(0.3);
    });
    it("should trim every floating point number to 1 decimal point for division", ({
      calculator,
    }) => {
      calculator.add(1);
      calculator.divide(3);
      expect(calculator.value).toBe(0.3);
    });
  });

  describe("Addition", () => {
    it("should return the value of the addition when calling the add function immediatly", ({
      calculator,
    }) => {
      expect(calculator.add(3)).toBe(3);
    });
    it("should store the result of add as the new value", ({ calculator }) => {
      calculator.add(5);
      expect(calculator.value).toBe(5);
    });
    it("should store the value of all additions after multiple additions", ({
      calculator,
    }) => {
      calculator.add(5);
      calculator.add(7);
      calculator.add(3);
      expect(calculator.value).toBe(15);
    });
    it("should return the result of multiple addtions", ({ calculator }) => {
      calculator.add(5);
      calculator.add(3);
      expect(calculator.add(1)).toBe(9);
    });
  });

  describe("Division", () => {
    it("should throw an Error when division by 0", ({ calculator }) => {
      expect(() => calculator.divide(0)).toThrowError(
        "Not allowed to divide by 0"
      );
    });
  });

  describe("Store", () => {
    it("should initialize the store as an empty array", ({ calculator }) => {
      expect(calculator.store).toEqual([]);
    });
    it("should store a reference to one calculation made", ({ calculator }) => {
      const expectation = [{ initial: 0, operation: "addition", result: 3 }];
      calculator.add(3);
      expect(calculator.store).toHaveLength(1);
      expect(calculator.store).toEqual(expectation);
    });
    it("should store a reference to every calculation made", ({
      calculator,
    }) => {
      const expectation = [
        { initial: 0, operation: "addition", result: 3 },
        { initial: 3, operation: "division", result: 1.5 },
        { initial: 1.5, operation: "addition", result: 15.5 },
      ];
      calculator.add(3);
      calculator.divide(2);
      calculator.add(14);
      console.log(calculator.store);
      expect(calculator.store).toHaveLength(3);
      expect(calculator.store).toEqual(expectation);
    });
  });
});
