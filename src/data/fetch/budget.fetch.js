export const fetchBudget = async({id}) => {
    const response  = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`);
    const data = await response.json();
    return data;
};

export const fetchBudgets = async() => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets`);
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