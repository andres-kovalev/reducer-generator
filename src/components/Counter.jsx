import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ value, increment, decrement, reset }) => <div>
        <button onClick={ decrement }>-</button>
        { value }
        <button onClick={ increment }>+</button>
        <button onClick={ reset }>r</button>
    </div>;

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
}

export default Counter;