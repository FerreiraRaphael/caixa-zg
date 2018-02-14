import {
  initSagaTester,
  mockPromiseReject,
  mockPromiseResolve
} from "../../lib/test/helpers";
import PurchaseReducer, {
  types,
  initialState,
  createPurchase,
  simulatePurchase
} from "./purchases";
import PurchasesSaga from "./purchases.saga";
import Api from "../../lib/api";

describe("Purchases sagas", () => {
  let sagaTester;
  beforeEach(() => {
    sagaTester = initSagaTester(initialState, PurchaseReducer, PurchasesSaga);
  });
  describe("createPurchase", () => {
    beforeEach(() => {
      Api.Purchases.createPurchase = jest.fn();
    });
    it("should call the api and call createPurchaseSuccess", async () => {
      Api.Purchases.createPurchase.mockReturnValue(mockPromiseResolve());
      sagaTester.dispatch(createPurchase([{ product: 1, quantity: 2 }]));
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        creating: true
      });
      await sagaTester.waitFor(types.CREATE_PURCHASE_SUCCESS);
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        creating: false
      });
    });

    it("should call the api and call createPurchaseError", async () => {
      const error = "error";
      Api.Purchases.createPurchase.mockReturnValue(mockPromiseReject(error));
      sagaTester.dispatch(createPurchase([{ product: 1, quantity: 2 }]));
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        creating: true
      });
      await sagaTester.waitFor(types.CREATE_PURCHASE_FAIL);
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        creating: false,
        creatingError: error
      });
    });
  });

  describe("simulatePurchase", () => {
    const simulation = {
      items: [
        {
          quantity: 10,
          product: "5a69bbbe085eb50006b7515b",
          subtotal: 120,
          discount: 0,
          total: 120
        },
        {
          quantity: 6,
          product: "5a69bbd2085eb50006b75162",
          subtotal: 4.8,
          discount: 0,
          total: 4.8
        }
      ],
      subtotal: 124.8,
      discount: 0,
      total: 124.8
    };
    beforeEach(() => {
      Api.Purchases.simulatePurchase = jest.fn();
    });
    it("should call the api and call simulatePurchaseSuccess", async () => {
      Api.Purchases.simulatePurchase.mockReturnValue(mockPromiseResolve(simulation));
      sagaTester.dispatch(simulatePurchase([{ product: 1, quantity: 2 }]));
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        simulating: true
      });
      await sagaTester.waitFor(types.SIMULATE_PURCHASE_SUCCESS);
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        simulating: false,
        simulation
      });
    });

    it("should call the api and call simulatePurchaseError", async () => {
      const error = "error";
      Api.Purchases.simulatePurchase.mockReturnValue(mockPromiseReject(error));
      sagaTester.dispatch(simulatePurchase([{ product: 1, quantity: 2 }]));
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        simulating: true
      });
      await sagaTester.waitFor(types.SIMULATE_PURCHASE_FAIL);
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        simulating: false,
        simulatingError: error
      });
    });
  });
});
