import { useState, useReducer, useEffect } from 'react';
import { FloatingLabel, Form, Stack, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Store/Redux_store/authReducer';

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

    const params = useParams();
    // console.log(params)

    const [onStarting, setOnStarting] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.auth);
    console.log(auth)

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

        try {
            if (isFormValid) {
                console.log(email.value, password.value)

                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`, {
                    email: email.value,
                    password: password.value
                })
                console.log(response);

                window.alert('user successfully logged in ');

                dispatch(authActions.userLoggedIn({
                    token: response.data.idToken,
                    name: response.data.displayName ? response.data.displayName : '',
                    userId: response.data.localId
                }))

                // AuthCtx.userLoggedIn({
                //     from: 'LOGIN_MODULE',
                //     name: response.data.displayName,
                //     token: response.data.idToken,
                //     userId: response.data.localId,
                // });

                navigation('/');

                // clearing the value form form and state objects as well
                dispatchEmail({ val: '', from: 'SUBMIT_HANDLER' });
                dispatchPassword({ val: '', from: 'SUBMIT_HANDLER' });

                // return to original form states
                setIsFormValid(false);
                setOnStarting(true);

                e.target.email.value = '';
                e.target.password.value = '';

            }
        } catch (err) {
            console.log(err);
            window.alert(err.response.data.error.message);
        }
    }

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();
        console.log('forgot submited')
        setOnStarting(false);
        try {
            if (email.isValid) {
                // console.log(email.value)

                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`, {
                    requestType: 'PASSWORD_RESET',
                    email: email.value
                })

                console.log(response);

                window.alert('successfully sent password recovery mail')

                dispatchEmail({ val: '', from: 'SUBMIT_HANDLER' });
                setOnStarting(true);
                e.target.email.value = '';
            }
        }
        catch (err) {
            console.log(err)
            window.alert('something went wrong')
        }
    }

    const forgotPasswordRedirection = () => {
        navigation('/authentication/forgot_password')
    }

    return (
        <>
            <Stack className='m-auto'>
                <h2 className='text-centered'>{params.auth === 'sign_in' ? 'SignIn' : 'Forgot Password'}</h2>
            </Stack>

            <Form noValidate onSubmit={params.auth === 'sign_in' ? submitHandler : forgotPasswordHandler}>
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
                    {
                        params.auth === 'sign_in' && <>
                            <FloatingLabel controlId="password" label="Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={passwordHandler}
                                    isInvalid={onStarting ? !onStarting : !password.isValid}
                                />
                                <Form.Control.Feedback type="invalid" >{password.msg}</Form.Control.Feedback>
                            </FloatingLabel>
                            <div>
                                <p style={{ textAlign: 'end', cursor: 'pointer', color: 'firebrick' }}
                                    onClick={forgotPasswordRedirection}
                                >forgot password?</p>
                            </div>
                        </>
                    }

                    <Button type='submit' variant='primary'>Submit</Button>
                </Stack>
            </Form>
            {
                params.auth === 'sign_in' && <Link to={'/authentication/sign_up'}>
                    <Button type='button' variant='outline-secondary' className='mt-3' style={{ width: '100%' }}>
                        Don't have an account? Sign up
                    </Button>
                </Link>
            }
        </>

    )
}

export default SignIn;