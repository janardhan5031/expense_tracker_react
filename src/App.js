import LayOut from './Components/Interface/LayOut';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserDetails } from './Components/Store/Redux_store/auth_actions';
import { getUserExpenses } from './Components/Store/Redux_store/expense_actions';

import { authActions } from './Components/Store/Redux_store/authReducer';

let initialState = true;

function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth)
  const user = useSelector((state) => state.auth.user)
  const totalExpenses = useSelector(state => state.expense.totalExpenses);

  console.log(totalExpenses)

  console.log(user)

  useEffect(() => {
    
    if (totalExpenses >= 2000) {
      dispatch(authActions.updateUserStatus(true))
    } else {
      
      dispatch(authActions.updateUserStatus(false))
    }

  },[totalExpenses])

  useEffect(() => {

    if (auth.isLogin && initialState ) {

      dispatch(getUserDetails(auth))

      dispatch(getUserExpenses())

      initialState = false;
    }

  }, [ auth, dispatch])

  return (<>
    <LayOut />
  </>
  );
}

export default App;
