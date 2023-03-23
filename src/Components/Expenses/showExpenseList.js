import { useContext } from "react";

import InputModal from "../Store/UI/InputModal";
import ExpenseContext from "../Store/ExpenseContext/ExpenseContext";

import './showExpenses.css';

const ShowExpenseList = (props) => {

    const expenseCtx = useContext(ExpenseContext);

    const updateExpense = (e) => {
        // console.log(e.currentTarget.id)
        props.updateExpOnclick(e.currentTarget.children[3].id)
    }

    const deleteExpense = (e) => {

        console.log(e.currentTarget.id)
        expenseCtx.removeExpense(e.currentTarget.id)
        e.stopPropagation()
    }

    const list = expenseCtx.expenseList.map((exp) => {
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
                {expenseCtx.expenseList.length? list : <h4>No expenses found</h4>}
            </ul>
        </InputModal>
    </>
}

export default ShowExpenseList;