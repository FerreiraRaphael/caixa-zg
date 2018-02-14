/**
 * @file Arquivo contém todas as ações assíncronas que alteram o estado da aplicação,
 * que envolve compras.
 */

import { call, put, takeLatest, takeEvery } from "redux-saga/effects";

import {
  createPurchaseSuccess,
  createPurchaseError,
  simulatePurchaseSuccess,
  simulatePurchaseError,
  types
} from "./purchases";

import Api from "../../lib/api";

/**
 * Listener para ações do tipo CREATE_PURCHASE.
 * Faz chamada na api para criar compra e dispara
 * ação de sucesso ou erro.
 * @function * createPurchase
 * @param  {type} action Ação do tipo CREATE_PURCHASE
 */
export function* createPurchase(action) {
  try {
    const products = yield call(Api.Purchases.createPurchase, action.payload);
    yield put(createPurchaseSuccess(products));
  } catch (e) {
    yield put(createPurchaseError(e));
  }
}

/**
 * Listener para ações do tipo SIMULATE_PURCHASE.
 * Faz chamada na api para simular compra e dispara
 * ação de sucesso ou erro.
 * @function * simulatePurchase
 * @param  {type} action Ação do tipo SIMULATE_PURCHASE
 */
export function* simulatePurchase(action) {
    try {
      const products = yield call(Api.Purchases.simulatePurchase, action.payload);
      yield put(simulatePurchaseSuccess(products));
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
  yield takeLatest(types.SIMULATE_PURCHASE, simulatePurchase)
}

export default PurchasesSaga;
