import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useQuery, useMutation } from 'react-query';

import { formatCurrency, formatDate } from 'utils';
import API from 'data/fetch';

import { List, ListItem } from './BudgetTransactionList.css';
import { Button } from 'components';

function BudgetTransactionList({ budgetId, selectedParentCategoryId }){
    const { data: budget } = useQuery(['budget', {id: budgetId}], API.budget.fetchBudget);
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
    const { data: budgetedCategories } = useQuery(
        ['budgetedCategories', {id: budgetId}], 
        API.budget.fetchBudgetedCategories);
    const [mutate] = useMutation(API.budget.deleteTransaction,{
        refetchQueries: [
          ['budget', {id: budgetId}],
        ],
    });

    const filteredTransactionsBySelectedParentCategory = useMemo(() => {
    if (typeof selectedParentCategoryId === 'undefined') {
      return budget.transactions;
    }

    if (selectedParentCategoryId === null) {
      return budget.transactions.filter(transaction => {
        const hasBudgetedCategory = budgetedCategories
          .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);

        return !hasBudgetedCategory;
      });
    }

    return budget.transactions.filter(transaction => {
      try {
        const parentCategoryName = allCategories.find(category => category.id === transaction.categoryId).parentCategory.name;

        return parentCategoryName === selectedParentCategoryId;
      } catch (error) {
        return false;
      }
    });
  }, [selectedParentCategoryId, budget.transactions, allCategories, budgetedCategories]);

    const groupedTransactions = useMemo(()=>
        groupBy(
            filteredTransactionsBySelectedParentCategory,
            transaction => new Date(transaction.date).getUTCDate()
        ),
        [filteredTransactionsBySelectedParentCategory]
    );

    const deleteTransaction = (id) => {
      mutate({
        id
      })
    };

    return(
       <List>
            {Object.entries(groupedTransactions).map(([key, transactions])=>(
                <li key={key}>
                    <ul>
                        {transactions.map(transaction =>(
                            <ListItem key={transaction.id}>
                                <div>{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount)}</div>
                                <div>{formatDate(transaction.date)}</div>
                                <div>
                                    {(allCategories.find(category => category.id === transaction.categoryId) || {}).name}
                                    </div>
                                <Button onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                            </ListItem>
                        ))}
                    </ul>
                </li>
                ))}          
       </List> 
    )
}

export default connect(state => ({
    selectedParentCategoryId: state.budget.selectedParentCategoryId,
    budgetId: state.budget.selectedBudgetId
}))(BudgetTransactionList);