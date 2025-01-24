import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slice/allProductSlice'

const store = configureStore({
    reducer:{
        productSliceReducer: productSlice,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
})

export default store