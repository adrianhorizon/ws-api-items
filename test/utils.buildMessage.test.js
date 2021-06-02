const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe.only('utils - buildMessage', () => {
  describe('when receives na entity and an action', () => {
    it('should return the respective message', () => {
      const result = buildMessage('product', 'create');
      const expect = 'product created';
      assert.strictEqual(result, expect);
    });
  });

  describe('when receives an entity and an action and is a list', () => {
    it('should return the respective message with the entity in plural', () => {
      const result = buildMessage('product', 'list');
      const expected = 'products listed';
      assert.strictEqual(result, expected);
    });
  });
});
