![node](https://img.shields.io/node/v/telegraf.svg?style=flat-square)
[![ci](https://img.shields.io/circleci/build/github/andres-kovalev/reducer-generator/master.svg?style=flat-square&token=b363910ebcf062c281b47795ffef5c59a5d41fb1)](https://circleci.com/gh/andres-kovalev/reducer-generator)
[![Codecov](https://img.shields.io/codecov/c/github/andres-kovalev/reducer-generator.svg?style=flat-square&token=1280f2cf41a24522add9857967be2a73)](https://codecov.io/gh/andres-kovalev/reducer-generator)

# Intro

`reducer-generator` package can help for flux/redux developers to reduce boilerplate when creating actions, action creators and reducers. It can automate part of work and generate actions and action creators by itself.

# API

## generateReducer(reducerCaseMap)

`reducer-generator` has only default export - `generateReducer` function. It expects an object as only argument. Action type and action creator function will be created for each key of this object. Each value should describe reducer case to react on specific action. Reducer case function should receive two arguments: current state and action payload.

```js
// simpleCounter.js

import generateReducer from 'reducer-generator';

const counter = generateReducer({
    increment: ({ counterValue, ...rest }) => ({ counterValue: counterValue + 1, ...rest }),
    decrement: ({ counterValue, ...rest }) => ({ counterValue: counterValue - 1, ...rest }),
    reset: state => ({ ...state, counterValue: 0 })
});
```
After call above `generateReducer` function will return equivalen for the following object:
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