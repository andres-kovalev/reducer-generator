import { combineReducers } from 'redux';

import { reducer as counter } from '../store/Counter';

export default combineReducers({
    counter
});