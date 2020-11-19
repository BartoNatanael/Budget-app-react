export const fetchBudget = async({id}) => {
    const response  = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    const data = await response.json();
    return data;
};

export const fetchBudgetWithCategories = async({id}) => {
    const response  = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=budgetCategories`);
    const data = await response.json();
    return data;
};

export const fetchBudgets = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets`);
    const data = await response.json();
    return data;
};

export const fetchOneBudget = async({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}`);
    const data = await response.json();
    return data;
};

export const fetchBudgetedCategories = async({id}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`);
    const data = await response.json();
    return data;
};

export const addTransaction = async({budgetId, data}) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/budgets/${budgetId}/transactions`,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        );
    return await response.json();
};

export const deleteTransaction = async({id}) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/transactions/${id}`,
        {
            method: "DELETE"
        }
    )
    return await response.json();
}

export const addBudget = async({data}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets`,
    {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    );
    return await response.json();
}

export const modifyBudget = async({budgetId, obj}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetId}`,
    {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(obj),
    }
    );
    return await response.json();
}


export const modifyBudgetCategory = async({budgetCategoryId, obj}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgetCategories/${budgetCategoryId}`,
    {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(obj),
    }
    );
    return await response.json();
}

export const addBudgetCategory = async({obj}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgetCategories/`,
    {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(obj),
    }
    );
    return await response.json();
}

export const deleteBudgetCategory = async({budgetCategoryId}) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgetCategories/${budgetCategoryId}`,
    {
        method: "DELETE"
    }
    );
    return await response.json();
}