import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  quantity: number;
}

const initialState: CartState = {
  cart: [],
  quantity: 0,
};

const cartSystem = createSlice({
  name: "cart",
  initialState,
  reducers: {

    AddCart: (state, action) => {
      const find = state.cart.findIndex(item => item.id === action.payload.id)
      if (find >= 0) {
        state.cart[find].quantity += 1

      } else {

        const tempvar = { ...action.payload, quantity: 1 }
        state.cart.push(tempvar)

      }
    },


    DeleteFromCart: (state, action: PayloadAction<number>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        const deletedItem = state.cart.splice(index, 1)[0];
        state.quantity -= deletedItem.quantity;
      }
    },


    DeleteAllFromCart: (state) => {
      state.cart = [];
      state.quantity = 0;
    },
  },
});

export const { AddCart, DeleteFromCart, DeleteAllFromCart} = cartSystem.actions;
export default cartSystem.reducer;
