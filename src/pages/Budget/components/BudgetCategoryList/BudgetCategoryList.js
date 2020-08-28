import React, { useMemo, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import API from 'data/fetch';
import 'styled-components/macro';

import {ToggleableList, Button} from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

import { selectParentCategory } from 'data/actions/budget.action';

function BudgetCategoryList({ budgetId, selectParentCategory }) {
        
        const { data: budget } = useQuery(['budget', {id: budgetId}], API.budget.fetchBudget);
        const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories);
        const { data: budgetedCategories } = useQuery(
            ['budgetedCategories', {id: budgetId}], 
            API.budget.fetchBudgetedCategories);
    const { t } = useTranslation();

    const budgetedCategoriesByParent = useMemo(
        () => groupBy(
            budgetedCategories, 
            item => allCategories.find(category => category.id === item.categoryId).parentCategory.name),
        [budgetedCategories, allCategories],
      );

    const handleClickParentCategoryRef = useRef(null);

    const handleClearParentCagetogySelect = useCallback(() => {
        handleClickParentCategoryRef.current();
        selectParentCategory();
    },[selectParentCategory, handleClickParentCategoryRef]
    );

    const handleSelectRestParentCategories = useCallback(() => {
        selectParentCategory(null);
        handleClickParentCategoryRef.current();
    },[selectParentCategory, handleClickParentCategoryRef]
    );

    const listItems = useMemo(
        ()=>Object.entries(budgetedCategoriesByParent).map(([parentName, categories])=>({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
          name={parentName}
          onClick={() => {
                onClick(parentName);
                selectParentCategory(parentName)}}
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
            }),
        })),
        [allCategories, budget.transactions, budgetedCategoriesByParent, selectParentCategory]
    );

    const totalSpent = useMemo(()=>
        budget.transactions
            .reduce((acc, transaction) => acc + transaction.amount, 0),
            [budget.transactions]
        );

    const restToSpent = useMemo(()=>
        budget.totalAmount - totalSpent,
        [budget.totalAmount, totalSpent]
        );
    const amountTaken = useMemo(()=>
        budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions
            .filter(transaction => transaction.id === budgetedCategory.id);
        const categoryExpenses = categoryTransactions
            .reduce((acc, transaction)=> acc + transaction.amount, 0);

        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
    }, 0),
    [budget.transactions, budgetedCategories]
    );

    const notBudgetedTransaction = useMemo(()=>
        budget.transactions
        .filter(transaction => {
            return !budgetedCategories
                .find(budgetedCategory=> budgetedCategory.id === transaction.categoryId)
            }),
            [budget.transactions, budgetedCategories]
            );
    const notBudgetedExpenses = useMemo(()=>
        notBudgetedTransaction.reduce((acc, transaction) => acc + transaction.amount, 0),
        [notBudgetedTransaction]
        );
    
    const availableForRestCategories = useMemo(()=>
        budget.totalAmount - amountTaken - notBudgetedExpenses,
        [budget.totalAmount, amountTaken, notBudgetedExpenses]
        );
    
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
                onClick={handleClearParentCagetogySelect}
            />
            </div>
            
            <ToggleableList
                items={listItems}
                clickRef={handleClickParentCategoryRef}
            />
            <div
                css={`
                border-top: 5px solid ${({theme}) => theme.colors.gray.light}
            `}
            >
                <ParentCategory
                name={t('Other Categories')}
                amount={availableForRestCategories}
                onClick={handleSelectRestParentCategories}
            />
            </div>
            <Button>Wybierz budżet</Button>
            <Button>Dodaj budżet</Button>
        </div>
    )
}

export default connect(state => ({
    budgetId : state.budget.selectedBudgetId
}),{
    selectParentCategory
})(BudgetCategoryList);