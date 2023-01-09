import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProductItem: [],
  alert: "You Cart Empty",
  msg: "",
  loading: true,
};

export const cartProduct = createSlice({
  name: "cartProduct",
  initialState,
  reducers: {
    setCartProduct: (state, action) => {
      state.loading = true;
      state.cartProductItem = [
        ...state.cartProductItem,
        { ...action.payload, total: action.payload.qty * action.payload.price },
      ];
      state.msg = "Successfully product added !!";
      state.alert = true;
      state.loading = false;
    },
    incrementQtyProduct: (state, action) => {
      const index = state.cartProductItem.findIndex(
        (el) => el.id == action.payload
      );
   
      state.cartProductItem[index].qty += 1;
      state.cartProductItem[index].total =
        state.cartProductItem[index].qty * state.cartProductItem[index].price;
    },
    decrementQtyProduct: (state, action) => {
      const index = state.cartProductItem.findIndex(
        (el) => el.id == action.payload
      );
      
      if (state.cartProductItem[index].qty > 1) {
        state.cartProductItem[index].qty -= 1;
        state.cartProductItem[index].total =
          state.cartProductItem[index].qty * state.cartProductItem[index].price;
      }
    },
    deleteCartProduct : (state,action)=>{
        const index = state.cartProductItem.findIndex(
            (el) => el.id == action.payload
          );
          state.cartProductItem.splice(index,1)
    }
  },
});

export const { setCartProduct, incrementQtyProduct, decrementQtyProduct,deleteCartProduct } =
  cartProduct.actions;

export default cartProduct.reducer;
