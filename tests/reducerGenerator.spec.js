const generateReducer = require('../src/reducerGenerator');

const noop = () => {};

describe('reducerGenerator', () => {
    const cases = {
        foo: noop,
        bar: noop,
        baz: noop
    };

    it('should generate unique action type for each case', () => {
        const { TYPES } = generateReducer(cases);

        const types = [];
        Object.keys(cases).forEach(
            (caseName) => {
                const caseId = TYPES[caseName];

                /* eslint-disable-next-line no-unused-expressions */
                expect(caseId, `Action type for case '${ caseName }' is not defined`).to.be.not.undefined;
                expect(types, `Action type for case '${ caseName }' is not unique`).to.not.includes(caseId);

                types.push(caseId);
            }
        );
    });

    it('should generate unique action type for each additional action', () => {
        const actions = [ 'key1', 'key2', 'key3' ];
        const { TYPES } = generateReducer(cases, actions);

        const types = [];
        actions.forEach(
            (caseName) => {
                const caseId = TYPES[caseName];

                /* eslint-disable-next-line no-unused-expressions */
                expect(caseId, `Action type for case '${ caseName }' is not defined`).to.be.not.undefined;
                expect(types, `Action type for case '${ caseName }' is not unique`).to.not.includes(caseId);

                types.push(caseId);
            }
        );
    });

    it('should generate action creator for each case', () => {
        const { ACTIONS } = generateReducer(cases);

        Object.keys(cases).forEach(
            (caseName) => {
                const actionCreator = ACTIONS[caseName];

                expect(actionCreator).to.be.a('function');
            }
        );
    });

    describe('#actionCreator', () => {
        it('should return action with specific type', () => {
            const { TYPES, ACTIONS } = generateReducer(cases);

            Object.keys(cases).forEach(
                (caseName) => {
                    const actionCreator = ACTIONS[caseName];
                    const type = TYPES[caseName];
                    const payload = {};

                    expect(actionCreator(payload)).to.be.deep.equal({ type, payload });
                }
            );
        });

        it('should return action which specific invokes reducer case', () => {
            const spyCases = {
                foo: sinon.spy(),
                bar: sinon.spy()
            };

            const { ACTIONS, reducer } = generateReducer(spyCases);

            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.foo).have.not.been.called;
            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.bar).have.not.been.called;

            reducer({}, ACTIONS.foo());

            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.foo).to.have.been.calledOnce;
            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.bar).have.not.been.called;

            reducer({}, ACTIONS.bar());

            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.foo).to.have.been.calledOnce;
            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.bar).to.have.been.calledOnce;

            reducer({}, {});

            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.foo).to.have.been.calledOnce;
            /* eslint-disable-next-line no-unused-expressions */
            expect(spyCases.bar).to.have.been.calledOnce;
        });
    });

    it('should generate reducer function', () => {
        const { reducer } = generateReducer(cases);

        expect(reducer).to.be.a('function');
    });
});