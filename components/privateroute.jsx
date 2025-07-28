import React from "react";
import { Outlet , Navigate } from "react-router-dom";
import { isloggedIn } from "./auth";
const privateroute =()=> {

    

    if(isloggedIn()){
        return <Outlet/>
    } else{
        return <Navigate to={"/login"} />;
    }

    
}
export default privateroute