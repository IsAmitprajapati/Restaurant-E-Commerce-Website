import { createSlice } from "@reduxjs/toolkit";


const initialState  = {
        productItem : [],
        productLoading : true,
}

export const productSlice = createSlice({
    name : "productItem",
    initialState,
    reducers : {
            setProductItem : (state,action)=>{
                    state.productLoading = true
                    state.productItem = action.payload
                    state.productLoading = false
            }
    }
})

export const  {setProductItem} = productSlice.actions

export default productSlice.reducer