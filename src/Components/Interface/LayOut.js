import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { Nav, Navbar, Stack, NavDropdown, Button } from "react-bootstrap";
import userInterface from '../../assets/userInterface_bg.png';
import Profile from "../UserProfile/Profile";

import UserAuth from '../Authentication/UserAuth';
import ProfileStatus from '../UserProfile/ProfileUpdate';
import LoginStatus from '../Authentication/LoginStatus';
import AddExpenses from '../Expenses/AddExpenses';

import { useSelector } from 'react-redux';

const layOutStyle = {
    backgroundImage: `url(${userInterface})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
}

const LayOut = () => {

    const auth = useSelector((state) => state.auth.auth)
    const user = useSelector((state) => state.auth.user)

    // console.log(totalExpenses)

    // console.log(AuthCtx)

    return (
        <BrowserRouter>
            <div style={layOutStyle}>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className='ps-2 pe-2'>
                    <Navbar.Brand >Expense Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {
                                auth.isLogin && <><Nav.Link as={Link} to='/user_profile' >Profile</Nav.Link>
                                    <Nav.Link as={Link} to='/add_expenses' >Add Expense</Nav.Link>
                                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Separated link
                                        </NavDropdown.Item>
                                    </NavDropdown> </>
                            }
                        </Nav>
                        <Nav>
                            <Stack direction='horizontal' gap={3}>
                                {auth.isLogin && !auth.isProfileCompleted && <Profile />}
                                { user.isPremiumUser && <Button>Premium</Button>}
                                <LoginStatus />
                            </Stack>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Routes>
                    <Route path='/authentication/:auth' element={<UserAuth />}></Route>
                    <Route path='/user_profile' element={<ProfileStatus />} />
                    <Route path='/add_expenses' element={<AddExpenses />} />
                </Routes>
            </div>
        </BrowserRouter>
    )

}

export default LayOut;