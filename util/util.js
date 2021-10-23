/**
 * Returns whether an object {} is empty (has no keys and values)
 * @param {Object} obj
 * @returns {boolean}
 */
export const isEmptyObj = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
