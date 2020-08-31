import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-dom';

import API from 'data/fetch';
import AddBudgetForm from './AddBudgetForm';

function AddBugetView(){
    
    return(
        <AddBudgetForm/>
    )
};

export default AddBugetView;