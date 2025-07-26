import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  image: string;
}

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-ecommerce-api.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
      transformResponse: (response: { success: boolean; data: Category[] }) =>
        response.data,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
