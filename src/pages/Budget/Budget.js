import React, {useEffect, useMemo} from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  fetchBudget, fetchBudgetedCategories, addTransaction, 
  } from 'data/actions/budget.action';
import { fetchAllCategories } from 'data/actions/common.action';

import { Grid } from './Budget.css'
import { LoadingIndicator, Modal, Button } from 'components';

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';
import AddTransactionForm from 'pages/Budget/components/AddTransactionForm';

function Budget ({ 
  commonState , budgetState, allCategories, budget,
  fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction }) {
    const history = useHistory();
    useEffect(() => {
        // fetchBudget(1);
        // fetchBudgetedCategories(1);
        // fetchAllCategories()
      },[fetchBudget, fetchBudgetedCategories, fetchAllCategories])
      const isLoaded = useMemo(() => (!!commonState &&  Object.keys(commonState).length === 0) && (!!budgetState && Object.keys(budgetState).length === 0), 
      [commonState, budgetState]
    );

    const handleSubmitAddTransaction = (values) => {
      addTransaction({
        budgetId: budget.id,
        data: values,
      }).then(()=>{
        history.goBack();
      })
    }

    return (
      <>
        <Grid>          
          <section>

             <BudgetCategoryList></BudgetCategoryList> 
            
          </section>
          <section>

            <>
            <Button to='budget/transactions/new'>Add new transactions</Button>
            <BudgetTransactionList/>
            </>

          </section>
        </Grid>

        <Switch>
              <Route path='/budget/transactions/new'>
                <Modal>
                  <AddTransactionForm
                  categories={allCategories}
                  groupCategoriesBy='parentCategory.name'
                  onSubmit={handleSubmitAddTransaction}
                  />
                </Modal>
              </Route>
        </Switch>
      </>
    )
}

export default connect(state => {
    return{
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories,
    }
  }, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction,
  })(Budget);