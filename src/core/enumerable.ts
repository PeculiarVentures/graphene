/**
 * Decorator that sets the enumerable property of a class field to false.
 * @param value true|false
 */
export function enumerable(value: boolean) {
  return (target: any, propertyKey: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    if (descriptor.enumerable !== value) {
      descriptor.enumerable = value;
      descriptor.writable = true;
      Object.defineProperty(target, propertyKey, descriptor);
    }
  };
}