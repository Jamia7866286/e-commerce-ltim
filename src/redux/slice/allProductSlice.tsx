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
    btnIsDisbaled: false,
    filterKeys: {
      title: "",
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
        title: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        minRating: "0",
      };
    },
    updateBtnDisabled: (state, action) => {
      if (state.filterKeys[action.payload] !== "") {
        state.btnIsDisbaled = false;
      } else {
        state.btnIsDisbaled = true;
      }
      // console.log("state.filterKeys", current(state.filterKeys));
    },
    updateFilterKeys: (state, action) => {
      state.filterKeys = { ...state.filterKeys, ...action.payload };
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
} = productSlice.actions;

export const selectorAllProductList = (arg) => arg.productSliceReducer;

export default productSlice.reducer;
