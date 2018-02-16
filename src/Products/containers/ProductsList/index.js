import { connect } from 'react-redux';

import { findIndexByProp } from '../../../lib/utility/array';
import ProductsList from './ProductsList';
import {
  addItem,
  removeItem,
  deleteItem
} from '../../../Purchases/modules/purchases';
import { fetchProducts } from '../../modules/products';

export const mapStateToProps = state => {
  const items = state.products.items.map(item => {
    const index = findIndexByProp('product', item.product)(
      state.purchases.items
    );
    const purchase = state.purchases.items[index];
    return { ...item, quantity: purchase ? purchase.quantity : 0 };
  });
  return {
    items
  };
};

export const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(fetchProducts());
  },
  addItem: product => {
    dispatch(addItem(product));
  },
  removeItem: product => {
    dispatch(removeItem(product));
  },
  deleteItem: product => {
    dispatch(deleteItem(product));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
