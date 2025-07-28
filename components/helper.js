import { Axios } from "axios";
import { gettoken } from "../../auth";

export const BASE_URL='http://localhost:3000/api/v1';

export const myaxios=axios.create({
    baseURL:BASE_URL
});

export const privateAxios=axios.create({
    baseURL:BASE_URL
})

privateAxios.interceptors.request.use(config=>{

    const token=gettoken()
    console.log(token)
    if(token){
        config.headers.common.authorization=`Bearer ${token}`;
        // console.log(config);
    }
    return config;

} , 
(error) =>Promise.reject(error)
);