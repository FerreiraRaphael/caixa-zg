import React from 'react';
import { shallow, mount } from 'enzyme';

import ProductsList from '../ProductsList';
import { mapStateToProps } from '../index';

describe('ProductsList Component', () => {
  const setup = (propsOverride = {}, mounting = false) => {
    const props = {
      items: [],
      fetchProducts: jest.fn(),
      ...propsOverride
    };

    const mountFunction = mounting ? mount : shallow;

    const wrapper = mountFunction(<ProductsList {...props} />);

    return {
      props: wrapper.props(),
      wrapper
    };
  };

  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchProducts on component mount', () => {
    const { props } = setup({ items: [] }, true);
    expect(props.fetchProducts).toBeCalled();
  });

  describe('mapStateToProps', () => {
    it('should return correct props', () => {
      const state = {
        purchases: {
          items: [
            {
              name: 'Amaciante',
              sku: 'AMA',
              quantity: 10,
              product: '5a69bbbe085eb50006b7515b',
              price: 12,
              subtotal: 120,
              discount: 0,
              total: 120
            },
            {
              name: 'Sabão',
              sku: 'SAB',
              quantity: 6,
              product: '5a69bbd2085eb50006b75162',
              price: 0.8,
              subtotal: 4.8,
              discount: 0,
              total: 4.8
            }
          ]
        },
        products: {
          items: [
            {
              name: 'Sabão',
              sku: 'SAB',
              product: '5a69bbd2085eb50006b75162',
              price: 0.8
            },
            {
              name: 'Produto',
              sku: 'PRO',
              product: '1',
              price: 0.8
            },
            {
              name: 'Amaciante',
              sku: 'AMA',
              product: '5a69bbbe085eb50006b7515b',
              price: 12
            }
          ]
        }
      };
      const props = mapStateToProps(state);
      expect(props).toEqual({
        items: [
          {
            name: 'Sabão',
            sku: 'SAB',
            quantity: 6,
            product: '5a69bbd2085eb50006b75162',
            price: 0.8
          },
          {
            name: 'Produto',
            sku: 'PRO',
            quantity: 0,
            product: '1',
            price: 0.8
          },
          {
            name: 'Amaciante',
            sku: 'AMA',
            quantity: 10,
            product: '5a69bbbe085eb50006b7515b',
            price: 12
          }
        ]
      });
    });
  });
});
