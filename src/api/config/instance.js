import axios from "axios";

export const instance = axios.create({
    // axios 공통 설정
    baseURL: "https://13-124-221-47.sslip.io/api", //  http://localhost:8080
});