import React from 'react';
import { Form, Field } from 'react-final-form';
import { noop } from 'lodash';

const required = value => (value ? undefined : 'This field is Required!');

function AddBudgetForm({ onSubmitBudget = noop }){
    return(
        <div>AddBudgetForm</div>
    );
};

export default AddBudgetForm;