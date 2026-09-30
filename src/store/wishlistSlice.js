import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    // add car if not there, remove if already there
    toggleWishlist(state, action) {
      const car = action.payload
      const index = state.findIndex((item) => item.id === car.id)
      if (index === -1) {
        state.push(car)
      } else {
        state.splice(index, 1)
      }
    },
  },
})

export const { toggleWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
