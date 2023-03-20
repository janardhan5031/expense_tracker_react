import { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const result = JSON.parse(localStorage.getItem('userCredentials'));
// console.log('==> localstorage', result)
const initalValue = result ? {
    isLogin: result ? true : false,
    isProfileCompleted: result.isProfileCompleted ? true : false,
    userId: result.token,
    token: result.token,
    email: result.email,
    name: result.name ? result.name : '',
    profilePicture: result.name ? result.profilePicture : ''
} : {
    isLogin: false,
    isProfileCompleted: false,
    userId: '',
    token: '',
    email: '',
    name: '',
    profilePicture: ''
}

const userCtxReducer = (prev, curr) => {
    if (curr.from === 'LOGIN_MODULE') {
        return { ...prev, isLogin: true, isProfileCompleted: false, token: curr.token, useId: curr.userId };
    }
    else if (curr.from === 'LOGOUT') {
        return { isLogin: false, isProfileCompleted: false, token: '', userId: '', email: '', name: '', profilePicture: '' };
    }
    else if (curr.from === 'AUTH_CTX') {
        return { ...prev, email: curr.email, name: curr.name, profilePicture: curr.profilePicture}
    } else {
        return {...prev,name:curr.name, profilePicture:curr.profilePicture, isProfileCompleted:true}
    }
}

const AuthContextProvider = (props) => {

    const [userCtx, setUserCtx] = useReducer(userCtxReducer, initalValue);

    useEffect(() => {
        (async () => {
            if (userCtx.token) {
                try {
                    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`, {
                        idToken: userCtx.token
                    });
                    console.log(response.data.users[0]);
                    const data = response.data.users[0];

                    localStorage.setItem('userCredentials', JSON.stringify({
                        isLogin:true,
                        isProfileCompleted: data.displayName ? true : false,
                        token: userCtx.token,
                        userId:data.localId,
                        name: data.displayName,
                        email: data.email,
                        profilePicture: data.photoUrl
                    }));
                    setUserCtx({ from: 'AUTH_CTX', email: data.email, name: data.displayName, profilePicture: data.photoUrl });
                }
                catch (err) {
                    console.log(err)
                }
            }
        })()
    }, [userCtx.token])

    const userLoggedIn = (response) => {

        // when user gets logged in , store the details in local storage
        localStorage.setItem("userCredentials", JSON.stringify(response));

        setUserCtx(response);
    }

    const update_user_profile = (data) => {
        console.log(data)
        localStorage.setItem('userCredentials', JSON.stringify({ ...userCtx, name: data.name, profilePicture: data.profilePicture }))
        
        setUserCtx({from:'UPDATE_PROFILE',...userCtx,name:data.name, profilePicture:data.profilePicture})
    }

    const userLoggedOut = () => {
        // when user gets logged out, remove the userCredentials object from localStorage
        localStorage.removeItem('userCredentials');

        setUserCtx({ name: null, from: 'LOGOUT' });
    }

    const context = {
        ...userCtx,
        userLoggedIn: userLoggedIn,
        userLoggedOut: userLoggedOut,
        update_user_profile
    }

    return <AuthContext.Provider value={context}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthContextProvider;