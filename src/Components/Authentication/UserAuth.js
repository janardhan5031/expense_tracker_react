
import { Stack } from 'react-bootstrap';

import SignUp from './SignUp'
import Login_bg from '../../assets/login_bg.png';

import classes from './UserAuth.module.css';
const myStyle = {
    backgroundImage: `url(${Login_bg})`,
    height: '100vh',
    backgroundSize: 'cover',
}

const UserAuth = () => {


    return <Stack style={myStyle}>
        <div className={classes.container}>
            <SignUp />
        </div>
    </Stack>

}

export default UserAuth;