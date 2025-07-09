import axios from "axios";
import React, { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

const useAxiosSecure = () => {

    useEffect(() => {
        const token = localStorage.getItem("token");
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [])

    return axiosInstance
};

export default useAxiosSecure;
