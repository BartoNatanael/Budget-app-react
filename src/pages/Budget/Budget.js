import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.action';
import { fetchAllCategories } from 'data/actions/common.action';

import { Grid } from './Budget.css'

function Budget ({ fetchBudget, fetchBudgetedCategories, fetchAllCategories }) {
    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
        fetchAllCategories()
      },[fetchBudget, fetchBudgetedCategories, fetchAllCategories])
    return (
        <Grid>
          <section>
            Category list
          </section>
          <section>
            Transaction List
          </section>
        </Grid>
    )
}

export default connect(state => {
    return{
      budget: state.budget.budget
    }
  }, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories
  })(Budget);