/**
 * @file Arquivo contém todas as ações que alteram o estado da aplicação,
 * que envolve compras.
 */

import update from 'ramda/src/update';
import remove from 'ramda/src/remove';

import { findIndexByProp } from '../../lib/utility/array';

/**
 * Helper Functions
 */

/**
 * Adiciona quantidade do item
 * @function addItemQuantity
 * @param  {Object} item Item do estado da aplicação de compras.
 * @param  {number} [quantity] Quantidade a ser adicionada.
 * @return {Object} Item com quantidade alterada.
 */
function addItemQuantity(item, quantity = 1) {
  return {
    ...item,
    quantity: item.quantity + quantity
  };
}

/**
 * Subtrai quantidade do item
 * @function subItemQuantity
 * @param  {Object} item Item do estado da aplicação de compras.
 * @param  {number} [qnt] Quantidade a ser subtraida.
 * @return {Object} Item com quantidade alterada.
 */
function subItemQuantity(item, qnt = 1) {
  const quantity = item.quantity + qnt * -1;
  return quantity > 0
    ? {
        ...item,
        quantity
      }
    : null;
}

/**
 * Atualiza item adicionando sua quantidade,
 * ou cria novo item se elemento não existir.
 * @param {string} product Id do produto.
 * @param {Array} items Array de produtos.
 * @return {Array} Nova coleção de produtos.
 */
function addOrCreateItemById(product, items) {
  const index = findIndexByProp('product', product.product)(items);
  const element = items[index];
  return element
    ? update(index)(addItemQuantity(element))(items)
    : [...items, { ...product, quantity: 1 }];
}

/**
 * Atualiza item subtraindo sua quantidade,
 * ou remove se quantidade for iqual ou menor que zero.
 * @param {string} product Id do produto.
 * @param {Array} items Array de produtos.
 * @return {Array} Nova coleção de produtos.
 */
function subOrDeleteItemById(product, items) {
  const index = findIndexByProp('product', product.product)(items);
  const item = items[index];

  if (item === undefined) {
    return items;
  }
  const updatedItem = subItemQuantity(item);
  return updatedItem
    ? update(index)(updatedItem)(items)
    : remove(index)(1)(items);
}

/**
 * Remove item da lista, atravês do Id passado.
 * @param {string} product Id do produto.
 * @param {Array} items Array de produtos.
 * @return {Array} Nova coleção de produtos.
 */
function deleteItemById(product, items) {
  const index = findIndexByProp('product', product.product)(items);
  return index !== -1 ? remove(index)(1)(items) : items;
}

/**
 * Actions types
 */

export const types = {
  ADD_PRICE: 'purchase/ADD_PRICE',
  ADD_ITEM: 'purchase/ADD_ITEM',
  REMOVE_ITEM: 'purchase/REMOVE_ITEM',
  CLEAN_ITEMS: 'purchase/CLEAN_ITEM',
  DELETE_ITEM: 'purchase/DELETE_ITEM',
  CREATE_PURCHASE: 'purchase/CREATE_PURCHASE',
  CREATE_PURCHASE_SUCCESS: 'purchase/CREATE_PURCHASE_SUCCESS',
  CREATE_PURCHASE_FAIL: 'purchase/CREATE_PURCHASE_FAIL',
  SIMULATE_PURCHASE: 'purchase/SIMULATE_PURCHASE',
  SIMULATE_PURCHASE_SUCCESS: 'purchase/SIMULATE_PURCHASE_SUCCESS',
  SIMULATE_PURCHASE_FAIL: 'purchase/SIMULATE_PURCHASE_FAIL'
};

/**
 * @namespace Purchase Estado da aplicação que envolve as compras.
 * @property {boolean} creating Indicador de que está criando compra.
 * @property {Object} creatingError Erros ao criar compra.
 * @property {Object[]} items Lista de compras.
 */
export const initialState = {
  simulating: false,
  simulatingError: null,
  creating: false,
  creatingError: null,
  simulation: { items: [] },
  items: []
};

