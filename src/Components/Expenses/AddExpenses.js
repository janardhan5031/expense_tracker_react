import { Form, Button, Stack } from "react-bootstrap";
import InputModal from "../Store/UI/InputModal";
import ShowExpenseList from "./showExpenseList";

import { useContext , useState} from 'react';
import ExpenseContext from '../Store/ExpenseContext/ExpenseContext';

const styling = {
    postion: 'relative',
    width: '100%',
    padding: '1rem',
    margin:' 2rem 1rem'
}

const AddExpenses = () => {

    const [updateExp, setUpdateExp] = useState({isUpdate:false, id:undefined});
    const [formValues, setFormValues] = useState({ expense: '', description: '' });

    const Ctx = useContext(ExpenseContext)

    const updateExpOnclick = (id)=>{
        setUpdateExp({isUpdate:true,id});

        const filteredExp = Ctx.expenseList.filter((exp) => {
            return id== exp.id
        })
        setFormValues(filteredExp[0])

    }

    function expenseChangeHandler(e) {
        setFormValues((prev) => {
            return {...prev, expense:e.target.value}
        })
    }
    function descriptionChangeHandler(e) {
        setFormValues((prev) => {
            return {...prev, description:e.target.value}
        })
    }

    const formSubmitHandler = (e) =>{
        e.preventDefault();

        const expense = e.target.expense.value;
        const description = e.target.description.value;
        const expense_type = e.target.expense_type.value;
        // console.log(expense,description, expense_type)
        
        if (updateExp.isUpdate) {
            
            // console.log('updated expense')

            Ctx.updateExpense(updateExp.id, {expense,description, expense_type})

            setUpdateExp((curr) => {
                return { isUpdate: !curr.isUpdate, id: undefined }
            })
        } else {
            Ctx.addExpense({ expense, description, type: expense_type })
            
        }

        setFormValues({expense:'',description:''})    

    }

    
    return <Stack direction="horizontal">

        <ShowExpenseList styling={ styling} updateExpOnclick={updateExpOnclick} />

        <InputModal style={styling}>
            <Form onSubmit={formSubmitHandler}>
                <Stack gap={2} >
                    <Form.Control
                        value={formValues.expense}
                        type='text'
                        name="expense"
                        placeholder="Enter your Expense"
                        onChange={expenseChangeHandler}
                    />  
                    <Form.Control
                        value={formValues.description}
                        type='text'
                        name='description'
                        placeholder="Enter Description"
                        onChange={descriptionChangeHandler}
                    />
                    <Form.Select aria-label="Default select example" name='expense_type'>
                        {/* <option>Open this select menu</option> */}
                        <option value="Food">Food</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Travel">Travel</option>
                        <option value="Other">Other</option>
                    </Form.Select>

                    <Button type='submit' variant='primary'>{ updateExp.isUpdate? 'Update' : 'Add'}</Button>
                </Stack>
                
            </Form>
        </InputModal>

    </Stack>
}

export default AddExpenses;