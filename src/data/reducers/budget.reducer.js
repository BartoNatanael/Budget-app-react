import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    LOADING_STATES,
    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,
    BUDGET_TRANSACTION_ADD_REQUEST,
    BUDGET_TRANSACTION_ADD_SUCCESS,
    // BUDGET_TRANSACTION_ADD_FAILURE,

    SET_SELECTED_PARENT_CATEGORY_ID
} from 'data/constants';

const initialState = {
    loadingState: null,
    budget: {},
    budgetCategories: [],
    selectedParentCategoryId: undefined,
}

function budget(state = initialState, action){

    const newLoadingState = {...state.loadingState};

    switch(action.type){
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loadingState:{
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            };
        case BUDGET_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;
            return {
                ...state,
                budget: action.payload,
                loadingState: newLoadingState,
            };
        case BUDGET_GET_FAILURE:
            delete newLoadingState.BUDGET_GET_REQUEST;
            return {
                ...state,
                budget: [],
                loadingState: newLoadingState
            };

            case BUDGETED_CATEGORIES_GET_REQUEST:
                return {
                    ...state,
                    loadingState:{
                        ...state.loadingState,
                        [action.type]: LOADING_STATES.LOADING,
                    }
                };
            case BUDGETED_CATEGORIES_GET_SUCCESS:
                delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
                return {
                    ...state,
                    budgetedCategories: action.payload,
                    loadingState: newLoadingState,
                };
            case BUDGETED_CATEGORIES_GET_FAILURE:
                delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
                return {
                    ...state,
                    budgetedCategories: [],
                    loadingState: newLoadingState
                }
            
            case SET_SELECTED_PARENT_CATEGORY_ID:
                return {
                    ...state,
                    selectedParentCategoryId: action.payload
                };

                case BUDGET_TRANSACTION_ADD_REQUEST:
                    return {
                        ...state,
                        loadingState:{
                            ...state.loadingState,
                            [action.type]: LOADING_STATES.LOADING,
                        }
                    };
                case BUDGET_TRANSACTION_ADD_SUCCESS:
                    delete newLoadingState.BUDGET_TRANSACTION_ADD_REQUEST;
                    return {
                        ...state,
                        budget:{ 
                            ...state.budget,
                            transactions: [
                                action.payload,
                                ...state.budget.transactions
                            ],
                        },
                        loadingState: newLoadingState,
                    };
        default:
            return state;
    }
}

export default budget;