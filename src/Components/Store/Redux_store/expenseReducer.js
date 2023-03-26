import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenseList: [],      // { expense, description, type, id, key}
    totalExpenses:0
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense(state, actions) {
            // console.log(actions.payload)
            state.expenseList = [...state.expenseList, ...actions.payload]
            
            const new_exp = actions.payload.reduce((total, exp) => total + exp.expense,0);
            state.totalExpenses += new_exp;

        },
        removeExpense(state, actions) {
            state.totalExpenses -= state.expenseList.find((exp) => exp.id === Number(actions.payload.id)).expense;
            
            state.expenseList = state.expenseList.filter((exp) => {
                return exp.id !== Number(actions.payload.id);
            }) 

        },
        updateExpense(state, actions) {
            state.expenseList = state.expenseList.map((exp) => {
                if (exp.key === actions.payload.key) {
                    return {...exp, ...actions.payload}
                }
                return exp;
            })
        }

    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer; 