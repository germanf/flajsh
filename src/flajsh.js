/**
 * Imports
 */
import Errr from "errr";
import Actions from "bitfinexActionsV1";
import BitfinexConnector from "BitfinexConnector";

/**
 * Class
 */
export default class FactoryConnector {
  constructor(key, secret, nonceGenerator = null) {
    const connector = new BitfinexConnector(key, secret, nonceGenerator);
    const proxied = FactoryConnector.proxyObj(connector);
    return proxied;
  }
  
  static proxyObj(obj) {
    let handler = {
      get (target, key) {
        console.debug("access to prop" + key);
        
        if(key in Actions.public) {
          return Reflect.get(target, key);
        } else if(key in Actions.privates) {
          return Reflect.get(target, key);
        } else if(key in target) {
          return Reflect.get(target, key);
        } else {
          throw new Errr(`Property ${key} does not exist.`);
        }
      }
    };
    return new Proxy(obj, handler);
  }
}




