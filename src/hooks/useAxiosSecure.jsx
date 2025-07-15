import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

const useAxiosSecure = () => {

    const navigate = useNavigate();

    const {logOut} = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.status === 401) {
                    logOut();
                    navigate("/login");
                }
                else if (error.status === 403) {
                    navigate("/forbidden");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate])

    return axiosInstance
};

export default useAxiosSecure;
