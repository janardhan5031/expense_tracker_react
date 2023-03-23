import React, { useState, useEffect } from "react";
import ExpenseContext from "./ExpenseContext";
import axios from "axios";


const ExpenseContextProvider = (props) => {

    const [expenseList, setExpenseList] = useState([]);

    // get all expenses from firebase realtime database
    useEffect(() => {
        axios.get(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses.json`)
            .then((response) => {
                // console.log(response)

                if (response.data) {
                    const list = Object.keys(response.data).map(key => {
                        return {
                            ...response.data[key],key
                        }
                    })
                    setExpenseList(list);
                }

            }).catch(err => console.log(err))
        //

    }, [])

    async function addExpense(new_exp) {

        try {
            const response = await axios.post(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses.json`, {
                ...new_exp, id: Date.now()
            })
            // console.log(response)
            setExpenseList((prevList) => {
                return [...prevList, { ...new_exp, id: Date.now() }]
            })

        } catch (err) {
            console.log(err)
        }
    }

    async function updateExpense(id, values) {
        const key = expenseList.filter((exp) => exp.id == id)[0].key;
        // console.log(key)
        const response = await axios.patch(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses/${key}.json`, {
            ...values,id:Date.now()
        })

        setExpenseList((prev) => {
            return prev.map(exp => {
                if (exp.id == id) {
                    exp= {...exp,...values}
                }
                return exp;
            })
        })
    }

    async function removeExpense(id) {
        const key = expenseList.filter((exp) => exp.id == id)[0].key;
        const response = await axios.delete(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses/${key}.json`)

        setExpenseList((prev) => {
            return prev.filter(exp=>exp.key!==key)
        })
    }

    const ExpenseCtx = {
        expenseList,
        addExpense,
        removeExpense,
        updateExpense
    }

    return <ExpenseContext.Provider value={ExpenseCtx}>
        {props.children}
    </ExpenseContext.Provider>
}

export default ExpenseContextProvider;