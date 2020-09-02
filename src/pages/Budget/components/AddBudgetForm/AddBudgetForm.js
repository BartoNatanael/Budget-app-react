import React from 'react';
import { Form, Field } from 'react-final-form';
import { noop } from 'lodash';

const required = value => (value ? undefined : 'This field is Required!');

function AddBudgetForm({ onSubmitBudget = noop }){
    return(
        <Form
        onSubmit={onSubmitBudget}
        render={({ handleSubmit, form, submitting, pristine }) =>(
            <form onSubmit={handleSubmit}>
                <Field name="name" validate={required}>
                    {({ input, meta }) => (
                        <div>
                            <label>Budget name</label>
                            <input {...input} type="text" placeholder="Budget name" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                        )}
                </Field>
                <Field name="totalAmount" validate={required} parse={value => parseFloat(value, 10)}>
                    {({ input, meta }) => (
                    <div>
                        <label>Amount</label>
                        <input {...input} type="number" step="10" placeholder="Amount" />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                    )}
                </Field>
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

export default AddBudgetForm;