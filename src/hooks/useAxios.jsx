import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;