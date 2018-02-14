import { POST } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Simulate products promotions by it's id and quantity
 * @function simulatePurchase
 * @param {Array} items array of products.
 * @return {Promise} A request promise.
 */
export function simulatePurchase(items) {
  return POST(`${API_URL}/purchases/simulate`, {items}, {
    token: localStorage.token
  })
    .then(res => res.json())
    .catch(e => e.json());
}

/**
 * Creates a purchase.
 * @function simulatePurchase
 * @param {Array} items Array of products.
 * @return {Promise} A request promise.
 */
export function createPurchase(items) {
    return POST(`${API_URL}/purchases`, {items}, {
      token: localStorage.token
    })
      .then(res => res.json())
      .catch(e => e.json());
  }

