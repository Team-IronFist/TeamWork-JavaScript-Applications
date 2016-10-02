mocha.setup('bdd');

const {expect, assert} = chai;

describe('test', function () {
    it('first-test', function () {
        assert.equal(-1, [1, 2, 3].indexOf(4));
    })
});

mocha.run();