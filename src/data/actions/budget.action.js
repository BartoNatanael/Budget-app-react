import {
    SET_SELECTED_PARENT_CATEGORY_ID,
    SET_BUDGET_ID,
    SET_BUDGETED_CATEGORIES
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

export const setBudgetedCategories = (categories) => {
    return {
        type: SET_BUDGETED_CATEGORIES,
        payload: categories
    }
}