import React from 'react';
import SearchProductInput from '../containers/SearchProductInput';
import ProductsList from '../containers/ProductsList';

const ProductsScreen = () => (
  <div style={{ height: '100%' }}>
    <SearchProductInput />
    <ProductsList />
  </div>
);

export default ProductsScreen;
