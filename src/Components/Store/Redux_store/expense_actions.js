import axios from "axios";
import { expenseActions } from "./expenseReducer";


export const getUserExpenses = () => {
    return async (dispatch) => {

        const getExpenses = async () => {
            try {
                const response = await axios.get(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses.json`)
                // console.log(response)
                if (response.data) {
                    const list = Object.keys(response.data).map(key => {
                        return {
                            ...response.data[key], key
                        }
                    })
                    console.log(list)
                    return list;
                }
            } catch (err) {
                console.log(err)
            }
        }

        const expenses = await getExpenses()

        dispatch(expenseActions.addExpense(expenses || []));

    }
}
