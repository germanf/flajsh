/**
 * that's an Errr!!!
 */
export default class Errr extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, Errr);
  }
}
