import { useReducer, useState, useEffect,useContext } from "react";

import axios from 'axios';

import './ProfileUpdate.css';

import InputModal from "../Store/UI/InputModal";
import { Form, Stack, Button, FloatingLabel } from 'react-bootstrap';
import AuthContext from "../Store/AuthContext/AuthContext";

const nameReducer = (prev, curr) => {
    const name = curr.val.trim();
    if (curr.from === 'SUBMIT_HANDLER') {
        return { value: '', isValid: false };
    }
    else if (name.length > 3) {
        return { value: name, isValid: true }
    }
    else return { value: name, isValid: false };
}
const photoReducer = (prev, curr) => {
    const photoURL = curr.val.trim();
    if (curr.from === 'SUBMIT_HANDLER') {
        return { value: '', isValid: false };
    }
    else if (photoURL.length > 6) {
        return { value: photoURL, isValid: true }
    }
    else return { value: photoURL, isValid: false }

}

const ProfileStatus = () => {
    const AuthCtx = useContext(AuthContext)

    const [name, dispatchName] = useReducer(nameReducer, { value: AuthCtx.name, isValid: true });
    const [photoURL, dispatchPhotoURL] = useReducer(photoReducer, { value: AuthCtx.profilePicture, isValid: true });

    const [isFromValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (name.isValid && photoURL.isValid) {
            setIsFormValid(true);
        }
    }, [name, photoURL])

    function nameHandler(e) {
        // console.log(e.target.value)
        dispatchName({ val: e.target.value, from: '' });
    }
    function photoUrlHandler(e) {
        dispatchPhotoURL({ val: e.target.value, from: '' });
    }

    async function verifyEmailHandler(e) {
        console.log('email handler clicked')
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`, {
                idToken: AuthCtx.token,
                requestType:'VERIFY_EMAIL'
            })
    
            console.log(response)
            window.alert('please check your mail to verify')
            
        } catch (err) {
            console.log(err)
            window.alert('something went wrong')
        }
    }

    async function submitHandler(e) {
        e.preventDefault();
        // console.log('jansdfsj')

        if (name.isValid && photoURL.isValid && isFromValid) {
            // console.log(name.value, photoURL.value, isFromValid);

            // console.log(AuthCtx.token);
            // sending the request to server (firebase server)
            try {
                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`, {
                    idToken:AuthCtx.token,
                    displayName: name.value,
                    photoUrl: photoURL.value,
                    returnSecureToken:true
                });

                // console.log(response.data);

                AuthCtx.update_user_profile({
                    from:'UPDATE_MODULE',
                    userId: response.data.localId,
                    name: response.data.displayName,
                    profilePicture: response.data.photoUrl,
                    email: response.data.email
                });

                // restoring the states to back
                dispatchName({ val: '', from: 'SUBMIT_HANDLER' });
                dispatchPhotoURL({ val: '', from: 'SUBMIT_HANDLER' });
                setIsFormValid(false);

                // restoring the form back original
                e.target.name.value = '';
                e.target.photoUrl.value = '';

                window.alert('successfully updated the profile')

            }
            catch (err) {
                console.log(err);
                window.alert(err.response.data.error.message)
            }
        } else {
            window.alert('please enter the currect values')
        }

    }

    return (<Stack direction='horizontal' className='m-auto' style={{display:'flex', padding:'0 2%'}}>

        {/* <div className='user_profile_container'>
        </div> */}
        <InputModal>
            <div className="profile_pic">
                <img src="https://wallpapers.com/images/featured/i0gxj0j9def43771.jpg" alt="profile_pic"></img>
            </div>
            <div><h4>{AuthCtx.name}</h4></div>
            <div className='modal_card' >
                <p>{AuthCtx.email}</p>
                <Button variant='primary' onClick={verifyEmailHandler}>Verify Email</Button>
            </div>
        </InputModal>

        <InputModal >
            <Stack className='m-auto'>
                <h2 className='text-centered'>Update Profile</h2>
            </Stack>

            <Form noValidate onSubmit={submitHandler}>
                <Stack gap={2}>
                    <FloatingLabel controlId="name" label="Your Name">
                        <Form.Control
                            type="text"
                            placeholder="Your Name"
                            value={name.value}
                            onChange={nameHandler}
                        // isInvalid={onStarting ? !onStarting : !email.isValid}
                        />
                        {/* <Form.Control.Feedback type="invalid" >{email.msg}</Form.Control.Feedback> */}

                    </FloatingLabel>

                    <FloatingLabel controlId="photoUrl" label="Enter your Photo URL">
                        <Form.Control
                            type="text"
                            value={photoURL.value}
                            placeholder="photo url"
                            onChange={photoUrlHandler}
                        // isInvalid={onStarting ? !onStarting : !password.isValid}
                        />
                        {/* <Form.Control.Feedback type="invalid" >{password.msg}</Form.Control.Feedback> */}
                    </FloatingLabel>

                    <Button type='submit' variant='primary'>Submit</Button>
                </Stack>
            </Form>
        </InputModal>
    </Stack>
    )

}

export default ProfileStatus;