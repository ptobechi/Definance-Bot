import axios, { AxiosInstance } from "axios";

export const BASE_URL = '/api';
export const API_KEY = '4be1807b-fc7d-4627-9f02-0450c4c4a8ab'
export const STOCK_API_KEY = '7jwG5rubldqpjBSAuyxXkqhvvt3PI8M8'
export const Stocks = ["GOOG", "AAPL", "DIS", "TGT", "C", "PDD", "OXY", "MTCH", "DFS"];


// export const tokenAndId = () => {
//     const userSession = localStorage.getItem("session");
//     const user = userSession ? JSON.parse(userSession) : {};
  
//     const Token = user["token"] || "";
//     const logged_id = user["id"] || "";
//     return { Token, logged_id };
// };

// Function to create a new Axios instance with updated headers
const createPrivateRequest = () => {
return axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${tokenAndId().Token}`,
    },
});
};

// Create an Axios instance for public requests
export const publicRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Initialize the private request instance
export let privateRequest: AxiosInstance = createPrivateRequest();

// Function to update the private request instance with new token
export const updatePrivateRequest = () => {
    privateRequest = createPrivateRequest();
};