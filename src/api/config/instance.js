import axios from "axios";

export const instance = axios.create({
    // axios 공통 설정
    baseURL: "https://3.37.254.211.sslip.io/api", //  http://localhost:8080
});
