import { combineReducers } from 'redux';
import types from './types';

function count(state = 0, action) {
    switch (action.type) {
        case types.ADD_COUNTER:
            return state + 1;
        case types.DEL_COUNTER:
            return state - 1;
        default:
            return state;
    }
}

export default combineReducers({
    count
});
