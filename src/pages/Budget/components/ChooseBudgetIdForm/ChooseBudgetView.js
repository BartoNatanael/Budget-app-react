import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import ChooseBudgetForm from './ChoseBudgetForm';

import { selectBudgetId } from 'data/actions/budget.action';

import API from 'data/fetch';

function ChooseBudgetView({ budgetId, selectBudgetId }){
    const { data: budgets } = useQuery('budgets', API.budget.fetchBudgets);
    const history = useHistory();

    const handleSubmitChooseBudget = ({budget}) => {
        selectBudgetId(budget);
        history.goBack();
    };
    return(
        <ChooseBudgetForm
            onSubmit={handleSubmitChooseBudget}
            budgets={budgets}
            id={budgetId}
        />
    )
}

export default connect(state => ({
    budgetId : state.budget.selectedBudgetId,
}),{
    selectBudgetId
})(ChooseBudgetView);