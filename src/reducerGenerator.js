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

    return {
        TYPES,
        ACTIONS,
        reducer: Object.entries(reducerMap)
            .reduceRight(
                (combined, [ key, reducer ]) => {
                    const type = TYPES[key];

                    return (state, action) => (action.type === type
                        ? reducer(state, action.payload)
                        : combined(state, action));
                }, identity
            )
    };
};
