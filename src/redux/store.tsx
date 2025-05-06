import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slice/allProductSlice';
import addProductSlice from './slice/addProductSlice';

const store = configureStore({
    reducer:{
        productSliceReducer: productSlice,
        addProductSliceReducer: addProductSlice,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
})

export default store