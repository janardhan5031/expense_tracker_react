import { Form, Button, Stack } from "react-bootstrap";
import InputModal from "../Store/UI/InputModal";
import ShowExpenseList from "./showExpenseList";

import { useState } from 'react';
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/Redux_store/expenseReducer";

const styling = {
    postion: 'relative',
    width: '100%',
    padding: '1rem',
    margin:' 2rem 1rem'
}

const AddExpenses = () => {

    const [updateExp, setUpdateExp] = useState({isUpdate:false, id:undefined});
    const [formValues, setFormValues] = useState({ expense: '', description: '' });

    const expenseList = useSelector((state) => state.expense.expenseList);

    const dispatch = useDispatch();

    const updateExpOnclick = (id)=>{
        setUpdateExp({isUpdate:true,id});

        const filteredExp = expenseList.filter((exp) => {
            return Number(id)=== exp.id
        })
        setFormValues({expense:filteredExp[0].expense, description:filteredExp[0].description})
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

    const formSubmitHandler = async (e) =>{
        e.preventDefault();

        const expense = Number(e.target.expense.value);
        const description = e.target.description.value;
        const expense_type = e.target.expense_type.value;
        // console.log(expense,description, expense_type)
        
        if (updateExp.isUpdate) {
            
            // console.log('updated expense')
            try {
                
                const key = expenseList.filter((exp) => exp.id === updateExp.id)[0].key;
                    
                const response = await axios.patch(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses/${key}.json`, {
                    expense, description, type:expense_type
                })

                // console.log(response)    
                if (response.status === 200) {
                    dispatch(expenseActions.updateExpense({key, expense, description, type:expense_type}))
                }

            }catch(err){    
                console.log(err)
            }

            setUpdateExp((curr) => {
                return { isUpdate: !curr.isUpdate, id: undefined }
            })
        } else {
            try {
                const response = await axios.post(`https://expense-tracker-ee313-default-rtdb.firebaseio.com/expenses.json`, {
                    expense, description, type: expense_type, id: Date.now()
                })
                // console.log(response);
    
                dispatch(expenseActions.addExpense([{ expense, description, type: expense_type, id:Date.now(), key:response.data.name }]))
                
            } catch (err) {
                console.log(err)
            }            
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
                        type='number'
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