import { useState, useReducer, useEffect, useContext } from 'react';
import { FloatingLabel, Form, Stack, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../Store/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

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

const SignIn = () => {
    const [email, dispatchEmail] = useReducer(emailReducerFn, { value: '', msg: 'please provide correct email address', isValid: false });
    const [password, dispatchPassword] = useReducer(passwordReducer, { value: '', msg: 'must be include \'@\' & atleast 6 charectors', isValid: false });

    const [onStarting, setOnStarting] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    const AuthCtx = useContext(AuthContext);

    const navigation = useNavigate();

    useEffect(() => {
        if (email.isValid && password.isValid) {
            setIsFormValid(true)
        }
    }, [email, password])

    function emailHandler(e) {
        dispatchEmail({ val: e.target.value, from: '' })
    }
    function passwordHandler(e) {
        dispatchPassword({ val: e.target.value, from: '' })
    }

    async function submitHandler(e) {
        e.preventDefault();
        setOnStarting(false);

        if (isFormValid) {
            console.log(email.value, password.value)

            try {
                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`, {
                    email: email.value,
                    password: password.value
                })
                console.log(response);

                window.alert('user successfully logged in ');

                AuthCtx.userLoggedIn({
                    from: 'LOGIN_MODULE',
                    name:response.data.displayName,
                    token: response.data.idToken,
                    userId: response.data.localId,
                });

                navigation('/');

                // clearing the value form form and state objects as well
                dispatchEmail({ val: '', from: 'SUBMIT_HANDLER' });
                dispatchPassword({ val: '', from: 'SUBMIT_HANDLER' });

                // return to original form states
                setIsFormValid(false);
                setOnStarting(true);

                e.target.email.value = '';
                e.target.password.value = '';

            } catch (err) {
                console.log(err);
                window.alert(err.response.data.error.message);
            }

        }

    }

    return (
        <>
            <Stack className='m-auto'>
                <h2 className='text-centered'>SignIn</h2>
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

                    <Button type='submit' variant='primary'>Submit</Button>
                </Stack>
            </Form>

            <Link to={'/authentication/sign_up'}>
                <Button type='button' variant='outline-secondary' className='mt-3' style={{width:'100%'}}>
                    Don't have an account? Sign up
                </Button>
            </Link>
        </>

    )
}

export default SignIn;