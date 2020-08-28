import {
    SET_SELECTED_PARENT_CATEGORY_ID,
    SET_BUDGET_ID
} from 'data/constants';

const initialState = {
    selectedParentCategoryId: undefined,
    selectedBudgetId: 1,
}

function budget(state = initialState, action){

    switch(action.type){
            case SET_SELECTED_PARENT_CATEGORY_ID:
                return {
                    ...state,
                    selectedParentCategoryId: action.payload,
                };
            case SET_BUDGET_ID:
                return {
                    ...state,
                    selectedBudgetId: action.payload,
                }

        default:
            return state;
    }
}

export default budget;