/**
 * @file Arquivo contém todas as ações assíncronas que alteram o estado da aplicação,
 * que envolve compras.
 */

import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import {
  createPurchaseSuccess,
  createPurchaseError,
  simulatePurchase,
  simulatePurchaseSuccess,
  simulatePurchaseError,
  types,
  cleanItems
} from './purchases';

import Api from '../../lib/api';

/**
 * Listener para ações do tipo CREATE_PURCHASE.
 * Faz chamada na api para criar compra e dispara
 * ação de sucesso ou erro.
 * @function * createPurchase
 * @param  {type} action Ação do tipo CREATE_PURCHASE
 */
export function* createPurchase() {
  try {
    const purchaseItems = yield select(state =>
      state.purchases.items.map(item => ({
        quantity: item.quantity,
        product: item.product
      }))
    );
    const products = yield call(Api.Purchases.createPurchase, purchaseItems);
    yield put(cleanItems());
    yield put(createPurchaseSuccess(products));
  } catch (e) {
    yield put(createPurchaseError(e));
  }
}

/**
 * Listener para ações do tipo SIMULATE_PURCHASE.
 * Faz chamada na api para simular compra e dispara
 * ação de sucesso ou erro.
 * @function * simulatePurchaseAsync
 * @param  {type} action Ação do tipo SIMULATE_PURCHASE
 */
export function* simulatePurchaseAsync() {
  try {
    yield put(simulatePurchase());
    const purchase = yield select(state =>
      state.purchases.items.map(item => ({
        quantity: item.quantity,
        product: item.product
      }))
    );
    const { data } = yield call(Api.Purchases.simulatePurchase, purchase);
    yield put(simulatePurchaseSuccess(data));
  } catch (e) {
    yield put(simulatePurchaseError(e));
  }
}

/**
 * Watcher das ações de compra.
 * @function * PurchasesSaga
 */
function* PurchasesSaga() {
  yield takeEvery(types.CREATE_PURCHASE, createPurchase);
  yield takeLatest(types.ADD_ITEM, simulatePurchaseAsync);
  yield takeLatest(types.REMOVE_ITEM, simulatePurchaseAsync);
  yield takeLatest(types.DELETE_ITEM, simulatePurchaseAsync);
}

export default PurchasesSaga;
