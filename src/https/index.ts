import axios from "axios";

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    // withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});


export const login = (data: any) => api.post("/auth/login", data);
//this api is not working properly
export const signin = (data: any) => api.post("/auth/users", data);
export const getAllProducts = () => api.get("/products");
export const getAllCategories = () => api.get("/products/categories");



export default api;