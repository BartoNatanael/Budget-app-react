import {combineReducers} from 'redux';

import budget from './budget.reducer';
import common from './common.reducer';

const rootReducers = combineReducers({
    budget,
    common
})

export default rootReducers;