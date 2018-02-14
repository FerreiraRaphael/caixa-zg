import {
  initSagaTester,
  mockPromiseReject,
  mockPromiseResolve
} from "../../lib/test/helpers";
import ProductsReducer, {
  types,
  initialState,
  fetchProducts
} from "./products";
import ProductsSaga from "./products.saga";
import Api from "../../lib/api";

describe("Products sagas", () => {
  describe("fetchProducts", () => {
    let sagaTester;
    beforeEach(() => {
      Api.Products.fetchProducts = jest.fn();
      sagaTester = initSagaTester(initialState, ProductsReducer, ProductsSaga);
    });
    it("should call the api and call fetchProductsSuccess", async () => {
      const mockedResponse = {
        data: {
          _items: ["value"],
          _links: { next: "" }
        }
      };
      Api.Products.fetchProducts.mockReturnValue(
        mockPromiseResolve(mockedResponse)
      );
      sagaTester.dispatch(
        fetchProducts({
          name: "name",
          sku: "",
          page: "2",
          max_results: "10"
        })
      );
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        fetching: true
      });
      await sagaTester.waitFor(types.FETCH_PRODUCTS_SUCCESS);
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        fetching: false,
        items: mockedResponse.data._items,
        searchLinks: mockedResponse.data._links
      });
    });

    it("should call the api and call fetchProductError", async () => {
      const error = "error";
      Api.Products.fetchProducts.mockReturnValue(mockPromiseReject(error));
      sagaTester.dispatch(
        fetchProducts({
          name: "name",
          sku: "",
          page: "2",
          max_results: "10"
        })
      );
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        fetching: true
      });
      await sagaTester.waitFor(types.FETCH_PRODUCTS_FAIL);
      expect(sagaTester.getState()).toEqual({
        ...initialState,
        fetching: false,
        fetchingError: error
      });
    });
  });
});
