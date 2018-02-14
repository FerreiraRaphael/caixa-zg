import { all } from "redux-saga/effects";

import ProductsSaga from "./Products/modules/products.saga";
import PurchasesSaga from "./Purchases/modules/purchases.saga";

export default function* RootSaga() {
  yield all([ProductsSaga(), PurchasesSaga()]);
}
