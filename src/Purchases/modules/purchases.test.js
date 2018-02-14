import PurchasesReducer, {
  initialState,
  types,
  createPurchase,
  createPurchaseError,
  createPurchaseSuccess,
  simulatePurchase,
  simulatePurchaseError,
  simulatePurchaseSuccess,
  addItem,
  removeItem,
  deleteItem,
  cleanItems
} from "./purchases";
describe("Purchase Redux module", () => {
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
  describe("Purchase actions", () => {
    it("should create a CREATE_PURCHASE action", () => {
      expect(createPurchase()).toEqual({ type: types.CREATE_PURCHASE });
    });

    it("should create a CREATE_PURCHASE_SUCCESS action", () => {
      expect(createPurchaseSuccess()).toEqual({
        type: types.CREATE_PURCHASE_SUCCESS
      });
    });

    it("should create a CREATE_PURCHASE_FAIL action", () => {
      const error = { error: "Error" };
      expect(createPurchaseError(error)).toEqual({
        type: types.CREATE_PURCHASE_FAIL,
        payload: error
      });
    });

    it("should create a SIMULATE_PURCHASE action", () => {
      expect(simulatePurchase()).toEqual({ type: types.SIMULATE_PURCHASE });
    });

    it("should create a SIMULATE_PURCHASE_SUCCESS action", () => {
      expect(simulatePurchaseSuccess(simulation)).toEqual({
        type: types.SIMULATE_PURCHASE_SUCCESS,
        payload: simulation
      });
    });

    it("should create a SIMULATE_PURCHASE_FAIL action", () => {
      const error = { error: "Error" };
      expect(simulatePurchaseError(error)).toEqual({
        type: types.SIMULATE_PURCHASE_FAIL,
        payload: error
      });
    });

    it("should create a ADD_ITEM action", () => {
      const id = "1";
      expect(addItem(id)).toEqual({
        type: types.ADD_ITEM,
        payload: id
      });
    });

    it("should create a REMOVE_ITEM action", () => {
      const id = "1";
      expect(removeItem(id)).toEqual({
        type: types.REMOVE_ITEM,
        payload: id
      });
    });

    it("should create a DELETE_ITEM action", () => {
      const id = "1";
      expect(deleteItem(id)).toEqual({
        type: types.DELETE_ITEM,
        payload: id
      });
    });

    it("should create a CLEAN_ITEMS action", () => {
      expect(cleanItems()).toEqual({
        type: types.CLEAN_ITEMS
      });
    });
  });

  describe("Purchases Reducer", () => {
    it("should return initial state when initialized", () => {
      expect(PurchasesReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle CREATE_PURCHASE and CREATE_PURCHASE_SUCCESS", () => {
      const state = PurchasesReducer(initialState, createPurchase());
      expect(state).toEqual({
        ...initialState,
        creating: true
      });
      expect(PurchasesReducer(state, createPurchaseSuccess())).toEqual({
        ...state,
        creating: false
      });
    });

    it("should handle CREATE_PURCHASE and CREATE_PURCHASE_FAIL", () => {
      const state = PurchasesReducer(initialState, createPurchase());
      const error = "error";
      expect(state).toEqual({
        ...initialState,
        creating: true
      });
      expect(PurchasesReducer(state, createPurchaseError(error))).toEqual({
        ...state,
        creating: false,
        creatingError: error
      });
    });

    it("should handle SIMULATE_PURCHASE and SIMULATE_PURCHASE_SUCCESS", () => {
      const state = PurchasesReducer(initialState, simulatePurchase());
      expect(state).toEqual({
        ...initialState,
        simulating: true
      });
      expect(PurchasesReducer(state, simulatePurchaseSuccess(simulation))).toEqual({
        ...state,
        simulating: false,
        simulation
      });
    });

    it("should handle SIMULATE_PURCHASE and SIMULATE_PURCHASE_FAIL", () => {
      const state = PurchasesReducer(initialState, simulatePurchase());
      const error = "error";
      expect(state).toEqual({
        ...initialState,
        simulating: true
      });
      expect(PurchasesReducer(state, simulatePurchaseError(error))).toEqual({
        ...state,
        simulating: false,
        simulatingError: error
      });
    });

    it("should handle ADD_ITEM", () => {
      const state = PurchasesReducer(initialState, addItem(1));
      expect(state).toEqual({
        ...initialState,
        items: [{ product: 1, quantity: 1 }]
      });
      expect(PurchasesReducer(state, addItem(1))).toEqual({
        ...state,
        items: [{ product: 1, quantity: 2 }]
      });
    });

    it("should handle REMOVE_ITEM", () => {
      let state = PurchasesReducer(
        { ...initialState, items: [{ product: 1, quantity: 2 }] },
        removeItem(1)
      );
      expect(state).toEqual({
        ...initialState,
        items: [{ product: 1, quantity: 1 }]
      });
      state = PurchasesReducer(state, removeItem(1));
      expect(state).toEqual({
        ...state,
        items: []
      });
      expect(PurchasesReducer(state, removeItem(1))).toEqual({
        ...state,
        items: []
      });
    });

    it("should handle CLEAN_ITEMS", () => {
      const state = PurchasesReducer(
        { ...initialState, items: [{ product: 1, quantity: 2 }] },
        cleanItems()
      );
      expect(state).toEqual({
        ...initialState,
        items: []
      });
    });

    it("should handle DELETE_ITEM", () => {
      let state = PurchasesReducer(
        {
          ...initialState,
          items: [{ product: 1, quantity: 2 }, { product: 2, quantity: 2 }]
        },
        deleteItem(1)
      );
      expect(state).toEqual({
        ...initialState,
        items: [{ product: 2, quantity: 2 }]
      });
      state = PurchasesReducer(state, deleteItem(2));
      expect(state).toEqual({
        ...initialState,
        items: []
      });
      state = PurchasesReducer(state, deleteItem(2));
      expect(state).toEqual({
        ...initialState,
        items: []
      });
    });
  });
});
