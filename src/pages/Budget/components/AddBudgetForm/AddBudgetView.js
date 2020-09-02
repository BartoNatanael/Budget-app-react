import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-dom';

import API from 'data/fetch';
import AddBudgetForm from './AddBudgetForm';

function AddBugetView(){

    const [budgetId, setBudgetId] = useState();

    const handleSubmitAddBudget = () => {
        console.log('Submited')
    }
    
    return(
        <AddBudgetForm
            onSubmitBudget={handleSubmitAddBudget}
            budgetId={budgetId}
        />
    )
};

export default AddBugetView;