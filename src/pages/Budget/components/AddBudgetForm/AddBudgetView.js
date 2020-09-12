import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import API from 'data/fetch';
import AddBudgetForm from './AddBudgetForm';
import { selectBudgetId } from 'data/actions/budget.action';

function AddBugetView({ selectBudgetId }){

    const [budgetId, setBudgetId] = useState();
    const { data: budgets } = useQuery('budgets', API.budget.fetchBudgets);
    const [mutate] = useMutation(API.budget.addBudget,{
        refetchQueries: 
          ['budgets']
      });
    const history = useHistory();

    const handleSubmitAddBudget = (data) => {
        mutate({
            data
          }).then(()=>{
            fetch(`${process.env.REACT_APP_API_URL}/budgets/?name=${data.name}`).then(resp => 
                resp.json()).then(resp => {
                    const id = resp[0].id;
                    selectBudgetId(id);
                })
          }).then(()=>{

          }).then(()=>{
            history.goBack();
          })
    }
    
    return(
        <AddBudgetForm
            onSubmitBudget={handleSubmitAddBudget}
            budgetId={budgetId}
        />
    )
};

export default connect(null,{
    selectBudgetId
})(AddBugetView);