import {
    SET_SELECTED_PARENT_CATEGORY_ID,
    SET_BUDGET_ID,
} from 'data/constants';

export const selectParentCategory = (id) => {
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id,
    }
};

export const selectBudgetId = (id) => {
    return {
        type: SET_BUDGET_ID,
        payload: id,
    }
}