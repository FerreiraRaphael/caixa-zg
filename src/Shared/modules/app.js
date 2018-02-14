/**
 * @file Arquivo contém todas as ações que alteram o estado da aplicação.
 */

import update from "ramda/src/update";
import remove from "ramda/src/remove";

import { findIndexByProp } from "../../lib/utility/array";

/**
 * Helper Functions
 */

/**
 * Actions types
 */

export const types = {
  FOCUS_SEARCH_INPUT: "app/FOCUS_SEARCH_INPUT",
};

/**
 * @namespace App Estado da aplicação.
 * @property {boolean} searchInputFocus Focus na input de busca.
 */
export const initialState = {
  searchInputFocus: false
};

/**
 * É a função pura que trata toda ação que irá alterar o estado da aplicação.
 * @function purchaseReducer
 * @param {object} state Objeto do Estado da atual da aplicação.
 * @param {object} action Objeto da ação a ser executada.
 * @return {object} Novo estado da aplicação.
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FOCUS_SEARCH_INPUT:
      return {
        ...state,
        searchInputFocus: action.payload
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

/**
 * Ação de foco na input de busca.
 * @function focusSearchInput
 * @param {boolean} toggle Toggle focus.
 * @return {Object} Objeto Ação do tipo FOCUS_SEARCH_INPUT
 */
export const focusSearchInput = (toggle) => ({
  type: types.FOCUS_SEARCH_INPUT,
  payload: toggle
});

