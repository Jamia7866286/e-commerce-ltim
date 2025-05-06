import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface addItemProps {
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

export const addProductItemAsyncThunk = createAsyncThunk(
  "allProduct/addProductItem",
  async (addItemObj: addItemProps, { rejectWithValue }) => {
    console.log("Thunk execution started...");
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(addItemObj),
      });

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error in addProductItemAsyncThunk:", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    addItemObject: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductItemAsyncThunk.pending, (state) => {
        console.log("Fetching started...");
        state.addItemObject = { ...state.addItemObject };
      })
      .addCase(addProductItemAsyncThunk.fulfilled, (state, action) => {
        console.log("Thunk fulfilled:", action.payload);
        state.addItemObject = {...action.payload};
        alert("Product added successfully!");
      })
      .addCase(addProductItemAsyncThunk.rejected, (state, action) => {
        console.error("Thunk rejected:", action.payload);
      });
  },
});

export default addProductSlice.reducer;
