import axios from "axios";

export const instance = axios.create({
    // axios 공통 설정
    baseURL: "https://tripsketchback-production-a057.up.railway.app/api", //  http://localhost:8080
});