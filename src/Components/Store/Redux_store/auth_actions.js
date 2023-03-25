import { authActions } from "./authReducer";

import axios from "axios";


export const getUserDetails = (auth) => {
    return async (dispatch) => {

        const getData = async () => {
            try{
                const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`, {
                  idToken: auth.token
                });
                return response.data.users[0]

            } catch (err) {
                console.log(err)
            }
        }

        const user = await getData();

        dispatch(authActions.setUserDetails({
          userId: user.localId,
          name: user.displayName ? user.displayName : '',
          email: user.email ? user.email : '',
          profilePicture: user.photoUrl ? user.photoUrl : ''
        }))

        // if (auth.token) {
        //     try {
        //       console.log(response.data.users[0]);
      
        //       const user = response.data.users[0];
      
      
        //     } catch (err) {
        //       console.log(err)
        //     }
      
        //   }
    }
}