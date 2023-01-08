
import react from 'react';


const context = {
    token: '',
    isLogin: false,
    userId:'',
    userLoggedIn : (token, userId) => { },
    userLoggedOut : ()=>{}
}

const AuthContext = react.createContext(context);

export default AuthContext;