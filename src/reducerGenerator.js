const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

const { generate, mapValues, identity } = require('./utils');

const createUniqueConstant = namespace => key => `${ key }-${ uuidv5(key, namespace) }`;
const createScopedConstant = namespace => key => `${ namespace }.${ key }`;

const createActionCreator = type => payload => ({ type, payload });

module.exports = (reducerMap, namespace, additionalActions = []) => {
    const nameGenerator = namespace
        ? createScopedConstant(namespace)
        : createUniqueConstant(uuidv1());

    const TYPES = generate(
        Object.keys(reducerMap).concat(additionalActions),
        nameGenerator
    );
    const ACTIONS = mapValues(TYPES, createActionCreator);

    TYPES.all = nameGenerator('all');
    ACTIONS.all = (...payload) => ({ type: TYPES.all, payload });

    const caseMap = Object.entries(reducerMap).reduce(
        (map, [ key, reducerCase ]) => Object.assign(map, {
            [TYPES[key]]: reducerCase
        }), {}
    );

    return {
        TYPES,
        ACTIONS,
        // eslint-disable-next-line no-use-before-define
        reducer
    };

    function reducer(state, { type, payload }) {
        const reducerCase = caseMap[type]
            // eslint-disable-next-line no-use-before-define
            || (type === TYPES.all && reduceAll)
            || identity;

        return reducerCase(state, payload);
    }

    function reduceAll(state, actions) {
        return actions.reduce(
            (reduced, action) => reducer(reduced, action),
            state
        );
    }
};
