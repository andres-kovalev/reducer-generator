import { init, SequenceGenerator, TimestampGenerator, generate } from './generate';

const forEachOwnProperty = (obj, func) => {
        for(let field in obj)
            if (obj.hasOwnProperty(field))
                func(obj[field], field);
    }, reduxy = (reducers, initialStore = {}, actionCreators = {}) => {
        const TYPES = {};
        let reducer = store => store;        

        actionCreators = { ...actionCreators };
        
        forEachOwnProperty(reducers, (next, name) => {
            const type = TYPES[name] = generate(),
                prev = reducer;

            if (!actionCreators.hasOwnProperty(name))
                actionCreators[name] = payload => ({ type, payload });

            reducer = (store, action) =>
                    (action && action.type == type)
                        ? next( store, action.payload )
                        : prev( store, action );
        });

        return { TYPES, actionCreators,
            reducer: ( store = initialStore, action ) => reducer( store, action )
        };
    };

export { init, SequenceGenerator, TimestampGenerator, generate/*, bindToDispatch*/ };

export default reduxy;