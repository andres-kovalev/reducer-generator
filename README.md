[![ci](https://img.shields.io/circleci/build/github/andres-kovalev/reducer-generator.svg?logo=circleci&style=flat-square)](https://circleci.com/gh/andres-kovalev/reducer-generator)
[![codecov](https://img.shields.io/codecov/c/github/andres-kovalev/reducer-generator.svg?style=flat-square&logo=codecov&token=1280f2cf41a24522add9857967be2a73)](https://codecov.io/gh/andres-kovalev/reducer-generator)
[![downloads](https://img.shields.io/npm/dm/reducer-generator.svg?style=flat-square&logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDAwcHgiIGhlaWdodD0iNDAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiCj48ZyBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTM3OSwxODAuNWgtMTAydi0xMDBoLTE1M3YxMDBoLTEwMmwxNzguNSwxNzguNWwxNzguNSwtMTc4LDUiLz48L2c+PC9zdmc+Cg==)](https://www.npmjs.com/package/reducer-generator)
[![node](https://img.shields.io/node/v/reducer-generator.svg?style=flat-square&logo=node.js&color=007ec6)](https://nodejs.org/)
[![npm](https://img.shields.io/npm/v/reducer-generator.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/reducer-generator)
[![MIT](https://img.shields.io/npm/l/reducer-generator.svg?color=007ec6&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA5ElEQVR4AY3SJWyDcRQE8G+MsnIg63XNmMm2ZuB9xjyv5tWYfAZ2TD6tGW9qzHCX3H9bX4rJz7y7K3t8NK20OT7ogHnYl3ndfK5nRwFYgxf4Nl6UBVzfjcoholIiEXbdsBS2TCERdks5HIaPVIfqDnN4HCO8gUm5iZEfc/gYI+gBT3pi5I8M3szxE0LgSYg303ljcGqOtAHFshEjP+VwOkbwCvXyGiOf5rASrkwQhhIJm4zdKg4zYBDe/z8j72Te0bu6GRxSIUzAHXxBF3jSpdudOoX2/5oDQVgEP3ji1y3Ijhv9ABp7euvVsybrAAAAAElFTkSuQmCC&style=flat-square)](https://github.com/andres-kovalev/reducer-generator/blob/master/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/min/reducer-generator.svg?style=flat-square&logo=data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDAwcHgiIGhlaWdodD0iNDAwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnIGZpbGw9IndoaXRlIj48cGF0aCBkPSJNNzUsMzBoMTc1bDEwMCwxMDB2MjQwaC0yNzV2LTI0MCIvPjwvZz48ZyBmaWxsPSIjREREIj48cGF0aCBkPSJNMjUwLDMwbDEwMCwxMDBoLTEwMHYtMTAwIi8+PC9nPjwvc3ZnPgo=)](https://www.npmjs.com/package/reducer-generator)

# Intro

`reducer-generator` package can help for flux/redux developers to reduce boilerplate when creating actions, action creators and reducers. It can automate part of work and generate actions and action creators by itself.

# API

## generateReducer(reducerCaseMap)

`reducer-generator` has only default export - `generateReducer()` function. It expects an object as only argument. Action type and action creator function will be created for each key of this object. Each value should describe reducer case to react on specific action. Reducer case function should receive two arguments: current state and action payload.

```js
// simpleCounter.js

import generateReducer from 'reducer-generator';

const counter = generateReducer({
    increment: ({ counterValue, ...rest }) => ({ counterValue: counterValue + 1, ...rest }),
    decrement: ({ counterValue, ...rest }) => ({ counterValue: counterValue - 1, ...rest }),
    reset: state => ({ ...state, counterValue: 0 })
});
```

After call above `generateReducer()` function will return equivalen for the following object:

```js
{
    TYPES: {
        increment: 'increment-<unique-increment-id>',
        decrement: 'decrement-<unique-decrement-id>',
        reset: 'reset-<unique-reset-id>'
    },
    ACTIONS: {
        increment: payload => ({ type: 'increment-<unique-increment-id>', payload }),
        decrement: payload => ({ type: 'decrement-<unique-decrement-id>', payload }),
        reset: payload => ({ type: 'reset-<unique-reset-id>', payload })
    },
    reducer: (state, { type, payload }) => {
        switch (type) {
            case 'increment-<unique-increment-id>':
                return { ...state, counterValue: state.counterValue + 1 };
            case 'decrement-<unique-decrement-id>':
                return { ...state, counterValue: counterValue - 1 };
            case 'reset-<unique-reset-id>':
                return { ...state, counterValue: 0 };
            default:
                return state;
        }
    }
}
```

Async actions can be created by using generated sync actions:

```js
// for redux-thunk

const resetAsync = timeout => dispatch => setTimeout(
    () => dispatch(counter.ACTIONS.reset()),
    timeout
);
```
