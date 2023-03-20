import LayOut from './Components/Interface/LayOut';

import AuthContextProvider from './Components/Store/AuthContext/AuthCtxProvider';

function App() {

  return (<>
    <AuthContextProvider>
      <LayOut />
    </AuthContextProvider>
  </>
  );
}

export default App;
