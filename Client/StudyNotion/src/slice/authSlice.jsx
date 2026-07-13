import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signUpData:null,
    token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        setSignUpData(state,value){
            state.signUpData = value.payload;
        },
    },
})

export const {setToken,setSignUpData} = authSlice.actions;
export default authSlice.reducer;