import rp from "request-promise";
import Errr from "errr";

export default class BitfinexConnector {
  /**
   * BitfinexConnector
   * @param key
   * @param secret
   * @param nonceGenerator
   */
  constructor(key, secret, nonceGenerator) {
    this.name = "bitfinex.connector";
    this.version = "v1";
    this.url = `https://api.bitfinex.com/${this.version}/`;
    this.key = key;
    this.secret = secret;
    this.nonce = new Date().getTime();
    this._nonce = typeof nonceGenerator === "function" ? nonceGenerator : function() {
      return ++this.nonce;
    };
  }
  
  /**
   * getHeaderCredentials
   * @param path
   * @param params
   * @returns {{X-BFX-APIKEY: *, X-BFX-PAYLOAD: {request: *, nonce}, X-BFX-SIGNATURE}}
   */
  getHeaderCredentials(path, params) {
    if(!this.key || !this.secret) {
      throw new Errr("missing api key or secret");
    }
    const nonce = JSON.stringify(this._nonce());
    let payload = {
      request: path,
      nonce
    };
    for(let key in params) {
      payload[key] = params[key];
    }
    payload = new Buffer(JSON.stringify(payload)).toString("base64");
    const signature = crypto.createHmac("sha384", this.secret).update(payload).digest("hex");
    const headers = {
      "X-BFX-APIKEY": this.key,
      "X-BFX-PAYLOAD": payload,
      "X-BFX-SIGNATURE": signature
    };
    
    return headers;
  }
  
  /**
   * authRequest
   * @param path
   * @param params
   * @returns {Promise.<TResult>}
   */
  authRequest(path, params) {
    const options = {
      method: "POST",
      uri: this.url + path,
      headers: this.getHeaderCredentials(path, params),
      json: true // Automatically stringifies the body to JSON
    };
    
    return rp(options)
      .then(this.requestCallback)
      .catch(console.error);
  }
  
  /**
   * request
   * @param path
   * @returns {Promise.<TResult>}
   */
  request(path) {
    const options = {
      method: "GET",
      uri: this.url + path,
      json: true // Automatically stringifies the body to JSON
    };
    return rp(options)
      .then(this.requestCallback)
      .catch(console.error);
  }
  
  /**
   * requestCallback
   * @param err
   * @param res
   * @param body
   * @returns {*}
   */
  requestCallback(err, res, body) {
    let result;
    
    try {
      if(err || ((res.statusCode !== 200) && (res.statusCode !== 400))) {
        err = err ? err : res.statusCode;
      } else {
        result = JSON.parse(body);
        if(result.message) {
          err = result.message;
        }
      }
    } catch(error) {
      err = body.toString();
    }
    
    if(err) {
      throw new Errr(err);
    } else {
      return result;
    }
  }
}
