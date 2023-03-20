import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext/AuthContext";

const LoginStatus = () => {
    const AuthCtx = useContext(AuthContext);
    const navigation = useNavigate();

    function SignInHandler(e) {
        navigation('/authentication/sign_in')
    }
    function SignOutHandler(e) {    
        AuthCtx.userLoggedOut();
        navigation('/');
    }

    // console.log('login status ==> ', AuthCtx.isLogin)

    return (<>
        {AuthCtx.isLogin && <Button
            type='button'
            variant='primary'
            onClick ={SignOutHandler}
            style={{ width: '7rem' }}>Sign Out
        </Button>}
        {!AuthCtx.isLogin && <Button
            type='button'
            variant='primary'
            onClick={SignInHandler}
            style={{ width: '7rem' }}>Sign In
        </Button>}
    </>
    )
}

export default LoginStatus;