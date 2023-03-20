
import { Link } from 'react-router-dom';
import { Container, Nav, Stack } from "react-bootstrap";

import classes from './profile.module.css';

const Profile = () => {

    return (<>
        <Container className={classes.container_btn}>
            <Stack direction='horizontal'>
                <p style={{ color: 'white', textAlign: 'center', margin: '0' }}>Your profile is incomplete. </p>
                <Nav.Link as={Link} to='/user_profile' className='profile_btn ps-1'>Complete Now</Nav.Link>
            </Stack>
        </Container>
    </>
    )
}

export default Profile;