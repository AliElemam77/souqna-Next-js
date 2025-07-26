import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getProductDetails = createAsyncThunk(
  "productsDetails/getProductDetails",
  async (productId: string) => {
    const response = await axios.get(
      `https://task-ecommerce-api.vercel.app/api/products/${productId}`
    );
    console.log("Product details response:", response.data);
    return response.data.data;
  }
);

interface Category {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  productCount: number;
}

interface ProductDetails {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  originalPrice: number;
  categoryId: number;
  image: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  brand: string;
  tags: string[];
  specifications: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
  category: Category;
}

const initialState = {
  productDetails: {} as ProductDetails,
  loading: false,
  error: null as string | null,
};

const productsDetailsSlice = createSlice({
  name: "productsDetails",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.loading = false;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product details";
      });
  },
});

export default productsDetailsSlice.reducer;
