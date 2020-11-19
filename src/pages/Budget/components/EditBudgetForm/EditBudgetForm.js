import React from 'react';
import { Form, Field } from 'react-final-form';
import { noop } from 'lodash';

function EditBudgetForm({ onSubmitBudget = noop, budget, budgetToEdit }){
    return(
        <Form
        onSubmit={onSubmitBudget}
        render={({ handleSubmit, form, submitting, pristine }) =>(
            <form onSubmit={handleSubmit}>
                <Field name="name">
                    {({ input, meta }) => (
                        <div>
                            <label>Budget name</label><br/>
                            <label>Current name: {budget.name}</label><br/>
                            <input {...input} type="text" placeholder="New name" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                </Field>
                <Field name="totalAmount">
                    {({ input, meta }) => (
                        <div>
                            <label>Budget name</label><br/>
                            <label>Current name: {budget.totalAmount}</label><br/>
                            <input {...input} type="number" placeholder="New amount" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                </Field>
                {budgetToEdit.map(({name, id, budget}) => (
                    <Field key={id} name={name} parse={value => parseFloat(value, 10)}>
                    {({ input, meta }) => (
                    <div>
                        <label>Category name: {name}, current amount: {budget ? budget.budget : 'No budget'}</label>
                        <input {...input} type="number" step="" placeholder="New amount" />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                    )}
                </Field>
                ))}
                <div className="buttons">
                    <button type="submit" disabled={submitting}>
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                        >
                        Reset
                    </button>
                </div>
            </form>
        )}
        />
    );
};

export default EditBudgetForm;