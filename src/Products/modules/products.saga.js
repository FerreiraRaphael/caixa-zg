/**
 * @file Arquivo contém todas as ações assíncronas que alteram o estado da aplicação,
 * que envolve produtos.
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchProductsSuccess, fetchProductsError, types } from './products';

import Api from '../../lib/api';

/**
 * Listener para ações do tipo FETCH_PRODUCTS.
 * Faz chamada na api para buscar produtos e dispara
 * ação de sucesso ou erro.
 * @function * fetchProducts
 * @param  {type} action Ação do tipo FETCH_PRODUCTS
 */
export function* fetchProducts(action) {
  try {
    const { data } = yield call(Api.Products.fetchProducts, action.payload);
    const { _items, _links } = data;
    const items = _items.map(item => ({ ...item, product: item._id }));
    yield put(fetchProductsSuccess({ items, links: _links }));
  } catch (e) {
    yield put(fetchProductsError(e));
  }
}

/**
 * Watcher das ações de produtos.
 * @function * ProductsSaga
 */
function* ProductsSaga() {
  yield takeLatest(types.FETCH_PRODUCTS, fetchProducts);
}

export default ProductsSaga;
