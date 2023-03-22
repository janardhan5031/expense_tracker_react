import { Form, Button, Stack } from "react-bootstrap";
import InputModal from "../Store/UI/InputModal";
import ShowExpenseList from "./showExpenseList";

import { useContext } from 'react';
import ExpenseContext from '../Store/ExpenseContext/ExpenseContext';

const styling = {
    postion: 'relative',
    width: '100%',
    padding: '1rem',
    margin:' 2rem 1rem'
}

const AddExpenses = () => {

    const Ctx = useContext(ExpenseContext)

    const formSubmitHandler = (e) =>{
        e.preventDefault();

        const expense = e.target.expense.value;
        const description = e.target.description.value;
        const expense_type = e.target.expense_type.value;
        // console.log(expense,description, expense_type)

        Ctx.addExpense({expense,description,type:expense_type})

    }

    
    return <Stack direction="horizontal">

        <ShowExpenseList styling={ styling} />

        <InputModal style={styling}>
            <Form onSubmit={formSubmitHandler}>
                <Stack gap={2} >
                    <Form.Control
                        type='text'
                        name="expense"
                        placeholder="Enter your Expense"
                    />
                    <Form.Control
                        type='text'
                        name='description'
                        placeholder="Enter Description"
                    />
                    <Form.Select aria-label="Default select example" name='expense_type'>
                        {/* <option>Open this select menu</option> */}
                        <option value="Food">Food</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Travel">Travel</option>
                        <option value="Other">Other</option>
                    </Form.Select>

                    <Button type='submit' variant='primary'>Submit</Button>
                </Stack>
                
            </Form>
        </InputModal>

    </Stack>
}

export default AddExpenses;