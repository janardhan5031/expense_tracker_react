import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('userAuth'));
// console.log('====> ', user)
const initialState = {
    auth: {
        isLogin: user ? true : false,
        isProfileCompleted: user && user.name ? true : false,
        token: user ? user.token : '',
    },
    user: {
        userId: user ? user.userId : '',
        name: user ? user.name : '',
        email: user ? user.email : '',
        profilePicture: user ? user.profilePicture : '',
        isPremiumUser:false
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn(state, actions) {

            // set authentication data in store
            state.auth = {
                isLogin: true,
                token: actions.payload.token,
                isProfileCompleted: actions.payload.name ? true : false
            }

            // set user data in store
            state.user = {
                ...state.user,
                userId: actions.payload.userId,
                name: actions.payload.name
            }

            localStorage.setItem('userAuth', JSON.stringify({ ...actions.payload, isLogin: true }))

        },
        userLoggedOut(state) {

            state.auth = { isLogin: false, token: "", isProfileCompleted: false }
            state.user = { userId: '', name: '', profilePicture: '', email: '', isPremiumUser:false }

            localStorage.removeItem('userAuth');

        },
        setUserDetails(state, actions) {
            state.auth = {
                ...state.auth,
                isProfileCompleted: actions.payload.name ? true : false
            }

            state.user = {
                ...state.user,...actions.payload 
            }

            localStorage.setItem('userAuth', JSON.stringify({
                ...state.auth,
                isProfileCompleted: actions.payload.name ? true : false,
                ...state.user,
                name: actions.payload.name,
                email: actions.payload.email,
                profilePicture: actions.payload.profilePicture
            }))
        },
        updateUserDetails(state, actions) {
            // state.auth = state.auth
            state.user = {
                ...actions.payload
            }

            localStorage.setItem('userAuth', JSON.stringify({
                ...state.auth,
                ...state.user, ...actions.payload
            }))
        },
        updateUserStatus(status) {
            status.user.isPremiumUser = true;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer