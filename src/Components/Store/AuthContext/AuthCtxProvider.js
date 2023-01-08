import {useState} from 'react';
import AuthContext from './AuthContext';

const AuthContextProvider = (props) => {

    const [userCtx, setUserCtx] = useState({ token: '', isLogin: false, userId: '' });

    const userLoggedIn = (token, userId) => {
        setUserCtx({ token, isLogin: true, userId });     
    }
    const userLoggedOut = () => {
        setUserCtx({ token: '', isLogin: false, userId: '' });
    }

    const context = {
        ...userCtx,
        userLoggedIn: userLoggedIn,
        userLoggedOut:userLoggedOut
    }
    
    return <AuthContext.Provider value={context}>
        {props.children}
    </AuthContext.Provider>

}

export default AuthContextProvider;