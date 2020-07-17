import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';

function BudgetCategoryList({ budgetedCategories, allCategories}) {

    console.log(budgetedCategories)

    let budgete = allCategories

    console.log(allCategories)

    const tab = [1, 2, 3]

    const budgetedCategoriesByParent = useMemo(
        () => groupBy(
            budgetedCategories, 
            item => allCategories.find(category => category.id === item.categoryId).parentCategoryId.name),
        [budgetedCategories, allCategories],
      );

    console.log(budgetedCategoriesByParent)
    
    return(
        <div>BudgetCategoryList</div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList);