import { useState, useReducer, useEffect } from 'react';
import { FloatingLabel, Form, Stack, Button } from 'react-bootstrap';

function emailReducerFn(prev, curr) {
    const email = curr.val.trim();

    if (curr.from === 'SUBMIT_HANDLER') {
        return {value:'',isValid:false,msg:''}
    }
    if (email.includes('@') && email.includes('.com')) {
        return { value: email, isValid: true }
    }
    else return { value: email, isValid: false,msg:'please provide corect email address' }
}

function passwordReducer(prev, curr) {
    const password = curr.val.trim();
    if (curr.from === 'SUBMIT_HANDLER') {
        return {value:'',isValid:false,msg:''}
    }
    if (password.length > 6 && password.includes('@')) {
        return { value: password, isValid: true }
    }
    return { value: password, isValid: false, msg:'must be include \'@\' & atleast 6 charectors' }
}

const SignUp = () => {
    const [email, dispatchEmail] = useReducer(emailReducerFn, { value: '', isValid: false });
    const [password, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: false });
    const [confirmPassword, dispatchConfirmPassword] = useReducer(passwordReducer, { value: '', isValid: false });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (email.isValid && password.isValid && confirmPassword.isValid && password.value === confirmPassword.value) {
            setIsFormValid(true)
        }
    }, [email, password, confirmPassword])

    function emailHandler(e) {
        dispatchEmail({ val: e.target.value,from:'' })
    }
    function passwordHandler(e) {
        dispatchPassword({ val: e.target.value ,from:''})
    }
    function confirmPasswordHandler(e) {
        dispatchConfirmPassword({ val: e.target.value,from:'' })
    }

    function submitHandler(e) {
        e.preventDefault();

        
        if (isFormValid) {
            console.log(email.value, password.value, confirmPassword.value)
            
            dispatchEmail({ val: '',from:'SUBMIT_HANDLER' });
            dispatchPassword({ val: '',from:'SUBMIT_HANDLER' });
            dispatchConfirmPassword({ val: '', from: 'SUBMIT_HANDLER' });
            setIsFormValid(false);

            e.target.email.value = '';
            e.target.password.value = '';
            e.target.confirmPassword.value = '';
        }
         else if (password.value !== confirmPassword.value) {
            window.alert('password and confirm password must be matched')
        } else {
            window.alert('please provide all fields')
        }


    }

    return (
        <>
            <Stack className='m-auto'>
                <h2 className='text-centered'>SignUp</h2>
            </Stack>

            <Form noValidate onSubmit={submitHandler}>
                <Stack gap={2}>
                    <FloatingLabel controlId="email" label="Email address">
                        <Form.Control
                            type="email"
                            placeholder="email"
                            onChange={emailHandler}
                            isInvalid={!email.isValid}
                        />
                        <Form.Control.Feedback type="invalid" >{ email.msg}</Form.Control.Feedback>

                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={passwordHandler}
                            isInvalid={!password.isValid}
                        />
                        <Form.Control.Feedback type="invalid" >{ password.msg}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="confirmPassword" label="Confirm Password">
                        <Form.Control
                            type="password"
                            placeholder="confirmPassword"
                            onChange={confirmPasswordHandler}
                            isInvalid={!confirmPassword.isValid}
                        />
                        <Form.Control.Feedback type="invalid" >{ confirmPassword.msg}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button type='submit' variant='primary'>Submit</Button>
                </Stack>
            </Form>

            <Button type='button' variant='outline-secondary' className='mt-3'>Have an account? Login</Button>
        </>

    )
}

export default SignUp;