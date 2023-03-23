
import React from 'react';

const ExpenseContext = React.createContext({
    expenseList: [],
    addExpense: (expense) => { },
    removeExpense: (id) => { },
    updateExpense:(id,value)=>{}
})

export default ExpenseContext;