import { useParams } from 'react-router-dom';
import { Stack } from 'react-bootstrap';

import classes from './UserAuth.module.css';

import Login_bg from '../../assets/login_bg.png';
import SignUp from './SignUp';
import SignIn from './SignIn';

const myStyle = {
    backgroundImage: `url(${Login_bg})`,
    height: '100vh',
    backgroundSize: 'cover',
}

const UserAuth = () => {

    const params = useParams();

    return <Stack style={myStyle}>
        <div className={classes.container}>
            { params.auth === 'sign_in' && <SignIn /> }
            { params.auth ==='sign_up' && <SignUp /> }
        </div>
    </Stack>

}

export default UserAuth;