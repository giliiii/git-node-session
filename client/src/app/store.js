import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import apiSlice from "./apiSlice"
import userSliceReducer from "../features/userSlice"
import productReducer from "../features/func/productSlice" 

const store = configureStore({

    reducer: {
        user: userSliceReducer,
        product:productReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store
setupListeners(store.dispatch)




