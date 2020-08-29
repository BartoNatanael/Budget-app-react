import React from 'react';
import { Form, Field } from 'react-final-form';

//https://final-form.org/docs/react-final-form/examples/simple

function ChoseBudgetForm({onSubmit, budgets, id}){

    return(
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, form, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <label>
                        <Field
                            name='budget'
                            component="input"
                            type="radio"
                            value={1}
                        />
                        April
                    </label>
                    <label>
                        <Field
                            name='budget'
                            component="input"
                            type="radio"
                            value={2}
                        />
                        May
                    </label>

                    <div className="buttons">
                        <button type="submit" disabled={submitting}>
                        Submit
                        </button>
                    </div>
                </form>
            )}
        />
    )
};

export default ChoseBudgetForm;