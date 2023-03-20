import { useState, useReducer, useEffect } from 'react';
import { FloatingLabel, Form, Stack, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function emailReducerFn(prev, curr) {
    const email = curr.val.trim();

    if (curr.from === 'SUBMIT_HANDLER') {
        return { value: '', isValid: false, msg: 'required' }
    }
    if (email.includes('@') && email.includes('.com')) {
        return { value: email, isValid: true }
    }
    else return { value: email, isValid: false, msg: 'please provide correct email address' }
}

function passwordReducer(prev, curr) {
    const password = curr.val.trim();
    if (curr.from === 'SUBMIT_HANDLER') {
        return { value: '', isValid: false, msg: 'required' }
    }
    if (password.length > 6 && password.includes('@')) {
        return { value: password, isValid: true }
    }
    return { value: password, isValid: false, msg: 'must be include \'@\' & atleast 6 charectors' }
}

const SignUp = () => {

    console.log('sign up page')

    const [email, dispatchEmail] = useReducer(emailReducerFn, { value: '', msg: 'please provide correct email address', isValid: false });
    const [password, dispatchPassword] = useReducer(passwordReducer, { value: '', msg: 'must be include \'@\' & atleast 6 charectors', isValid: false });
    const [confirmPassword, dispatchConfirmPassword] = useReducer(passwordReducer, { value: '', msg: 'must be include \'@\' & atleast 6 charectors', isValid: false });

    const [onStarting, setOnStarting] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (email.isValid && password.isValid && confirmPassword.isValid && password.value === confirmPassword.value) {
            setIsFormValid(true)
        }
    }, [email, password, confirmPassword])

    function emailHandler(e) {
        dispatchEmail({ val: e.target.value, from: '' })
    }
    function passwordHandler(e) {
        dispatchPassword({ val: e.target.value, from: '' })
    }
    function confirmPasswordHandler(e) {
        dispatchConfirmPassword({ val: e.target.value, from: '' })
    }

    async function submitHandler(e) {
        e.preventDefault();
        setOnStarting(false);

        if (isFormValid) {
            console.log(email.value, password.value, confirmPassword.value)

            try {
                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`, {
                    email: email.value,
                    password: password.value
                })
                // console.log(response);

                window.alert('user successfully signed up ');

                // clearing the value form form and state objects as well
                dispatchEmail({ val: '', from: 'SUBMIT_HANDLER' });
                dispatchPassword({ val: '', from: 'SUBMIT_HANDLER' });
                dispatchConfirmPassword({ val: '', from: 'SUBMIT_HANDLER' });

                setIsFormValid(false);
                setOnStarting(true);

                e.target.email.value = '';
                e.target.password.value = '';
                e.target.confirmPassword.value = '';
            } catch (err) {
                console.log(err);
                window.alert(err.response.data.error.message);
            }

        }
        else if (password.value !== confirmPassword.value) {
            window.alert('password and confirm password must be matched')
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
                            isInvalid={onStarting ? !onStarting : !email.isValid}
                        />
                        <Form.Control.Feedback type="invalid" >{email.msg}</Form.Control.Feedback>

                    </FloatingLabel>

                    <FloatingLabel controlId="password" label="Password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={passwordHandler}
                            isInvalid={onStarting ? !onStarting : !password.isValid}
                        />
                        <Form.Control.Feedback type="invalid" >{password.msg}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="confirmPassword" label="Confirm Password">
                        <Form.Control
                            type="password"
                            placeholder="confirmPassword"
                            onChange={confirmPasswordHandler}
                            isInvalid={onStarting ? !onStarting : !confirmPassword.isValid}
                        />
                        <Form.Control.Feedback type="invalid" >{confirmPassword.msg}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button type='submit' variant='primary'>Submit</Button>
                </Stack>
            </Form>


            <Link to={'/authentication/sign_in'} className='m-0 p-0'>
                <Button type='button' variant='outline-secondary' className='mt-3' style={{width:'100%'}}>Have an account? Login</Button>
            </Link>

        </>

    )
}

export default SignUp;