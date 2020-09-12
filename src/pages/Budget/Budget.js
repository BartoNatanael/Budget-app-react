import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Grid } from './Budget.css'
import { Modal, Button, SuspenseReactBoundary } from 'components';

const BudgetCategoryList = React.lazy(()=>import('pages/Budget/components/BudgetCategoryList'));
const BudgetTransactionList = React.lazy(()=> import('pages/Budget/components/BudgetTransactionList'));
const AddTransactionView = React.lazy(()=>import('pages/Budget/components/AddTransactionForm'));
const ChooseBudgetView = React.lazy(()=>import('pages/Budget/components/ChooseBudgetIdForm'));
const AddBudgetView = React.lazy(()=>import('pages/Budget/components/AddBudgetForm'));

function Budget () {
  const [showTransactions, setShowTransactions] = useState(false);

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
            <Button onClick={()=> setShowTransactions(!showTransactions)}>
              {showTransactions ? 'Hide Transactions' : "Show Transactions"}
            </Button>
            {/* <Button to='budget/modify'></Button> */}
            {showTransactions?<BudgetTransactionList/>:null}
          </SuspenseReactBoundary>

          </section>
        </Grid>

        <Switch>
              <Route path='/budget/transactions/new'>
                <Modal>
                  <AddTransactionView/>
                </Modal>
              </Route>
              <Route path='/budget/choose'>
                <Modal>
                  <ChooseBudgetView/>
                </Modal>
              </Route>
              <Route path='/budget/add'>
                <Modal>
                  <AddBudgetView/>
                </Modal>
              </Route>
              <Route path='/budget/modify'>
                <Modal>
                  <AddBudgetView/>
                </Modal>
              </Route>
        </Switch>
      </>
    )
}

export default Budget;