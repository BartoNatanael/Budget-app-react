import React from 'react';
import { Form, Field } from 'react-final-form';

function DeleteBudgetForm({onSubmit, budgets, id}){

    return(
        <Form
            onSubmit={onSubmit}
            initialValues={{budget: id}}
            render={({handleSubmit, form, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <h1>Delete budget</h1>
                    {budgets.map(budget =>{
                        return(
                            <div key={budget.id}>
                                <label key={budget.id}>
                                    <Field
                                        name='budget'
                                        component="input"
                                        type="radio"
                                        value={budget.id}
                                    />
                                {budget.name}
                                </label>
                            </div>
                        )
                    })}
                    
                    <br/>
                    <div className="buttons">
                        <button type="submit" disabled={submitting}>
                        Choose
                        </button>
                    </div>
                </form>
            )}
        />
    )
};

export default DeleteBudgetForm;
