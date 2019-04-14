const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');

const { generate, mapValues, identity } = require('./utils');

const createUniqueConstant = namespace => key => `${ key }-${ uuidv5(key, namespace) }`;

const createActionCreator = type => payload => ({ type, payload });

module.exports = (reducerMap, additionalActions = []) => {
    const NAMESPACE = uuidv1();

    const TYPES = generate(
        Object.keys(reducerMap).concat(additionalActions),
        createUniqueConstant(NAMESPACE)
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
