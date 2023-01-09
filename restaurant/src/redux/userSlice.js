
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase.config';

const firebaseAuth = getAuth(app)
const provider = new GoogleAuthProvider();

/**
 if localstorege already have
 */
const getUserFromLocalStorege = JSON.parse(localStorage.getItem("user"))
// console.log(getUserFromLocalStorege)

const initialState = { 
    img : "",
    email : "",
    name : "",
    token : "",
    uid : "",
    ...getUserFromLocalStorege
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: { 
        setLoginGoogle : (state,action)=>{
            console.log(action)
            state.name = action.payload.name
            state.img  = action.payload.img
            state.email = action.payload.email
            state.name = action.payload.name
            state.uid = action.payload.uid
            state.token = action.payload.token
        }
    },
    
})

export const  { setLoginGoogle } = userSlice.actions

export  default userSlice.reducer