/* global describe, it, before */

import chai from "chai";
import Connector from "../lib/flajsh";

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of flajsh', () => {
  before(() => {
    lib = new Connector('key', 'secret');
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal("bitfinex.connector");
    });
  });
  describe('when I call a proxied methd', () => {
    it('should fail if it does not proxied/exists', () => {
      try {
        lib.someMethod();
        var errr = new Errr('asdf');
        console.log(errr);
      } catch(err) {
        expect(err).to.throw(new Errr('Property someMethod does not exist.'));
      }
    });
  });
});
