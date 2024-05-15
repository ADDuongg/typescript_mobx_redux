import axios from "axios";

const http = axios.create({
    baseURL: 'https://fakestoreapi.com/products/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json' ,
        'Accept': 'application/json',
    }
}) 
/* http.defaults.withCredentials = true; */
export default http;