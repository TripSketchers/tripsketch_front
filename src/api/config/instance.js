import axios from "axios";

export const instance = axios.create({
    // axios 공통 설정
    baseURL: "http://43.200.234.235/api", //  http://localhost:8080
});