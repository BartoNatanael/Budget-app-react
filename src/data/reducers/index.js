import {combineReducers} from 'redux';

import budget from './budget.reducer';

const rootReducers = combineReducers({
    budget,
})

export default rootReducers;