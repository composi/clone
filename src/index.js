/**
 * Create deep clone of Object, Array, Set or Map.
 *
 * @param {Object.<string, any>[]} objects If one object is provide, it will be cloned. If more than one object are provided, they will be merged and returned as a new object. This returns a deep clone of the original.
 * @return {Object} Object
 */

export function clone(...objects) {
  const FIRST_ARGUMENT = 0
  const ZERO = 0
  const SECOND_ARGUMENT = 1
  // Add empty array or object to arguments to ensure unique clone:
  Array.isArray(objects[FIRST_ARGUMENT])
    && objects.unshift([])
    || typeof objects[FIRST_ARGUMENT] === 'string'
    && objects.unshift(/** @type {*} */(''))
    || typeof objects[FIRST_ARGUMENT] === 'number'
    && objects.unshift(/** @type {*} */(ZERO))
    || objects[FIRST_ARGUMENT] instanceof Set
    && objects.unshift(new Set())
    || objects[FIRST_ARGUMENT] instanceof Map
    && objects.unshift(new Map())
    || objects[FIRST_ARGUMENT] instanceof WeakSet
    && objects.unshift(objects[FIRST_ARGUMENT])
    || objects[FIRST_ARGUMENT] instanceof WeakMap
    && objects.unshift(objects[FIRST_ARGUMENT])
    || objects.unshift({})

  /**
   * Create a clone of an object or array.
   * @param {*} object The object to clone.
   * @return {Object<string, any>} Object<string, any>
   */

  const createClone = (object, hash = new WeakMap()) =>
    Object(object) !== object
    // Deal with primitive types:
    && object
    || hash.has(object)
    // Deal with cyclic references:
    && hash.get(object)
    // Test for other objects:
    || (() => {
      const result = object instanceof Date
        && new Date(object)
        || object instanceof RegExp
        && new RegExp(object.source, object.flags)
        || object instanceof Set
        && new Set([...object])
        || object instanceof Map
        && new Map([...object])
        || object.constructor
        && new object.constructor()
        || Object.create(null)

      hash.set(object, result)

      return object instanceof Set
        && new Set([...object])
        || object instanceof Map
        && new Map([...object])
        || object instanceof WeakSet
        && object
        || object instanceof WeakMap
        && object
        || Object.assign(
          result,
          ...Object.keys(object).map(key => ({
            [key]: createClone(object[key], hash)
          })
        )
      )
    }
  )()

  // Return cloned copy of merged objects:
  return Array.isArray(objects[FIRST_ARGUMENT])
    && objects.reduce((a, b) => Array.prototype.concat(a, createClone(b)))
    || objects[FIRST_ARGUMENT] instanceof Set
    && objects.reduce((a, b) => new Set([
      .../** @type {Set} */(a),
      .../** @type {Set} */(createClone(b))
    ]))
    || objects[FIRST_ARGUMENT] instanceof Map
    && objects.reduce((a, b) => new Map([
      .../** @type {Map} */(a),
      .../** @type {Map} */(createClone(b))
    ]))
    || objects[FIRST_ARGUMENT] instanceof WeakSet
    && objects.reduce(a => a)
    || objects[FIRST_ARGUMENT] instanceof WeakMap
    && objects.reduce(a => a)
    || typeof objects[FIRST_ARGUMENT] === 'object'
    && objects.reduce((a, b) => Object.assign(a, createClone(b)))
    || typeof objects[FIRST_ARGUMENT] === 'string'
    && objects[SECOND_ARGUMENT]
    || typeof objects[FIRST_ARGUMENT] === 'number'
    && objects[SECOND_ARGUMENT]
}
