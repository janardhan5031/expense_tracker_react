import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Store/Redux_store/authReducer";

const LoginStatus = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.auth);

    const navigation = useNavigate();

    function SignInHandler(e) {
        navigation('/authentication/sign_in')
    }
    function SignOutHandler(e) {    
        dispatch(authActions.userLoggedOut())
        navigation('/authentication/sign_in')
    }

    // console.log('login status ==> ', AuthCtx.isLogin)

    return (<>
        {auth.isLogin && <Button
            type='button'
            variant='primary'
            onClick ={SignOutHandler}
            style={{ width: '7rem' }}>Sign Out
        </Button>}
        {!auth.isLogin && <Button
            type='button'
            variant='primary'
            onClick={SignInHandler}
            style={{ width: '7rem' }}>Sign In
        </Button>}
    </>
    )
}

export default LoginStatus;