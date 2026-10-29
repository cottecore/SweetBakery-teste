'use client'

import axios from "axios"
import { config } from "process";

const api = axios.create({
    baseURL:'"http://localhost:8080'
})

api.interceptors.request.use(
    (config) =>{
        return config;
    }
);