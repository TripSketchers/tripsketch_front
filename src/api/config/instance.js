import axios from "axios";

export const instance = axios.create({
    // axios 공통 설정
    baseURL: "https://43-200-234-235.sslip.io/api", //  http://localhost:8080
});