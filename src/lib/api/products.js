import { GET } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Fecth products by name and sku.
 * @function fetchProducts
 * @param {object} options Fetch product options.
 * @param {string} options.query Search query.
 * @param {string} [options.page] Request page.
 * @param {string} [options.max_results] Request max results.
 * @return {Promise} A request promise.
 */
export function fetchProducts({
  query = "",
  page = "1",
  max_results = "10"
}) {
  return GET(`${API_URL}/products`, {
    params: {
      ...(query ? { where: `"name"=="${query}" or "sku"=="${query}"` } : {}),
      page,
      max_results
    },
    token: localStorage.token
  });
}
