import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';

import {ToggleableList} from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

function BudgetCategoryList({ budgetedCategories, allCategories, budget}) {
    const { t } = useTranslation();

    const budgetedCategoriesByParent = useMemo(
        () => groupBy(
            budgetedCategories, 
            item => allCategories.find(category => category.id === item.categoryId).parentCategory.name),
        [budgetedCategories, allCategories],
      );

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories])=>({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
          name={parentName}
          onClick={() => onClick(parentName)}
          categories={categories}
          transactions={budget.transactions}
        />
        ),
        children: categories.map(budgetedCategories=>{
            const {name} = allCategories.find(category => category.id === budgetedCategories.categoryId)
            return(
                <CategoryItem
                key={budgetedCategories.id}
                name={name}
                item={budgetedCategories}
                transactions={budget.transactions}
                />
            )
        })
    }));

    const totalSpent = budget.transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const restToSpent = budget.totalAmount - totalSpent;
    const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions
            .filter(transaction => transaction.id === budgetedCategory.id);
        const categoryExpenses = categoryTransactions
            .reduce((acc, transaction)=> acc + transaction.amount, 0);

        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
    }, 0);

    const notBudgetedTransaction = budget.transactions
        .filter(transaction => {
            return !budgetedCategories
                .find(budgetedCategory=> budgetedCategory.id === transaction.categoryId)
            });
    const notBudgetedExpenses = notBudgetedTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const availableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

    console.log(availableForRestCategories)
    
    return(
        <div>
            <div
                css={`
                    border-bottom: 5px solid ${({theme}) => theme.colors.gray.light}
                `}
            >
                <ParentCategory
                name={budget.name}
                amount={restToSpent}
            />
            </div>
            
            <ToggleableList
                items={listItems}
            />
            <div
                css={`
                border-top: 5px solid ${({theme}) => theme.colors.gray.light}
            `}
            >
                <ParentCategory
                name={t('Other Categories')}
                amount={availableForRestCategories}
            />
            </div>
        </div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget,
}))(BudgetCategoryList);