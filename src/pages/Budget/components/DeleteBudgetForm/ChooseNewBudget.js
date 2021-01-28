import React from 'react';
import { Form, Field } from 'react-final-form';

function ChooseNewBudget({onSubmit, newBudgetList, id}){
    return(
        <Form
            onSubmit={onSubmit}
            initialValues={{budget: id}}
            render={({handleSubmit, form, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <h1>Choose budget</h1>
                    {newBudgetList.map(budget =>{
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

export default ChooseNewBudget;