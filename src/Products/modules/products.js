/**
 * @file Arquivo contém todas as ações que alteram o estado da aplicação,
 * que envolve produtos.
 */

/**
 * Actions types
 */

export const types = {
  FETCH_PRODUCTS: "product/FETCH_PRODUCTS",
  FETCH_PRODUCTS_SUCCESS: "product/FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAIL: "product/FETCH_PRODUCTS_FAIL"
};

/**
 * @namespace Product Estado da aplicação que envolve os Produtos.
 * @property {boolean} fetching Indicador de que está buscando produto.
 * @property {Object} fetchingError Erros ao buscar produto.
 * @property {Object[]} items Lista de produtos.
 */
export const initialState = {
  fetching: false,
  fetchingError: null,
  items: [],
  searchLinks: {}
};

/**
 * É a função pura que trata toda ação que irá alterar o estado da aplicação de produtos.
 * @function ProductReducer
 * @param {object} state Objeto do Estado da atual da aplicação que envolve Produtos.
 * @param {object} action Objeto da ação a ser executada.
 * @return {object} Novo estado da aplicação.
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state,
        fetching: true
      };

    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchingError: null,
        items: action.payload.items,
        searchLinks: action.payload.links
      };

    case types.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        fetching: false,
        fetchingError: action.payload
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

/**
 * Ação indica que produtos estão sendo buscados
 * @function fetchProducts
 * @param {object} [filters] Filtro de busca.
 * @param {string} [query] Query de busca.
 * @param {string} [page] Número da pagina.
 * @param {string} [max_results] Número de resultados por página.
 * @return {Object} Objeto Ação do tipo FETCH_PRODUCTS
 */
export const fetchProducts = (
  { query = "", page = "1", max_results = "10" } = {
    query: "",
    page: "1",
    max_results: "10"
  }
) => ({
  type: types.FETCH_PRODUCTS,
  payload: { query, page, max_results }
});

/**
 * Ação indica que produtos foram buscadas com sucesso e
 * adiciona produtos vindas do server no estado da aplicação
 * @function fetchingSuccess
 * @param {object} payload Action payload.
 * @param {Array} payload.items Lista de produtos buscadas.
 * @param {object} payload.links Objeto com links do request.
 * @return {Object} Objeto Ação do tipo FETCH_PRODUCTS_SUCCESS
 */
export const fetchProductsSuccess = ({ items, links }) => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  payload: { items, links }
});

/**
 * Ação indica que ouve um erro ao buscar os produtos.
 * @function fetchingError
 * @param {object} error Erro da Api
 * @return {Object} Objeto Ação do tipo FETCH_PRODUCTS_FAIL
 */
export const fetchProductsError = error => ({
  type: types.FETCH_PRODUCTS_FAIL,
  payload: error
});
