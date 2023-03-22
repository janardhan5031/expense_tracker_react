
import React from 'react';

const ExpenseContext = React.createContext({
    expenseList: [],
    addExpense: (expense) => { },
    removeExpense :(id)=>{}
})

export default ExpenseContext;