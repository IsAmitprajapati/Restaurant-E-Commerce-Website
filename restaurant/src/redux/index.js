import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import productItemReducer from "./productSlice"
import cartProductReducer from "./cartSlice"

export default configureStore({
    reducer : {
        user : userReducer,
        productItem : productItemReducer,
        cartProduct : cartProductReducer   
    }
})