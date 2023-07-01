import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromCart: (state, action) => {
      state.value -= 1
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsWithId = (state, id) => 
  state.cart.items.filter((item) => item.id === id);


export default cartSlice.reducer