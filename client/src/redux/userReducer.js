import { createSlice } from '@reduxjs/toolkit'
import data from './initialdata'

const initialState = {
  user : {
    fname : "Ezzoubeir",
    lname : "Elasraoui",
    addr  : "#Morocco, Rabat",
    email : "ezzoubeir@team.io",
    phone : "+212 625980211",
    country : "MA"
  },
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {   
    getUser: (state) => {
      return state.user
    }
  },
})

// Action creators are generated for each case reducer function
export const {getUser } = userSlice.actions

export default userSlice.reducer