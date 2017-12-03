# reduxy

### classic approach:

```javascript
// consts.js

const COUNTER_INCREMENT = 'COUNTER_INCREMENT',
    COUNTER_DECREMENT = 'COUNTER_DECREMENT',
    COUNTER_RESET = 'COUNTER_RESET';

export { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_RESET };

// actions.js

import { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_RESET } from './consts.js';

const increment = amount => ({
    type: COUNTER_INCREMENT,
    payload: amount
}), decrement = amount => ({
    type: COUNTER_DECREMENT,
    payload: amount
}), reset = delay => dispatch => ({
    setTimeout(() => {
        dispatch({
            type: COUNTER_RESET
        });
    }, delay);
});

export { increment, decrement, reset };

// reducer.js

import { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_RESET } from './consts.js';

const initial = {
    value: 0
};

export default (state = initial, action) => {
    switch(action.type) {
        case COUNTER_INCREMENT:
            return { value: state.value + action.payload };
        case COUNTER_DECREMENT:
            return { value: state.value - action.payload };
        case COUNTER_RESET:
            return { value: 0 };
        default:
            return state;
    }
}

// index.js

import * as actions from './actions.js';
import reducer from './reducer.js';
...
```

### reduxy approach:

```javascript
// counter.js

import reduxy from 'reduxy';

const initial = {
    value: 0
}, counter = reduxy({
    increment: ({ value }, amount) => ({ value: value + amount }),
    decrement: ({ value }, amount) => ({ value: value - amount }),
    reset: () => ({ value: 0 })
}, initial, {
    reset: delay => dispatch => {
        setTimeout(() => {
            dispatch({
                type: counter.TYPES.reset
            });
        }, delay);
    }
}), { TYPES, actionCreators, reducer } = counter;

export { TYPES, actionCreators, reducer };

export default counter;

// index.js

import { actionCreators, reducer } from './counter.js';
...
```