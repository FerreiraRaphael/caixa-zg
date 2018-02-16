import { connect } from 'react-redux';

import { findIndexByProp } from '../../../lib/utility/array';
import PurchasesList from './PurchasesList';
import {
  addItem,
  removeItem,
  deleteItem,
  cleanItems,
  createPurchase
} from '../../modules/purchases';

export const mapStateToProps = state => {
  const items = state.purchases.items.map(item => {
    const index = findIndexByProp('product', item.product)(
      state.purchases.simulation.items
    );
    const subtotal = item.price * item.quantity;
    const product = state.purchases.simulation.items[index];
    return product
      ? {
          ...item,
          subtotal,
          discount: product.discount,
          total: subtotal - product.discount
        }
      : { ...item, subtotal, total: subtotal, discount: 0 };
  });
  const subtotal = items.reduce((sum, item) => item.subtotal + sum, 0);
  const discount = state.purchases.simulation.discount || 0;
  const total = subtotal - discount;
  return {
    items,
    subtotal,
    discount,
    total,
    creating: state.purchases.creating,
    simulating: state.purchases.simulating
  };
};

export const mapDispatchToProps = dispatch => ({
  cleanItems: () => {
    dispatch(cleanItems);
  },
  addItem: product => {
    dispatch(addItem(product));
  },
  removeItem: product => {
    dispatch(removeItem(product));
  },
  deleteItem: product => {
    dispatch(deleteItem(product));
  },
  createPurchase: () => {
    dispatch(createPurchase());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesList);
