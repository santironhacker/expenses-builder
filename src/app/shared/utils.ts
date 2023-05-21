export const Utils = {
  isIterableObj(obj: object) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    const isIterable = Symbol.iterator in Object(obj);
    // const isIterable = typeof obj[Symbol.iterator] === 'function';
    const isObject = typeof obj === 'object';
    return isIterable && isObject;
  },
  /* flattenObject(obj: object) {
   const flattened = {}

   Object.keys(obj).forEach((key: string | object) => {
     if (typeof obj[key] === 'object' && obj[key] !== null) {
       Object.assign(flattened, flattenObject(obj[key]))
     } else {
       flattened[key] = obj[key]
     }
   })

   return flattened
 }, */
  flattenObject2(obj: object) {
    return Object.assign(
      {},
      ...function _flatten(o: any): any {
        return [].concat(...Object.keys(o)
          .map(k =>
            typeof o[k] === 'object' ?
              _flatten(o[k]) :
              ({ [k]: o[k] })
          )
        );
      }(obj)
    )
  },
  /**
   *
   * @param obj target object
   * @param roots keeps previous parent properties as they will be added as a prefix for each prop.
   * @param sep is just a preference if you want to seperate nested paths other than dot.
   * @returns
   */
  flattenObject3(obj: any, roots: any[] = [], sep = '.'): any {
    return Object
      .keys(obj)
      .reduce((memo: any, prop: string) => Object.assign(
        {},
        memo,
        Object.prototype.toString.call(obj[prop]) === '[object Object]'
          ? this.flattenObject3(obj[prop], roots.concat([prop]))
          : { [roots.concat([prop]).join(sep)]: obj[prop] }
      ), {})
  }
}
