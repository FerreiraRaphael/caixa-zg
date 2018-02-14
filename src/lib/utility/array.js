/**
 * @file Módulo com funções uteis para arrays.
 */

import propEq from "ramda/src/propEq";
import findIndex from "ramda/src/findIndex";

/**
 * Busca index em array por propriedade de objeto.
 * @function findIndexByProp
 * @param  {string} prop Propriedade do Objeto
 * @param  {any} value Valor da propriedade
 * @return {Function} Função que aceita array.
 */
export function findIndexByProp(prop, value) {
  return findIndex(propEq(prop, value));
}
