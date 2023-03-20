import { useParams } from 'react-router-dom';
import { Stack } from 'react-bootstrap';

import Login_bg from '../../assets/login_bg.png';
import SignUp from './SignUp';
import SignIn from './SignIn';
import InputModal from '../Store/UI/InputModal';

const myStyle = {
    backgroundImage: `url(${Login_bg})`,
    height: '100vh',
    backgroundSize: 'cover',
}

const UserAuth = () => {

    const params = useParams();

    return <Stack style={myStyle}>
        <InputModal>
            {params.auth === 'sign_in' && <SignIn />}
            {params.auth === 'forgot_password' && <SignIn />}
            {params.auth === 'sign_up' && <SignUp />}
        </InputModal>
    </Stack>

}

export default UserAuth;