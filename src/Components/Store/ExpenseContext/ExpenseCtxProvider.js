import React, { useState } from "react";
import ExpenseContext from "./ExpenseContext";



const ExpenseContextProvider = (props) => {
    
    const [expenseList, setExpenseList] = useState([{id:'542', expense:500,description:'raksha birthday', type:'Food'}]);

    function addExpense(new_exp) {
        setExpenseList((prevList) => {
            return [...prevList,{ ...new_exp,id:Date.now()}]
        })
    }

    function removeExpense(id) {
        
    }

    const ExpenseCtx = {
        expenseList,
        addExpense,
        removeExpense
    }

    return <ExpenseContext.Provider value={ExpenseCtx}>
        {props.children}
    </ExpenseContext.Provider>
}

export default ExpenseContextProvider;