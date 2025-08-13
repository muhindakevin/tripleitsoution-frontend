import { apiSlice } from "./ApiSlice";

const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (data) => ({
                url: "products",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `products/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: "products/add",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
} = productApi;