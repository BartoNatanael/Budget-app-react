import React from 'react';
import { connect } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import API from 'data/fetch';
import AddTransactionForm from './AddTransactionForm';

function AddTransactionView({ budgetId }){
    const { data: budget } = useQuery(['budget', {id: budgetId}], API.budget.fetchBudget);
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
    const [mutate] = useMutation(API.budget.addTransaction,{
      refetchQueries: [
        ['budget', {id: budgetId}],
      ],
    });
    const history = useHistory();

    const handleSubmitAddTransaction = (values) => {
        mutate({
          budgetId: budget.id,
          data: values,
        }).then(()=>{
          history.goBack();
        })
      }
    return(
        <AddTransactionForm
            categories={allCategories}
          groupCategoriesBy='parentCategory.name'
          onSubmit={handleSubmitAddTransaction}
        />
    )
};

export default connect(state => ({
  budgetId : state.budget.selectedBudgetId,
}))(AddTransactionView);