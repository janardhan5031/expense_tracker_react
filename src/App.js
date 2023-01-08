import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';

import UserAuth from './Components/Authentication/UserAuth';
import AuthContext from './Components/Store/AuthContext/AuthContext';
import AuthContextProvider from './Components/Store/AuthContext/AuthCtxProvider';

function App() {
  const AuthCtx = useContext(AuthContext);

  console.log(AuthCtx.token, AuthCtx.isLogin, AuthCtx.userId);

  return (<>
    <AuthContextProvider>
      <BrowserRouter>
          
        <Routes>
          <Route path='/authentication/:auth' element={<UserAuth />}></Route>
        </Routes>
      </BrowserRouter>

    </AuthContextProvider>
  </>
  );
}

export default App;
