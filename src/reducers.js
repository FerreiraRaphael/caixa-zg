import { combineReducers } from "redux";

import products from './Products/modules/products';
import purchases from './Purchases/modules/purchases';
import app from './Shared/modules/app';

export default combineReducers({
    products,
    purchases,
    app
})