/**
 * É a função pura que trata toda ação que irá alterar o estado da aplicação de compras.
 * @function purchaseReducer
 * @param {object} state Objeto do Estado da atual da aplicação que envolve compras.
 * @param {object} action Objeto da ação a ser executada.
 * @return {object} Novo estado da aplicação.
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_PURCHASE:
      return {
        ...state,
        creating: true
      };

    case types.CREATE_PURCHASE_SUCCESS:
      return {
        ...state,
        creating: false,
        creatingError: null
      };

    case types.CREATE_PURCHASE_FAIL:
      return {
        ...state,
        creating: false,
        creatingError: action.payload
      };

    case types.SIMULATE_PURCHASE:
      return {
        ...state,
        simulating: true
      };

    case types.SIMULATE_PURCHASE_SUCCESS:
      return {
        ...state,
        simulating: false,
        simulation: action.payload,
        simulatingError: null
      };

    case types.SIMULATE_PURCHASE_FAIL:
      return {
        ...state,
        simulating: false,
        simulatingError: action.payload
      };

    case types.ADD_ITEM:
      return {
        ...state,
        items: addOrCreateItemById(action.payload, state.items)
      };

    case types.REMOVE_ITEM: {
      return {
        ...state,
        items: subOrDeleteItemById(action.payload, state.items)
      };
    }

    case types.CLEAN_ITEMS:
      return {
        ...state,
        items: [],
        simulation: initialState.simulation
      };

    case types.DELETE_ITEM:
      return {
        ...state,
        items: deleteItemById(action.payload, state.items)
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

/**
 * Ação indica que compra está sendo criada.
 * @function createPurchase
 * @return {Object} Objeto Ação do tipo CREATE_PURCHASE
 */
export const createPurchase = () => ({
  type: types.CREATE_PURCHASE
});

/**
 * Ação indica que compra foi criada com sucesso
 * @function createPurchaseSuccess
 * @return {Object} Objeto Ação do tipo CREATE_PURCHASE_SUCCESS
 */
export const createPurchaseSuccess = () => ({
  type: types.CREATE_PURCHASE_SUCCESS
});

/**
 * Ação indica que houve um erro ao criar a compra.
 * @function createPurchaseError
 * @param {object} error Erro da Api
 * @return {Object} Objeto Ação do tipo CREATE_PURCHASE_FAIL
 */
export const createPurchaseError = error => ({
  type: types.CREATE_PURCHASE_FAIL,
  payload: error
});

/**
 * Ação adiciona um item ao estado.
 * @function addItem
 * @param {object} product Objeto do produto.
 * @return {Object} Objeto Ação do tipo ADD_ITEM
 */
export const addItem = product => ({
  type: types.ADD_ITEM,
  payload: product
});

/**
 * Ação remove um item do estado.
 * @function removeItem
 * @param {object} product Objeto do produto.
 * @return {Object} Objeto Ação do tipo REMOVE_ITEM
 */
export const removeItem = product => ({
  type: types.REMOVE_ITEM,
  payload: product
});

/**
 * Ação deleta um item do estado.
 * @function deleteItem
 * @param {object} product Objeto do produto.
 * @return {Object} Objeto Ação do tipo DELETE_ITEM
 */
export const deleteItem = product => ({
  type: types.DELETE_ITEM,
  payload: product
});

/**
 * Ação deleta todos os items do estado.
 * @function cleanItems
 * @return {Object} Objeto Ação do tipo CLEAN_ITEMS
 */
export const cleanItems = () => ({
  type: types.CLEAN_ITEMS
});

/**
 * Inicia Simulação da compra para saber preços de promoções.
 * @function simulatePurchase
 * @param {Array} items Array de produtos no carrinho.
 * @return {Object} Objeto Ação do tipo SIMULATE_PURCHASE
 */
export const simulatePurchase = items => ({
  type: types.SIMULATE_PURCHASE,
  payload: items
});

/**
 * Sucesso da Simulação da compra para saber preços de promoções.
 * @function simulatePurchaseSuccess
 * @param {Array} simulation Objeto da simulação da compra.
 * @return {Object} Objeto Ação do tipo SIMULATE_PURCHASE_SUCCESS
 */
export const simulatePurchaseSuccess = simulation => ({
  type: types.SIMULATE_PURCHASE_SUCCESS,
  payload: simulation
});

/**
 * Erro na Simulação da compra para saber preços de promoções.
 * @function simulatePurchaseError
 * @param {Array} simulation Objeto da simulação da compra.
 * @return {Object} Objeto Ação do tipo SIMULATE_PURCHASE_FAIL
 */
export const simulatePurchaseError = error => ({
  type: types.SIMULATE_PURCHASE_FAIL,
  payload: error
});
