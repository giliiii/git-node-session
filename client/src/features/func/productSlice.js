import { createSlice } from "@reduxjs/toolkit";

const initialState={
    category: 'כל המוצרים',
}

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        setCategory:(state,action)=>{
            state.category=action.payload
        },
    },
})

export const {setCategory}=productSlice.actions

export default productSlice.reducer