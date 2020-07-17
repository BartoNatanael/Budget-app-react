import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import {ToggleableList} from 'components';

function BudgetCategoryList({ budgetedCategories, allCategories}) {

    const budgetedCategoriesByParent = useMemo(
        () => groupBy(
            budgetedCategories, 
            item => allCategories.find(category => category.id === item.categoryId).parentCategory.name),
        [budgetedCategories, allCategories],
      );

    console.log(budgetedCategoriesByParent)

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories])=>({
        id: parentName,
        Trigger: ({ onClick }) => (
            
        ),
        children: categories.map(category=>(

        ))
    }))
    
    return(
        <div>
            <ToggleableList
                items={[]}
            />
        </div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList);