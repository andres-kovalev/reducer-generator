import reduxy from '../reduxy';

const counter = reduxy({
    increment: ({ value }) => ({ value: value + 1 }),
    decrement: ({ value }) => ({ value: value - 1 }),
    reset: () => ({ value: 0 })
}, { value: 0 }, {
    reset: () => dispatch => {
        setTimeout(
            () => {
                dispatch({
                    type: counter.TYPES.reset
                });
            }, 1500
        );
    }
}), { TYPES, actionCreators, reducer } = counter;

export { TYPES, actionCreators, reducer };

export default counter;