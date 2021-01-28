import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import DeleteBudgetForm from './DeleteBudgetForm';
import API from 'data/fetch';
import { connect } from 'react-redux';
import { selectBudgetId } from 'data/actions/budget.action';
import { useState } from 'react';
import ChooseNewBudget from './ChooseNewBudget';
import budget from 'data/reducers/budget.reducer';

function DeleteBudgetView({budgetId, selectBudgetId}){
    const [newIdNeeded, setNewIdNeeded] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const { data: budgets } = useQuery('budgets', API.budget.fetchBudgets);
    const history = useHistory();

    const handleSubmitDeleteBudget = ({budget}) => {
        if(budget == budgetId){
            setNewIdNeeded(true);
            return;
        } else {
            deleteBudget();
        }
    };

    const ChooseNewBudgetFunc = ({budget}) => {
        selectBudgetId(budget);
        deleteBudget();
    }

    const deleteBudget = () => {

        API.budget.fetchBudgetWithCategories({idToDelete}).then(value => 
            console.log(value.budgetCategories));
        API.budget.fetchBudget({idToDelete}).then(value => 
            value.transactions);
        
    }
    return(
        (!newIdNeeded) ?
            <DeleteBudgetForm
                onSubmit={handleSubmitDeleteBudget}
                budgets={budgets}
            /> :
            <ChooseNewBudget
                onSubmit={ChooseNewBudgetFunc}
                newBudgetList={budgets.filter(budget => budget.id != budgetId)}
            />
    )
}

export default connect(state => ({
    budgetId : state.budget.selectedBudgetId,
}),{
    selectBudgetId
})(DeleteBudgetView);