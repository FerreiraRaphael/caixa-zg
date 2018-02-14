import { findIndexByProp } from "./array";

describe("Utils Array", () => {
  describe("function findIndexByProp", () => {
    it("finds the index by prop value", () => {
      expect(findIndexByProp("value", 1)([
          { value: 1 }, 
          { value: 2 }
        ])).toBe(0);
    });

    it("doesnt find the index and return -1", () => {
        expect(findIndexByProp("value", 3)([
            { value: 1 }, 
            { value: 2 }
          ])).toBe(-1);
      });
  });
});
