/* global describe, it, before */

import chai from "chai";
import Connector from "../lib/flajsh";

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of flajsh', () => {
  before(() => {
    lib = new Connector();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      console.log(lib);
      expect(lib.name).to.be.equal("bitfinex.connector");
    });
  });
});
