import apiSlice from "../../app/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        
        getProductByCategory: build.query({
            query:(category)=>({
                url:'/api/product/category',
                params: category ? { category } : {}
            }),
            providesTags:["allProduct"]
        }),
        
            getAllProducts: build.query({
            query: () => ({
                url: '/api/product',
            }),
            providesTags: ["allProduct"],
            }),
        }),

   
})

export const {useGetProductByCategoryQuery,useGetAllProductsQuery} = productApiSlice