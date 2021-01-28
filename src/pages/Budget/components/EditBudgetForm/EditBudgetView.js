import React from 'react';
import { connect } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import API from 'data/fetch';
import EditBudgetForm from './EditBudgetForm';
import { setBudgetedCategories } from 'data/actions/budget.action';

function AddTransactionView({ budgetId, actualBudgetedCategories, setBudgetedCategories }){
    const { data: budgetWithCategories } = useQuery(['budgetWithCategories', {id: budgetId}], API.budget.fetchBudgetWithCategories);
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
    const { data: oneBudget } = useQuery(['oneBudget', {id: budgetId}], API.budget.fetchOneBudget);
    const [mutateBudget] = useMutation(API.budget.modifyBudget,{
      refetchQueries: [
        ['budget', {id: budgetId}],
        ['budgetWithCategories', {id: budgetId}],
      ],
      variables: {
        budgetId
      }
    });
    const [mutateCategory] = useMutation(API.budget.modifyBudgetCategory, {
        refetchQueries: [
            ['budget', {id: budgetId}],
            ['budgetWithCategories', {id: budgetId}],
          ]
    })
    const [addCategory] = useMutation(API.budget.addBudgetCategory, {
        refetchQueries: [
            ['budget', {id: budgetId}],
            ['budgetWithCategories', {id: budgetId}],
          ]
    })
    const [deleteCategory] = useMutation(API.budget.deleteBudgetCategory, {
        refetchQueries: [
            ['budget', {id: budgetId}],
            ['budgetWithCategories', {id: budgetId}],
          ]
    })
    const history = useHistory();

    const budgetToEdit = allCategories.map(category => {
        const value = budgetWithCategories.budgetCategories.find(budgetedCategory => budgetedCategory.categoryId === category.id);

        return {name: category.name, id: category.id, budget: value}
    })
    
    const handleSubmitAddTransaction = async (values) => {

        for (const [name, value] of Object.entries(values)) {
            if (name === 'name'){
                const obj = oneBudget;
                obj.name = value;
                await mutateBudget({
                    budgetId: budgetId,
                    obj: obj
                })
            } else if (name === 'totalAmount'){
                const obj = oneBudget;
                obj.totalAmount = value;
                await mutateBudget({
                    budgetId: budgetId,
                    obj: obj
                })
            } 
            else {
                if (value) {

                    if (budgetWithCategories.budgetCategories.find(category => category.id === allCategories.find(category => category.name === name).id)){
                        
                        const obj = (budgetWithCategories.budgetCategories.find(category => category.id === allCategories.find(category => category.name === name).id))
                        obj.budget = value

                        await mutateCategory({
                            type: "PUT",
                            budgetCategoryId: obj.id,
                            obj: obj
                        })

                    } else {
                        const obj = {
                            budget: value,
                            budgetId: budgetId.toString(10),
                            categoryId: allCategories.find(category => category.name === name).id,
                        }
                        await addCategory({
                            obj: obj
                        })
                    }
                } else {
                    const obj = (budgetWithCategories.budgetCategories.find(category => category.categoryId === allCategories.find(category => category.name === name).id))
                    await deleteCategory({
                        budgetCategoryId: obj.id
                    })
                }
            }
        }
        history.goBack();
      
      }
    return(
        <EditBudgetForm
            budget={budgetWithCategories}
            budgetToEdit={budgetToEdit}
            onSubmitBudget={handleSubmitAddTransaction}
        />
    )
};

export default connect(state => ({
  budgetId : state.budget.selectedBudgetId,
  actualBudgetedCategories: state.budget.budgetedCategories
}), {
  setBudgetedCategories
})(AddTransactionView);