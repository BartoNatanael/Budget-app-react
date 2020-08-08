import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Grid } from './Budget.css'
import { Modal, Button, SuspenseReactBoundary } from 'components';

import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList';
import BudgetTransactionList from 'pages/Budget/components/BudgetTransactionList';
import AddTransactionView from 'pages/Budget/components/AddTransactionForm';

function Budget () {

    return (
      <>
        <Grid>          
          <section>
            <SuspenseReactBoundary>
              <BudgetCategoryList/>
            </SuspenseReactBoundary>
          </section>
          <section>

          <SuspenseReactBoundary>
            <Button to='budget/transactions/new'>Add new transactions</Button>
            <BudgetTransactionList/>
          </SuspenseReactBoundary>

          </section>
        </Grid>

        <Switch>
              <Route path='/budget/transactions/new'>
                <Modal>
                  <AddTransactionView/>
                </Modal>
              </Route>
        </Switch>
      </>
    )
}

export default Budget;