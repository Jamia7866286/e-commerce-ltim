import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slice/allProductSlice'
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer:{
        productSliceReducer: productSlice,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
})

export default store

export const useAppDispatch = ()=> useDispatch();
export const useAppSelector = useSelector;