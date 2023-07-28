import {createSlice} from '@reduxjs/toolkit'

export const userDetailsSlice=createSlice({
    name:'user',
    initialState:{},
    reducers:{
        setUserDetails:(state,action)=>{
            state.value=action.payload
        }
    }
})


export const {setUserDetails}=userDetailsSlice.actions
export default userDetailsSlice.reducer