import axios from "axios";
export const baseURls="http://localhost:8080";
export const httpClient= axios.create({
    baseURL:baseURls
})
