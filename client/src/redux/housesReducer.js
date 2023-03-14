import { createSlice } from '@reduxjs/toolkit'
import data from './initialdata'

const initialState = {
  data : data,
}

export const houseSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {   
    getSpHouses: (state,action) => {
      return state.data[action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const {getSpHouses } = houseSlice.actions

export default houseSlice.reducer