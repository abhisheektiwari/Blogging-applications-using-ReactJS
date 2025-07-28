import { myaxios } from "./helper";

 export const signUp=(user)=> {

    return myaxios
    .post("/api/v1/auth/register", user)
    .then((response)=> response.data);
};
export const loginuser=(logindetail)=>{
    return myaxios.post('/api/v1/auth/login',logindetail).then((response)=>response.data)
}

export const getUser=(userId)=>{
    return myaxios.get(`/users/${userId}`).then(resp=>resp.data);
}