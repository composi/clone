/**
 * Create deep clone of Object, Array, Set or Map.
 *
 * @param {Object.<string, any>[]} objects If one object is provide, it will be cloned. If more than one object are provided, they will be merged and returned as a new object. This returns a deep clone of the original.
 * @return {Object} Object
 */
export function clone(...objects: {
    [x: string]: any;
}[]): any;
