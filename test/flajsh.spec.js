/* global describe, it, before */

import chai from "chai";
import {Errr, FactoryConnector} from "../lib/flajsh";

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of flajsh', () => {
  before(() => {
    lib = new FactoryConnector('key', 'secret');
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal("bitfinex.connector");
    });
  });
  describe('when I call a proxied methd', () => {
    it('should fail if it does not proxied/exists', () => {
      var memberName = "someMember";
  
      Promise.resolve()
        .then(() => lib[someMember])
        .catch((err) => {
          expect(err).to.be.a.instanceOf(Errr);
          expect(err.message).to.be.equal(`Property ${someMember} does not exist.`)
        });
    });
  });
});
