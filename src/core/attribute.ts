/**
 * Decorator that creates setter/getter for PKCS#11 object attributes
 * @param name Attribute name
 */
export function attribute(name: string, defaultValue?: any) {
  return (target: any, propertyKey: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    descriptor.get = function (this: any) {
      if (defaultValue !== undefined) {
        try {
          return this.get(name);
        } catch {
          return defaultValue;
        }
      }
      return this.get(name);
    };
    descriptor.set = function (this: any, value: any) {
      this.set(name, value);
    };
    Object.defineProperty(target, propertyKey, descriptor);
  };
}