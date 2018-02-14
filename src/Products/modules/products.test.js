import ProductReducer, {
  types,
  initialState,
  fetchProducts,
  fetchProductsError,
  fetchProductsSuccess
} from './products';

describe('Products Redux module', () => {
  describe('Products actions', () => {
    it('should create a FETCH_PRODUCTS action', () => {
      expect(fetchProducts({ query: '' })).toEqual({
        type: types.FETCH_PRODUCTS,
        payload: {
          query: '',
          page: '1',
          max_results: '10'
        }
      });
    });

    it('should create a FETCH_PRODUCTS_SUCCESS action', () => {
      const payload = { items: [{ test: 1 }], links: { next: '' } };
      expect(fetchProductsSuccess(payload)).toEqual({
        type: types.FETCH_PRODUCTS_SUCCESS,
        payload
      });
    });

    it('should create a FETCH_PRODUCTS_FAIL action', () => {
      expect(fetchProductsError([])).toEqual({
        type: types.FETCH_PRODUCTS_FAIL,
        payload: []
      });
    });
  });

  describe('Products reducers', () => {
    it('should handle FETCH_PRODUCTS and FETCH_PRODUCTS_SUCCESS', () => {
      const state = ProductReducer(initialState, fetchProducts({}));
      expect(state).toEqual({
        ...initialState,
        fetching: true
      });
      expect(
        ProductReducer(
          state,
          fetchProductsSuccess({ items: [1, 2, 3], links: { next: '' } })
        )
      ).toEqual({
        ...state,
        fetching: false,
        fetchingError: null,
        items: [1, 2, 3],
        searchLinks: { next: '' }
      });
    });

    it('should handle FETCH_PRODUCTS and FETCH_PRODUCTS_FAIL', () => {
      const state = ProductReducer(initialState, fetchProducts({}));
      expect(state).toEqual({
        ...initialState,
        fetching: true
      });
      expect(ProductReducer(state, fetchProductsError('error'))).toEqual({
        ...state,
        fetching: false,
        fetchingError: 'error'
      });
    });
  });
});
