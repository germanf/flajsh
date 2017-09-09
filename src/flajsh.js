/**
 * (these are really) Import(ant)s
 */
import Errr from "errr";
import Actions from "bitfinexActionsV1";
import BitfinexConnector from "BitfinexConnector";

/**
 * FactoryConnector
 */
export default class FactoryConnector {
  constructor(key, secret, nonceGenerator = null) {
    const connector = new BitfinexConnector(key, secret, nonceGenerator);
    const proxied = FactoryConnector.proxyObj(connector);
    return proxied;
  }
  
  /**
   * Proxy to avoid write 100k lines and have a live #rememberItAndDontDiscuss
   * @param obj
   * @returns {Proxy}
   */
  static proxyObj(obj) {
    let handler = {
      get (target, key) {
        console.debug("access to prop" + key);
  
        if(key in target) {
          return Reflect.get(target, key);
        } else if(key in Actions.public) {
          return Reflect.get(target, key);
        } else if(key in Actions.privates) {
          return Reflect.get(target, key);
        } else {
          throw new Errr(`Property ${key} does not exist.`);
        }
      }
    };
    return new Proxy(obj, handler);
  }
}




