/**
 * Checks that incoming data is Error
 * @param error Data which should be tested
 * @returns Returns `true` if incoming data is Error, otherwise `false`
 */
export function isError<T extends Error>(error: unknown): error is Error;
/**
 * Checks that incoming data is an expected type of the error
 * @param error Data which should be tested
 * @param errorType Determines type of the expected error
 * @returns Returns `true` if incoming data is an expected type of the error, otherwise `false`
 */
export function isError<T extends Error>(error: unknown, errorType: new () => T): error is T;
export function isError(error: unknown, errorType: any = Error): boolean {
  return error instanceof errorType;
}

/**
 * Wraps incoming data into the error
 * @param error Incoming error
 * @returns If incoming data is error, returns it as it is, otherwise it creates and returns a new error
 */
export function prepareError<T>(error: unknown): Error {
  if (isError(error)) {
    return error;
  }

  return new Error(`Unknown error. ${error}`);
}