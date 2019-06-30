const {
    identity,
    generate,
    mapValues
} = require('../src/utils');

describe('utils', () => {
    describe('identity', () => {
        [ 0, 'string', true, null, undefined, {}, [] ].forEach(
            value => it(`should return provided value for ${ typeof value }`, () => {
                expect(identity(value)).to.be.equal(value);
            })
        );
    });

    describe('generate', () => {
        it('should return object with provided keys and generated values', () => {
            const expected = {
                key1: 'value-1',
                key2: 'value-2',
                key3: 'value-3'
            };
            const keys = Object.keys(expected);
            const generator = key => expected[key];

            expect(generate(keys, generator)).to.be.deep.equal(expected);
        });
    });

    describe('mapValues', () => {
        it('should return new object with mapped values', () => {
            const source = {
                key1: 'value-1',
                key2: 'value-2'
            };
            const map = value => `${ value }-mapped`;

            expect(mapValues(source, map)).to.be.deep.equal({
                key1: 'value-1-mapped',
                key2: 'value-2-mapped'
            });
        });
    });
});
