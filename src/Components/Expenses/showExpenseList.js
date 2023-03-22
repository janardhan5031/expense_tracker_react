import { useContext } from "react";

import InputModal from "../Store/UI/InputModal";
import ExpenseContext from "../Store/ExpenseContext/ExpenseContext";

import './showExpenses.css';

const ShowExpenseList = (props) => {

    const expenseCtx = useContext(ExpenseContext);

    const list = expenseCtx.expenseList.map((exp) => {
        return <div key={exp.id} className='expense_list_container'>
            <div className="exp_box">{ exp.expense}</div>
            <div className="exp_box">{ exp.description}</div>
            <div className="exp_box">{ exp.type}</div>
        </div>
    })

    return <>
        <InputModal style={{...props.styling, maxHeight:'25rem', overflow:'auto'}}>
            <ul>
                {list}
            </ul>
        </InputModal>
    </>
}

export default ShowExpenseList;