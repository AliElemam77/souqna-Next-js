import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  image: string;
  description: string;
  price: number;
  originalPrice: number;
  categoryId: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-ecommerce-api.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      transformResponse: (response: {
        success: boolean;
        data: { products: Product[] };
      }) => response.data.products,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
