
import react from 'react';


const context = {
    isLogin: false,
    isProfileCompleted:false,
    token: '',
    userId:'',
    name: '',
    email: '',
    profilePicture: '',
    userLoggedIn : (token, userId) => { },
    userLoggedOut: () => { },
    update_user_profile:(data)=>{}
}

const AuthContext = react.createContext(context);

export default AuthContext;