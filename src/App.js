import LayOut from './Components/Interface/LayOut';

import AuthContextProvider from './Components/Store/AuthContext/AuthCtxProvider';
import ExpenseContextProvider from './Components/Store/ExpenseContext/ExpenseCtxProvider';

function App() {

  return (<>
    <AuthContextProvider>
      <ExpenseContextProvider>
        <LayOut />
      </ExpenseContextProvider>
    </AuthContextProvider>
  </>
  );
}

export default App;
