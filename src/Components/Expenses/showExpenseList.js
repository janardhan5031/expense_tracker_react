
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../Store/Redux_store/expenseReducer";
import axios from "axios";

import InputModal from "../Store/UI/InputModal";

import './showExpenses.css';

const ShowExpenseList = (props) => {
    
    const dispatch = useDispatch();
    const expenseList = useSelector((state) => state.expense.expenseList);

    const updateExpense = (e) => {
        // console.log(e.currentTarget.id)
        props.updateExpOnclick(e.currentTarget.children[3].id)
    }

    const deleteExpense = async (e) => {
        e.stopPropagation()
        const id = e.currentTarget.id;
        // console.log(id)
        const key = expenseList.filter((exp) => exp.id === Number(id))[0].key;
        try {
            const response = await axios.delete(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses/${key}.json`)

            if (response.status === 200) {
                
                dispatch(expenseActions.removeExpense({ id }))
            }

        } catch (err) {
            console.log(err)
        }

    }

    const list = expenseList.map((exp) => {
        return <div key={exp.id} className='expense_list_container' onClick={ updateExpense}>
            <div className="exp_box">{ exp.expense}</div>
            <div className="exp_box">{ exp.description}</div>
            <div className="exp_box">{exp.type}</div>
            <button onClick={deleteExpense} id={exp.id}>Remove</button>
        </div>
    })

    return <>
        <InputModal style={{...props.styling, maxHeight:'25rem', overflow:'auto'}}>
            <ul>
                {expenseList.length? list : <h4>No expenses found</h4>}
            </ul>
        </InputModal>
    </>
}

export default ShowExpenseList;