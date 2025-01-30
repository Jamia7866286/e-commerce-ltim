import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchAllProductList = createAsyncThunk(
  "allProduct/fetchAllProduct",
  async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const result = await res.json();
      return result;
    } catch (err) {
      console.log("Api Error!",err);
      throw {message: "something went wrong"};
    }
  }
);

// console.dir(fetchAllProductList);

const productSlice = createSlice({
  name: "productList",
  initialState: {
    products: [],
    filteredProductsData: [],
    loading: false,
    error: '',
    isSubmitBtnIsDisbaled: false,
    searchProduct: '',
    filterKeys: {
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "0",
    },
  },
  reducers: {
    filteredProducts: (state, action) => {
      state.loading = false;
      state.filteredProductsData = action.payload;
    },
    clearFilter: (state) => {
      state.filteredProductsData = state.products;
      state.filterKeys = {
        category: "",
        minPrice: "",
        maxPrice: "",
        minRating: "0",
      };
    },
    updateBtnDisabled: (state, action) => {
      // console.log("state.filterKeys", {...state.filterKeys});
      if (state.filterKeys[action.payload] !== "") {
        state.isSubmitBtnIsDisbaled = false;
      } else {
        state.isSubmitBtnIsDisbaled = true;
      }
      // current(state.filterKeys[action.payload]);
    },
    updateFilterKeys: (state, action) => {
      state.filterKeys = { ...state.filterKeys, ...action.payload };
    },
    searcProductItem: (state, action)=>{
      state.searchProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProductsData = action.payload;
      })
      .addCase(fetchAllProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Api error!";
      });
  },
});

export const {
  filteredProducts,
  clearFilter,
  updateBtnDisabled,
  updateFilterKeys,
  searcProductItem,
} = productSlice.actions;

export const selectorAllProductList = (arg) => arg.productSliceReducer;

export default productSlice.reducer;
